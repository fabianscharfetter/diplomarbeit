using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Cosmos.Serialization.HybridRow;
using Microsoft.Identity.Client;
using Microsoft.IdentityModel.Tokens;
using SharpCompress.Common;
using System.Diagnostics;
using System.Text.RegularExpressions;
using VisualObjectRecognition.Server.Models;
using VisualObjectRecognition.Server.Services;
using Newtonsoft.Json;

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

        // GET: api/ImageObject/uploadImage
        [HttpGet("uploadImage")]
        //Speichert Bild in Azure Storage
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

        // GET: api/ImageObject/captureSnapshot
        [HttpGet("captureSnapshot")]
        // Nimmt snapshot von RTSP Stream
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

        // GET: api/ImageObject/captureImageForUser/{id}

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

        // GET: api/ImageObject/getAzureImage
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
                    using var memoryStream = new MemoryStream();
                    await imageStream.CopyToAsync(memoryStream);

                    return new FileContentResult(memoryStream.ToArray(), "image/jpeg");  
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

        // Schickt Bild an ObjectDetection und erhält erkannte Items
        [HttpGet("GetObjectsFromAzureImage")]
        public async Task<string[]> GetObjectsFromAzureImage(string id)
        {
            var result = await GetAzureImage(id);

            if (result is FileContentResult fileResult)
            {
                if(fileResult.ContentType == "image/jpeg")
                {
                    var content = fileResult.FileContents;
                    Stream stream = new MemoryStream(content);

                    // Bild temporär speichern
                    var response = SaveImageTemporarily(stream);
                    string path = response.Result;

                    // Bild an ObjectDetectionController senden
                    string url = $"https://localhost:7228/api/ObjectDetection/detect?filepath={path}";
                    using (HttpClient client = new HttpClient())
                    {
                        try
                        {
                            HttpResponseMessage httpResponse = await client.GetAsync(url);

                            if (httpResponse.IsSuccessStatusCode)
                            {
                                string jsonResponse = await httpResponse.Content.ReadAsStringAsync();

                                // JSON zu einem Objekt umwandeln
                                var detections = JsonConvert.DeserializeObject<string[]>(jsonResponse);

                                if(detections != null)
                                {
                                    return detections;
                                }                            
                            }
                            else
                            {
                                Console.WriteLine($"Fehler: {httpResponse.StatusCode} - {await httpResponse.Content.ReadAsStringAsync()}");
                            }
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine($"Fehler: {ex.Message}");
                        }

                        // Bild löschen
                        DeleteTempFile(path);
                    }
                }
            }
            else if (result is NotFoundObjectResult notFoundResult)
            {
                    Console.WriteLine($"Fehler: {notFoundResult.Value}");
            }

            return null;
        }

        static async Task<string> SaveImageTemporarily(Stream imageStream)
        {
            string tempFilePath = Path.Combine(Path.GetTempPath(), Guid.NewGuid() + ".jpg");

            using (FileStream fileStream = new FileStream(tempFilePath, FileMode.Create, FileAccess.Write, FileShare.None))
            {
                await imageStream.CopyToAsync(fileStream);
            }

            return tempFilePath;
        }

        static void DeleteTempFile(string filePath)
        {
            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
            }
        }


    }
}
