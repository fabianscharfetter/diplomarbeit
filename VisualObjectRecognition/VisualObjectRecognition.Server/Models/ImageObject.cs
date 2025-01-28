namespace VisualObjectRecognition.Server.Models
{
    public class ImageObject
    {
        [Newtonsoft.Json.JsonProperty(PropertyName = "id")]
        public string Id { get; set; } = string.Empty;
        public string Path { get; set; } = string.Empty;
        public DateTime? StorageDate { get; set; }

        [Newtonsoft.Json.JsonProperty(PropertyName = "userid")]
        public string? UserId {  get; set; }
    }
}
