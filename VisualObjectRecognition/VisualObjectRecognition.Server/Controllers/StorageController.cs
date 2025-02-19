using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Cosmos;
using System.Text;
using VisualObjectRecognition.Server.Models;
using VisualObjectRecognition.Server.Services;
using static System.Runtime.InteropServices.JavaScript.JSType;

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
                var storage = response.FirstOrDefault();

                if (storage == null)
                {
                    return NotFound($"Storage with ID {id} not found.");
                }
                return Ok(storage);
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
            var response = await _storageRepository.GetStorageAsync(id);
            var storage = response.FirstOrDefault();

            if (storage == null)
            {
                return NotFound($"Storage with ID {id} not found.");
            }
            else
            {
                //Storage von User entfernen
                /*if (storage.UserID != null)
                { 
                    using (HttpClient client = new HttpClient())
                    {
                        try
                        {
                            string url = $"https://localhost:7228/api/User/DeleteUserStorage/{storage.UserID}";

                            // JSON-Daten in den HTTP-Content einfügen
                            var content = new StringContent(storage.Id, Encoding.UTF8, "application/json");
                            HttpResponseMessage http_response = await client.PutAsync(url, content);

                            if (http_response.IsSuccessStatusCode)
                            {
                                string responseContent = await http_response.Content.ReadAsStringAsync();
                                Console.WriteLine($"Antwort: {responseContent}");
                            }
                        }
                        catch (Exception ex)
                        {
                            return BadRequest();
                        }
                    }
                }*/

                //Storage aus DB löschen
                try
                {
                    var success = await _storageRepository.DeleteStorage(id, title);
                    if (success)
                    {
                        return Ok("Löschung erfolgreich!");
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
}