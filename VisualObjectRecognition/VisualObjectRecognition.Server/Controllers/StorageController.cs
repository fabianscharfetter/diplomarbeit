using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VisualObjectRecognition.Server.Data;
using VisualObjectRecognition.Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace VisualObjectRecognition.Server.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class StorageController : Controller
	{
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
		}
	}
}
