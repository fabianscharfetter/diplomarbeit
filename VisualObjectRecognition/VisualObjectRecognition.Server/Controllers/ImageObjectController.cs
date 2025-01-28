using Microsoft.AspNetCore.Mvc;
using VisualObjectRecognition.Server.Services;

namespace VisualObjectRecognition.Server.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ImageObjectController : ControllerBase
    {
        private readonly IImageObjectRepository _imageObjectRepository;

        public ImageObjectController(IImageObjectRepository imageObjectRepository)
        {
            _imageObjectRepository = imageObjectRepository;
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

    }
}
