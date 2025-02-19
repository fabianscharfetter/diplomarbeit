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
        public double? Length { get; set; } // Länge in Metern

        public double? Width { get; set; } // Breite in Metern

        public double? Height { get; set; } // Höhe in Metern

        public double? Area { get; set; } // Fläche in Quadratmetern

        public string? DoorDescription { get; set; } // Türbeschreibung

        public string? UserID { get; set; } //ID von User der Storage gebucht hat

        public Location Location { get; set; }
        public StorageSize? StorageSize { get; set; }
    }
}
