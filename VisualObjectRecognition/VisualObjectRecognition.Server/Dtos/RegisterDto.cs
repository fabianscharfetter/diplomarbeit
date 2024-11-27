﻿using System.ComponentModel.DataAnnotations;

namespace VisualObjectRecognition.Server.Dtos
{
	public class RegisterDto
	{
		[Required]
		public string Username { get; set; } = string.Empty;
		[Required]
		[EmailAddress]
		public string Email { get; set; } = string.Empty;
		[Required]
		public string Password { get; set; } = string.Empty;
	}
}