using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace VisualObjectRecognition.Server.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        [BsonElement("Name")]
        public string Name { get; set; } = string.Empty;

        [BsonElement("Email")]
        public string Email { get; set; } = string.Empty;

        [BsonElement("Password")]
        public string Password { get; set; } = string.Empty;
    }
}
