using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VisualObjectRecognition.Server.Data;
using VisualObjectRecognition.Server.Models;
using VisualObjectRecognition.Server.Services;

namespace VisualObjectRecognition.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
		private readonly ApplicationDBContext _context;

		public UserController(ApplicationDBContext context)
		{
			_context = context;
		}

		[HttpGet]
		public async Task<ActionResult<List<User>>> Get()
		{
			return await _context.Users.ToListAsync();
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<User>> GetById(string id)
		{
			var user = await _context.Users.FindAsync(id);

			if (user == null)
			{
				return NotFound();
			}

			return user;
		}

		[HttpPost]
		public async Task<IActionResult> Create(User newUser)
		{
			_context.Users.Add(newUser);
			await _context.SaveChangesAsync();

			return CreatedAtAction(nameof(GetById), new { id = newUser.Id }, newUser);
		}

		[HttpPut("{id}")]
		public async Task<IActionResult> Update(string id, User updatedUser)
		{
			if (id != updatedUser.Id)
			{
				return BadRequest("User ID mismatch");
			}

			var existingUser = await _context.Users.FindAsync(id);

			if (existingUser == null)
			{
				return NotFound();
			}

			existingUser.UserName = updatedUser.UserName;
			existingUser.Email = updatedUser.Email;
			existingUser.PasswordHash = updatedUser.PasswordHash;
			// Weitere Felder je nach Modell aktualisieren.

			_context.Users.Update(existingUser);
			await _context.SaveChangesAsync();

			return Ok();
		}

		// DELETE: api/User/{id}
		[HttpDelete("{id}")]
		public async Task<IActionResult> Delete(string id)
		{
			var user = await _context.Users.FindAsync(id);

			if (user == null)
			{
				return NotFound();
			}

			_context.Users.Remove(user);
			await _context.SaveChangesAsync();

			return Ok();
		}
        [HttpDelete("/all")]
        public async Task<IActionResult> DeleteALL()
        {
			_context.Users.ExecuteDelete();
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
