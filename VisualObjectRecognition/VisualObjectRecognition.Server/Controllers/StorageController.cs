using Microsoft.AspNetCore.Mvc;
using VisualObjectRecognition.Server.Models;
using VisualObjectRecognition.Server.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace VisualObjectRecognition.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StorageController : Controller
    {
        private readonly MongoDbService _mongoDbService;

        public StorageController(MongoDbService mongoDbService)
        {
            _mongoDbService = mongoDbService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Storage>>> Get() =>
            await _mongoDbService.GetStoragesAsync();

        [HttpGet("{id}")]
        public async Task<ActionResult<Storage>> GetById(string id)
        {
            var storage = await _mongoDbService.GetStorageByIdAsync(id);

            if (storage == null)
            {
                return NotFound();
            }

            return storage;
        }

        [HttpPost]
        public async Task<IActionResult> Create(Storage newStorage)
        {
            await _mongoDbService.CreateStorageAsync(newStorage);
            return CreatedAtAction(nameof(GetById), new { id = newStorage.Id }, newStorage);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, Storage updatedStorage)
        {
            var storage = await _mongoDbService.GetStorageByIdAsync(id);

            if (storage == null)
            {
                return NotFound();
            }

            updatedStorage.Id = storage.Id;

            await _mongoDbService.UpdateStorageAsync(id, updatedStorage);

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var storage = await _mongoDbService.GetStorageByIdAsync(id);

            if (storage == null)
            {
                return NotFound();
            }

            await _mongoDbService.DeleteStorageAsync(id);

            return Ok();
        }
    }
}
