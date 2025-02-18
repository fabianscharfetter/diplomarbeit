using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using Newtonsoft.Json;
using System.IO;
using System.Text;

namespace VisualObjectRecognition.Server.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class EinlagerungController : ControllerBase
    {
        private static CancellationTokenSource _cts;
        private string currentUserId = "";
        List<string> imageObjectIds;

        [HttpPost("start")]
        public IActionResult StartEinlagerung([FromQuery] string userid)
        {
            currentUserId = userid;
            try
            {
                // Falls Task läuft, abbrechen
                _cts?.Cancel();
                _cts = new CancellationTokenSource();

                // Task starten
                Task.Run(() => EinlagerungsTask(_cts.Token), _cts.Token);

                return Ok("Einlagerung gestartet - Objekte werden ausgewertet.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Ein Fehler ist aufgetreten: {ex.Message}");
            }
        }

        [HttpPost("stop")]
        public IActionResult StopEinlagerung()
        {
            if (_cts != null)
            {
                _cts.Cancel();
                _cts = null;
                return Ok("Einlagerung erfolgreich gestoppt.");
            }

            return BadRequest("Keine laufender Einlagerung");
        }

        private async Task EinlagerungsTask(CancellationToken token)
        {
            try
            {                    
                HttpClient client = new HttpClient();
                imageObjectIds = new List<string>();
                string url = $"https://localhost:7228/api/ImageObject/captureImageForUser/{currentUserId}";


                while (!token.IsCancellationRequested)
                {
                    // Task läuft bis Einlagerung gestoppt wird
                    HttpResponseMessage httpResponse = await client.GetAsync(url);

                    if (httpResponse.IsSuccessStatusCode)
                    {
                        string response = await httpResponse.Content.ReadAsStringAsync();
                        imageObjectIds.Add(response);
                    }

                    // 3 Sekunden warten (bzw. abbrechen)
                    await Task.Delay(3000, token); 
                }
            }
            catch (TaskCanceledException)
            {                    
                HttpClient client = new HttpClient();
                List<string> objectsRecognized = new List<string>();

                // Einlagerung wurde beendet -> Ergebnise verarbeiten
                // Objekte erkennen
                foreach (string s in  imageObjectIds)
                {
                    string url = $"https://localhost:7228/api/ImageObject/GetObjectsFromAzureImage?id={s}";
                    HttpResponseMessage httpResponse = await client.GetAsync(url);

                    if(httpResponse.IsSuccessStatusCode)
                    {
                        string response = await httpResponse.Content.ReadAsStringAsync();
                        List<string> newObjects = JsonConvert.DeserializeObject<List<string>>(response);

                        foreach(string newObject in newObjects)
                        {
                            // Wenn nicht Person bzw. bereits erkannt
                            if(newObject != "person" && !objectsRecognized.Contains(newObject))
                            {
                                objectsRecognized.Add(newObject);
                            }
                        }
                    }
                }

                // Items hinzufügen
                foreach(string s in objectsRecognized)
                {
                    string url = $"https://localhost:7228/AddUserItem/{currentUserId}";
                    StringContent content = new StringContent($"\"{s}\"", Encoding.UTF8, "application/json");
                    HttpResponseMessage httpResponse = await client.PostAsync(url, content);
                }
            }
        }
    }
}
