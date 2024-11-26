using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace VisualObjectRecognition.Server.Models
{
    public class Item
    {
        public string Id { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public Permisson? Permisson { get; set; }
    }
}
