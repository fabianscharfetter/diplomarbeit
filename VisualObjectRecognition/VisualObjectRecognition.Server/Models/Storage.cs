using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace VisualObjectRecognition.Server.Models
{
    public class Storage
    {
        public string Id { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public Location? Location { get; set; }
        public StorageSize? StorageSize { get; set; }
    }
}
