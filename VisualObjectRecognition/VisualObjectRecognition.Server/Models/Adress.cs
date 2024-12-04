namespace VisualObjectRecognition.Server.Models
{
    public class Adress
    {
        public int Id { get; set; }
        public string Straße { get; set; } = string.Empty;
        public string Hausnummer { get; set; } = string.Empty;
        public string Postleitzahl { get; set; } = string.Empty;
        public string Stadt { get; set; } = string.Empty;
        public string Land { get; set; } = string.Empty;
    }
}
