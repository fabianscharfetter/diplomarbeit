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
        [Required]
        public DateOnly Birthdate { get; set; }


        //Adresse
        [Required]
        public string Strasse { get; set; } = string.Empty;

        [Required]
        public string Hausnummer { get; set; } = string.Empty;

        [Required]
        public string Postleitzahl { get; set; } = string.Empty;

        [Required]
        public string Stadt { get; set; } = string.Empty;

        [Required]
        public string Land { get; set; } = string.Empty;

        public string? Firma { get; set; } = string.Empty;
    }
}
