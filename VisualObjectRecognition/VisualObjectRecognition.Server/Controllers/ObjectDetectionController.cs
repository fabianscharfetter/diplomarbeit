using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;
using VisualObjectRecognition.Server.Services;
using Newtonsoft.Json;



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

        [HttpGet("detect")]
        public async Task<IActionResult> RunObjectRecognition([FromQuery] string filepath)
        {
            if (string.IsNullOrWhiteSpace(filepath) || !System.IO.File.Exists(filepath))
            {
                return BadRequest("Ungültiger oder nicht existierender Dateipfad.");
            }

            try
            {
                string scriptPath = @"C:\Users\fabia\OneDrive\Desktop\yolov5\yolov5\detect.py"; // Skriptpfad
                string confidence = "--conf-thres 0.5"; // 50%ige Erkennung 
                string arguments = $"--source \"{filepath}\" {confidence}"; // Optional: Argumente

                string result = await _objectDetectionService.ExecutePythonScriptAsync(scriptPath, arguments);
                string[] detections = ExtractDetections(result);

                return Ok(JsonConvert.SerializeObject(detections));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Fehler", message = ex.Message });
            }
        }

        static string[] ExtractDetections(string input)
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
                if(detections == "(no detections)")
                {
                    return null;
                }
                else
                {
                    string[] detectionArray = detections.Split(", ");
                    for(int i=0; i < detectionArray.Length; i++)
                    {
                        // Zahlen und Leerzeichen wegtrimmen
                        detectionArray[i] = new string(detectionArray[i].Where(c => !char.IsDigit(c) && !char.IsWhiteSpace(c)).ToArray());
                     }
                    return detectionArray;
                }
            }
            return null;
        }
    }


}
