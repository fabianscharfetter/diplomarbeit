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
        public DateOnly Birthdate { get; set; }


        //Adresse
        public string Strasse { get; set; } = string.Empty;
        public string Hausnummer { get; set; } = string.Empty;
        public string Postleitzahl { get; set; } = string.Empty;
        public string Stadt { get; set; } = string.Empty;
        public string Land { get; set; } = string.Empty;

        public string Token { get; set; } = string.Empty;
	}
}
