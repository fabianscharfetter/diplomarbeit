using Microsoft.AspNetCore.Mvc;
using VisualObjectRecognition.Server.Services;

namespace VisualObjectRecognition.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {

        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        // GET: api/User
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            try
            {
                var users = await _userRepository.GetUsersAsync();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        // GET: api/User/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(string id, string secondname)
        {
            try
            {
                var user = await _userRepository.GetUserAsync(id, secondname);
                if (user == null)
                {
                    return NotFound($"User with ID {id} not found.");
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

        // POST: api/User
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] Models.User user)
        {
            if (user == null)
            {
                return BadRequest("User object is null.");
            }

            try
            {
                var createdUser = await _userRepository.CreateUserAsync(user);
                return CreatedAtAction(nameof(GetUser), new { id = createdUser.Id }, createdUser);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        // PUT: api/User/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(string id, [FromBody] Models.User user)
        {
            if (user == null || user.Id != id)
            {
                return BadRequest("User ID mismatch.");
            }

            try
            {
                var updatedUser = await _userRepository.UpdateUserAsync(id, user);
                return Ok(updatedUser);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        // DELETE: api/User/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id, string secondname)
        {
            try
            {
                var success = await _userRepository.DeleteUser(id, secondname);
                if (success)
                {
                    return NoContent();
                }
                return NotFound($"User with ID {id} not found.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }


        /*private readonly ApplicationDBContext _context;

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
        }*/
    }
}
