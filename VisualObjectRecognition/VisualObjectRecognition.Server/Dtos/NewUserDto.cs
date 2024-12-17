using System.ComponentModel.DataAnnotations;

namespace VisualObjectRecognition.Server.Dtos
{
	public class NewUserDto
	{
        public string FirstName { get; set; } = string.Empty;
        public string SecondName { get; set; } = string.Empty;
		public string Email { get; set; } = string.Empty;
        public string? Firma { get; set; } = string.Empty;
        public string PhoneNbr { get; set; } = string.Empty;

        public string Token { get; set; } = string.Empty;
	}
}
