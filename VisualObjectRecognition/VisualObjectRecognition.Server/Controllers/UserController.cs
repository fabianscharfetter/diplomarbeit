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
    }
}
