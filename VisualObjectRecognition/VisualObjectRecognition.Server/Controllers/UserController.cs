using Microsoft.AspNetCore.Mvc;
using VisualObjectRecognition.Server.Models;
using VisualObjectRecognition.Server.Services;

namespace VisualObjectRecognition.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly MongoDbService _mongoDbService;

        public UserController(MongoDbService mongoDbService)
        {
            _mongoDbService = mongoDbService;
        }

        [HttpGet]
        public async Task<ActionResult<List<User>>> Get() =>
            await _mongoDbService.GetUsersAsync();

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetById(string id)
        {
            var user = await _mongoDbService.GetUserByIdAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpPost]
        public async Task<IActionResult> Create(User newUser)
        {
            await _mongoDbService.CreateUserAsync(newUser);
            return CreatedAtAction(nameof(GetById), new { id = newUser.Id }, newUser);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, User updatedUser)
        {
            var user = await _mongoDbService.GetUserByIdAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            updatedUser.Id = user.Id;

            await _mongoDbService.UpdateUserAsync(id, updatedUser);

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var user = await _mongoDbService.GetUserByIdAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            await _mongoDbService.DeleteUserAsync(id);

            return Ok();
        }
    }
}
