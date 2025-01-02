using System.ComponentModel.DataAnnotations;

namespace VisualObjectRecognition.Server.Dtos
{
	public class RegisterDto
	{
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        [Required]
        public string FirstName { get; set; } = string.Empty;
        [Required]
		public string SecondName { get; set; } = string.Empty;
		[Required]
		public string PhoneNbr { get; set; } = string.Empty;
        [Required]
		public string Password { get; set; } = string.Empty;
        public string? Firma { get; set; } = string.Empty;
    }
}
