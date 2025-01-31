using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using System.Diagnostics;
using System.Text.RegularExpressions;
using VisualObjectRecognition.Server.Models;
using VisualObjectRecognition.Server.Services;


namespace VisualObjectRecognition.Server.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ImageObjectController : ControllerBase
    {
        private readonly IImageObjectRepository _imageObjectRepository;
        private readonly BlobStorageService _blobStorageService;


        public ImageObjectController(IImageObjectRepository imageObjectRepository, BlobStorageService blobStorageService)
        {
            _imageObjectRepository = imageObjectRepository;
            _blobStorageService = blobStorageService;
        }

        // GET: api/ImageObject
        [HttpGet]
        public async Task<IActionResult> GetImageObjects()
        {
            try
            {
                var imageObjects = await _imageObjectRepository.GetImageObjectsAsync();
                return Ok(imageObjects);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Ein Fehler ist aufgetreten: {ex.Message}");
            }
        }

        // GET: api/ImageObject/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetImageObject(string id)
        {
            try
            {
                var response = await _imageObjectRepository.GetImageObjectAsync(id);
                var imageObject = response.FirstOrDefault();

                if (imageObject == null)
                {
                    return NotFound($"ImageObject mit der ID {id} konnte nicht gefunden werden.");
                }
                return Ok(imageObject);
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Ein Fehler ist aufgetreten: {ex.Message}");
            }
        }

        // POST: api/ImageObject
        [HttpPost]
        public async Task<IActionResult> CreateImageObject([FromBody] Models.ImageObject imageObject)
        {
            if (imageObject == null)
            {
                return BadRequest("Das ImageObject-Objekt ist null.");
            }

            try
            {
                var createdImageObject = await _imageObjectRepository.CreateImageObjectAsync(imageObject);
                return Ok(createdImageObject);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Ein Fehler ist aufgetreten: {ex.Message}");
            }
        }

        // PUT: api/ImageObject/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateImageObject(string id, [FromBody] Models.ImageObject imageObject)
        {
            if (imageObject == null || imageObject.Id != id)
            {
                return BadRequest("Die ImageObject-ID stimmt nicht überein.");
            }

            try
            {
                var updatedImageObject = await _imageObjectRepository.UpdateImageObjectAsync(id, imageObject);
                return Ok(updatedImageObject);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Ein Fehler ist aufgetreten: {ex.Message}");
            }
        }

        // DELETE: api/ImageObject/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteImageObject(string id, string title)
        {
            var response = await _imageObjectRepository.GetImageObjectAsync(id);
            var imageObject = response.FirstOrDefault();

            if (imageObject == null)
            {
                return NotFound($"ImageObject mit der ID {id} wurde nicht gefunden.");
            }
            else
            {   // ImageObject aus der Datenbank löschen
                try
                {
                    var success = await _imageObjectRepository.DeleteImageObject(id, title);
                    if (success)
                    {
                        return Ok("Löschung erfolgreich!");
                    }
                    return NotFound($"ImageObject mit der ID {id} wurde nicht gefunden.");
                }
                catch (Exception ex)
                {
                    return StatusCode(500, $"Ein Fehler ist aufgetreten: {ex.Message}");
                }
            }
        }

        [HttpGet("uploadImage")]
        public async Task<IActionResult> UploadImage(Stream file, string userId)
        {
            ImageObject image = new ImageObject();

            try
            {
                if (file == null || file.Length == 0)
                    return BadRequest("Bild fehlt.");


                string fileName = DateTime.Now.ToString() + ".jpeg";
                fileName = Regex.Replace(fileName, @"[\-_:\[\]{}()/\\]", ".");
                fileName = Regex.Replace(fileName, @"[\s]", "_");

                string blobUrl = await _blobStorageService.UploadPngImageAsync(file, fileName);
                if(blobUrl == null)
                {
                    throw new Exception("Fehler beim Uploaden In Blob Storage");
                }

                image.Id = Guid.NewGuid().ToString();
                image.Path = blobUrl;
                image.StorageDate = DateTime.Now;
                image.UserId = userId;

                var response = await _imageObjectRepository.CreateImageObjectAsync(image);
                if (response == null)
                {
                    throw new Exception("Fehler beim Speichern des ImageObjects");
                }

            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }


            return Ok();
        }

        [HttpGet("captureSnapshot")]
        public FileContentResult CaptureSnapshot()
        {
            try
            {
                string ffmpegPath = "C:\\FFmpeg\\ffmpeg_essentials_build\\bin\\ffmpeg.exe"; // Falls nicht im PATH, absoluten Pfad angeben
                string rtspUrl = "rtsp://ubnt:ubnt@192.168.0.45:554/s0";

                ProcessStartInfo psi = new ProcessStartInfo
                {
                    FileName = ffmpegPath,
                    Arguments = $"-rtsp_transport tcp -i \"{rtspUrl}\" -frames:v 1 -q:v 2 -f image2pipe -vcodec mjpeg pipe:1",
                    RedirectStandardOutput = true,
                    RedirectStandardError = true,
                    UseShellExecute = false,
                    CreateNoWindow = true
                };

                using (Process process = new Process { StartInfo = psi })
                {
                    process.Start();

                    using (MemoryStream ms = new MemoryStream())
                    {
                        process.StandardOutput.BaseStream.CopyTo(ms);
                        process.WaitForExit();

                        if (process.ExitCode != 0)
                        {
                            throw new Exception($"Fehler beim Erstellen des Snapshots: {process.StandardError.ReadToEnd()}");
                        }

                        return File(ms.ToArray(), "image/jpeg");
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Interner Fehler: {ex.Message}");
            }
        }

        [HttpGet("captureImageForUser/{id}")]
        public async Task<IActionResult> CaptureImageObjectSnapshot(string id)
        {
            ImageObject imageObject = new ImageObject();
            try
            {
                var fileResult   = CaptureSnapshot();     
                if(fileResult == null)
                {
                    throw new Exception("Fehler beim Snapshot erstellen!");
                }

                // Macht Snapshot von Kamera
                FileContentResult image = fileResult;       // Holt die Bilddaten als Stream
                Stream imageData = new MemoryStream(image.FileContents);

                var response = await UploadImage(imageData, id);      //Uploaded Bild zum Azure Blob Storage

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Interner Serverfehler: {ex.Message}");
            }
        }

        [HttpGet("getAzureImage")]
        public async Task<IActionResult> GetAzureImage(string id)
        {
            try
            {
                var response = await _imageObjectRepository.GetImageObjectAsync(id);
                var imageObject = response.FirstOrDefault();
                if (imageObject != null)
                {
                    string filePath = imageObject.Path;
                    string fileName = Path.GetFileName(filePath);

                    var imageStream = await _blobStorageService.DownloadImageAsync(fileName);
                    return File(imageStream, "image/jpeg");  // Oder das richtige Format je nach Bildtyp
                }
                else
                {
                    throw new FileNotFoundException();
                }

            }
            catch (FileNotFoundException)
            {
                return NotFound("Das Bild konnte nicht gefunden werden.");
            }
        }
    }
}
