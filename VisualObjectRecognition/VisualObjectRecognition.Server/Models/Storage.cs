using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using ThirdParty.Json.LitJson;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Newtonsoft.Json;

namespace VisualObjectRecognition.Server.Models
{
    public class Storage
    {
        [Newtonsoft.Json.JsonProperty(PropertyName = "id")] 
        public string Id { get; set; } = string.Empty;

        [Newtonsoft.Json.JsonProperty(PropertyName = "title")]

        public string Title { get; set; } = string.Empty;

        public Location Location { get; set; }
        public StorageSize? StorageSize { get; set; }
    }
}
