using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using VisualObjectRecognition.Server.Services;

namespace VisualObjectRecognition.Server.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class PythonController : ControllerBase
    {
        private readonly PythonService _pythonService;

        public PythonController()
        {
            string pythonExePath = @"C:\Users\fabia\OneDrive\Desktop\yolov5\venv\Scripts\python.exe";
            _pythonService = new PythonService(pythonExePath);
        }

        [HttpGet("{filepath}")]
        public async Task<IActionResult> RunPythonScript(string filepath)
        {
            try
            {
                string scriptPath = @"C:\Users\fabia\OneDrive\Desktop\yolov5\yolov5\detect.py"; // Skriptpfad
                //string arguments = "--source \"C:\\Users\\fabia\\OneDrive\\Desktop\\sources\\videos\\strasse.mp4\" --view-img"; // Optional: Argumente

                string confidence = "--conf-thres 0.5"; 
                string arguments = $"--source \"{filepath}\" {confidence}"; // Optional: Argumente

                string result = await _pythonService.ExecutePythonScriptAsync(scriptPath, arguments);

                return Ok(new
                {
                    Message = "Python-Skript erfolgreich ausgeführt.",
                    Output = result
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    Message = "Fehler beim Ausführen des Python-Skripts.",
                    Error = ex.Message
                });
            }
        }
    }


}
