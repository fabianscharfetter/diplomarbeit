using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using Microsoft.AspNetCore.Identity;

namespace VisualObjectRecognition.Server.Models
{
    public class User : IdentityUser
    {
		public List<Storage>? Storages { get; set; }
		public List<Item>? Items { get; set; }
	}
}
