using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VisualObjectRecognition.Server.Data;
using VisualObjectRecognition.Server.Models;
using VisualObjectRecognition.Server.Services;

namespace VisualObjectRecognition.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StorageController : ControllerBase
    {

        private readonly IStorageRepository _storageRepository;

        public StorageController(IStorageRepository storageRepository)
        {
            _storageRepository = storageRepository;
        }

        // GET: api/Storage
        [HttpGet]
        public async Task<IActionResult> GetStorages()
        {
            try
            {
                var storages = await _storageRepository.GetStoragesAsync();
                return Ok(storages);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        // GET: api/Storage/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetStorage(string id)
        {
            try
            {
                var response = await _storageRepository.GetStorageAsync(id);
                var user = response.FirstOrDefault();

                if (user == null)
                {
                    return NotFound($"Storage with ID {id} not found.");
                }
                return Ok(user);
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        // POST: api/Storage
        [HttpPost]
        public async Task<IActionResult> CreateStorage([FromBody] Models.Storage storage)
        {
            if (storage == null)
            {
                return BadRequest("Storage object is null.");
            }

            try
            {
                var createdStorage = await _storageRepository.CreateStorageAsync(storage);
                return CreatedAtAction(nameof(GetStorage), new { id = createdStorage.Id }, createdStorage);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        // PUT: api/Storage/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStorage(string id, [FromBody] Models.Storage storage)
        {
            if (storage == null || storage.Id != id)
            {
                return BadRequest("Storage ID mismatch.");
            }

            try
            {
                var updatedStorage = await _storageRepository.UpdateStorageAsync(id, storage);
                return Ok(updatedStorage);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        // DELETE: api/Storage/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStorage(string id, string title)
        {
            try
            {
                var success = await _storageRepository.DeleteStorage(id, title);
                if (success)
                {
                    return NoContent();
                }
                return NotFound($"Storage with ID {id} not found.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
    }
}
