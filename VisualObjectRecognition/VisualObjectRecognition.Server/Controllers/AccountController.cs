using Microsoft.AspNetCore.Mvc;
using VisualObjectRecognition.Server.Dtos;
using VisualObjectRecognition.Server.Interfaces;
using VisualObjectRecognition.Server.Models;
using VisualObjectRecognition.Server.Services;

namespace VisualObjectRecognition.Server.Controllers
{
	[Route("api/account")]
	[ApiController]
	public class AccountController : Controller
	{
        private readonly IUserRepository _userRepository;
        private readonly ITokenService _tokenService;

        public AccountController(IUserRepository userRepository, ITokenService tokenService)
        {
            _userRepository = userRepository;
            _tokenService = tokenService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Benutzer anhand der E-Mail abrufen
            var users = await _userRepository.GetUsersAsync();
            var user = users.FirstOrDefault(u => u.Email.ToLower() == loginDto.Email.ToLower());

            if (user == null)
                return Unauthorized("Ungültige E-Mail!");

            // Passwort validieren
            var isPasswordValid = VerifyPassword(user.PasswordHash, loginDto.Password);
            if (!isPasswordValid)
                return Unauthorized("E-Mail oder Passwort falsch!");

            // Erfolgreiche Anmeldung
            return Ok(new NewUserDto
            {
                Email = user.Email,
                FirstName = user.FirstName,
                SecondName = user.SecondName,
                Birthdate = user.Birthdate,
                PhoneNbr = user.PhoneNbr,
                Firma = user.Firma,
                Strasse = user.Strasse,
                Hausnummer = user.Hausnummer,
                Postleitzahl = user.Postleitzahl,
                Stadt = user.Stadt,
                Land = user.Land,
                Token = _tokenService.CreateToken(user)
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Überprüfen, ob E-Mail bereits verwendet wird
            var users = await _userRepository.GetUsersAsync();
            if (users.Any(u => u.Email.ToLower() == registerDto.Email.ToLower()))
                return BadRequest("Diese E-Mail-Adresse wird bereits verwendet!");

            // Passwort hashen
            var hashedPassword = HashPassword(registerDto.Password);

            // Neuen Benutzer erstellen
            var newUser = new Models.User
            {
                Id = Guid.NewGuid().ToString(),
                FirstName = registerDto.FirstName,
                SecondName = registerDto.SecondName,
                Birthdate = registerDto.Birthdate,
                Email = registerDto.Email.ToLower(),
                PasswordHash = hashedPassword,
                Firma = registerDto.Firma,
                Strasse = registerDto.Strasse,
                Hausnummer = registerDto.Hausnummer,
                Postleitzahl = registerDto.Postleitzahl,
                Stadt = registerDto.Stadt,
                Land = registerDto.Land,
                PhoneNbr = registerDto.PhoneNbr,
                Role = UserRole.User // Standardrolle
            };

            await _userRepository.CreateUserAsync(newUser);

            return Ok(new NewUserDto
            {
                FirstName = newUser.FirstName,
                SecondName = newUser.SecondName,
                Birthdate = newUser.Birthdate,
                Email = newUser.Email,
                PhoneNbr = newUser.PhoneNbr,
                Firma = newUser.Firma,
                Strasse = newUser.Strasse,
                Hausnummer = newUser.Hausnummer,
                Postleitzahl = newUser.Postleitzahl,
                Stadt = newUser.Stadt,
                Land = newUser.Land,
                Token = _tokenService.CreateToken(newUser)
            });
        }


        // Passwort-Hashing und -Validierung
        private string HashPassword(string password)
        {
            var hasher = new Microsoft.AspNetCore.Identity.PasswordHasher<Models.User>();
            return hasher.HashPassword(null, password);
        }

        private bool VerifyPassword(string hashedPassword, string providedPassword)
        {
            var hasher = new Microsoft.AspNetCore.Identity.PasswordHasher<Models.User>();
            var result = hasher.VerifyHashedPassword(null, hashedPassword, providedPassword);
            return result == Microsoft.AspNetCore.Identity.PasswordVerificationResult.Success;
        }
    }
}
