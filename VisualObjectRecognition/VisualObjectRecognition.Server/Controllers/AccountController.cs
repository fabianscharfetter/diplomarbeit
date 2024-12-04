using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using VisualObjectRecognition.Server.Dtos;
using VisualObjectRecognition.Server.Interfaces;
using VisualObjectRecognition.Server.Models;

namespace VisualObjectRecognition.Server.Controllers
{
	[Route("api/account")]
	[ApiController]
	public class AccountController : Controller
	{
		private readonly UserManager<User> _userManager;
		private readonly ITokenService _tokenService;
		private readonly SignInManager<User> _signinManager;
		public AccountController(UserManager<User> userManager, ITokenService tokenService, SignInManager<User> signInManager)
		{
			_userManager = userManager;
			_tokenService = tokenService;
			_signinManager = signInManager;
		}

		[HttpPost("login")]
		public async Task<IActionResult> Login(LoginDto loginDto)
		{
			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			var user = _userManager.Users.FirstOrDefault(x => x.Email == loginDto.Email.ToLower());

			if (user == null) return Unauthorized("Ungültige E-Mail!");

			var result = await _signinManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

			if (!result.Succeeded) return Unauthorized("E-Mail oder Passwort falsch!");

			return Ok(
				new NewUserDto
				{
                    Email = user.Email,
                    FirstName = user.FirstName,
					SecondName = user.SecondName,
					PhoneNbr = user.PhoneNbr,
                    Firma = user.Firma,
                    Token = _tokenService.CreateToken(user)
				}
			);
		}

		[HttpPost("register")]
		public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
		{
			try
			{
				if (!ModelState.IsValid)
					return BadRequest(ModelState);

				var appUser = new User
				{
					UserName = registerDto.FirstName.ToLower() +"." +registerDto.SecondName.ToLower(),	//Soll dann beispielsweise so aussehen: max.mustermann
					FirstName = registerDto.FirstName,
                    SecondName = registerDto.SecondName,
					Email = registerDto.Email,
					Firma = registerDto.Firma,
					PhoneNbr = registerDto.PhoneNbr,
				};

				var createdUser = await _userManager.CreateAsync(appUser, registerDto.Password);

				if (createdUser.Succeeded)
				{
					var roleResult = await _userManager.AddToRoleAsync(appUser, "User");
					if (roleResult.Succeeded)
					{
						return Ok(
							new NewUserDto
							{
								FirstName = appUser.FirstName,
								SecondName = appUser.SecondName,
								Email = appUser.Email,
								PhoneNbr = appUser.PhoneNbr,
                                Firma = registerDto.Firma,
                                Token = _tokenService.CreateToken(appUser)
							}
						);
					}
					else
					{
						return StatusCode(500, roleResult.Errors);
					}
				}
				else
				{
					return StatusCode(500, createdUser.Errors);
				}
			}
			catch (Exception e)
			{
				return StatusCode(500, e);
			}
		}
	}
}
