using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace VisualObjectRecognition.Server.Models
{
    public class Storage
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        [BsonElement("Title")]
        public string Title { get; set; } = string.Empty;

        [BsonElement("Location")]
        public Location? Location { get; set; }

        [BsonElement("StorageSize")]
        public StorageSize? StorageSize { get; set; }
    }
}
