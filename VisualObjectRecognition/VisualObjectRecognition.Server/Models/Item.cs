using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace VisualObjectRecognition.Server.Models
{
    public class Item
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        [BsonElement("Title")]
        public string Title { get; set; } = string.Empty;

        [BsonElement("Permission")]
        public Permisson? Permisson { get; set; }
    }
}
