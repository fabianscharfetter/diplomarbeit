using Microsoft.AspNetCore.Mvc;
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
        public async Task<IActionResult> GetStorage(string id, string title)
        {
            try
            {
                var storage = await _storageRepository.GetStorageAsync(id, title);
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

        /*
		private readonly ApplicationDBContext _context;

		public StorageController(ApplicationDBContext context)
		{
			_context = context;
		}

		// GET: api/Storage
		[HttpGet]
		public async Task<ActionResult<List<Storage>>> Get()
		{
			return await _context.Storages.ToListAsync();
		}

		// GET: api/Storage/{id}
		[HttpGet("{id}")]
		public async Task<ActionResult<Storage>> GetById(string id)
		{
			var storage = await _context.Storages.FindAsync(id);

			if (storage == null)
			{
				return NotFound();
			}

			return storage;
		}

		// POST: api/Storage
		[HttpPost]
		public async Task<IActionResult> Create(Storage newStorage)
		{
			_context.Storages.Add(newStorage);
			await _context.SaveChangesAsync();

			return CreatedAtAction(nameof(GetById), new { id = newStorage.Id }, newStorage);
		}

		// PUT: api/Storage/{id}
		[HttpPut("{id}")]
		public async Task<IActionResult> Update(string id, Storage updatedStorage)
		{
			if (id != updatedStorage.Id)
			{
				return BadRequest("Storage ID mismatch");
			}

			var existingStorage = await _context.Storages.FindAsync(id);

			if (existingStorage == null)
			{
				return NotFound();
			}

			// Aktualisiere die relevanten Felder
			existingStorage.Title = updatedStorage.Title;
			existingStorage.Location = updatedStorage.Location;
			existingStorage.StorageSize = updatedStorage.StorageSize;
			// Weitere Felder je nach Modell

			_context.Storages.Update(existingStorage);
			await _context.SaveChangesAsync();

			return Ok();
		}

		// DELETE: api/Storage/{id}
		[HttpDelete("{id}")]
		public async Task<IActionResult> Delete(string id)
		{
			var storage = await _context.Storages.FindAsync(id);

			if (storage == null)
			{
				return NotFound();
			}

			_context.Storages.Remove(storage);
			await _context.SaveChangesAsync();

			return Ok();
		}*/
    }
}
