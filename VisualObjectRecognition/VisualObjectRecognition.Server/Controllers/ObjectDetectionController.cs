using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using VisualObjectRecognition.Server.Services;

namespace VisualObjectRecognition.Server.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ObjectDetectionController : ControllerBase
    {
        private readonly ObjectDetectionService _objectDetectionService;

        public ObjectDetectionController()
        {
            string exePath = @"C:\Users\fabia\OneDrive\Desktop\yolov5\venv\Scripts\python.exe";
            _objectDetectionService = new ObjectDetectionService(exePath);
        }

        [HttpGet("{filepath}")]
        public async Task<IActionResult> RunObjectRecognition(string filepath)
        {
            try
            {
                string scriptPath = @"C:\Users\fabia\OneDrive\Desktop\yolov5\yolov5\detect.py"; // Skriptpfad
                //string arguments = "--source \"C:\\Users\\fabia\\OneDrive\\Desktop\\sources\\videos\\strasse.mp4\" --view-img"; // Optional: Argumente

                string confidence = "--conf-thres 0.3"; //30%ige Erkennung 
                string arguments = $"--source \"{filepath}\" {confidence}"; // Optional: Argumente

                string result = await _objectDetectionService.ExecutePythonScriptAsync(scriptPath, arguments);

                string detections = ExtractDetections(result);
                if(detections == null)
                {
                    detections = "Nichts erkennbar!";
                }

                return Ok(new
                {
                    Message = $"Bilderkennung erfolgreich ausgeführt: {detections}",
                    Output = result
                }); ;
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    Message = "Fehler beim Ausführen der Bilderkennung.",
                    Error = ex.Message
                });
            }
        }

        static string ExtractDetections(string input)
        {
            // Regulärer Ausdruck für die Detektionen
            //string pattern = @"image \d+/\d+.*?: \d+x\d+ ([^,]+),";
            string pattern = @"image \d+/\d+.*?: \d+x\d+ (.+?), \d+\.\d+ms";

            Match match = Regex.Match(input, pattern);

            if (match.Success)
            {
                /*for(int i = 0; i < match.Groups.Count; i++)
                {

                }*/
                string detections = match.Groups[1].Value.Trim();
                return detections != "(no detections)" ? detections : null;
            }

            return null; // Falls keine Übereinstimmung gefunden wird
        }
    }


}
