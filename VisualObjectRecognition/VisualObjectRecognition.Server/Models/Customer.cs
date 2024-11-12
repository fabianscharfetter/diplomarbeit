using MongoDB.Bson.Serialization.Attributes;

namespace VisualObjectRecognition.Server.Models
{
    public class Customer : User
    {
        [BsonElement("Storages")]
        public List<Storage>? Storages { get; set; }

        [BsonElement("Items")]
        public List<Item>? Items { get; set; }
    }
}
