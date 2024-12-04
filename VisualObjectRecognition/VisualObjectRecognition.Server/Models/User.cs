using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using Microsoft.AspNetCore.Identity;

namespace VisualObjectRecognition.Server.Models
{
    public class User : IdentityUser
    {
		public string FirstName { get; set; } = string.Empty;
		public string SecondName { get; set; } = string.Empty;
        public string? Firma { get; set; } = string.Empty;
        public string? PhoneNbr { get; set; } = string.Empty;

        public Adress? Adress { get; set; }

        public List<Storage>? Storages { get; set; }
		public List<Item>? Items { get; set; }
	}
}
