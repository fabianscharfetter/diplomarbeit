using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Cosmos;
using VisualObjectRecognition.Server.Services;
using VisualObjectRecognition.Server.Models;


namespace VisualObjectRecognition.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ItemController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public ItemController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        
    }
}
