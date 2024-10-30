namespace Visual_Obj_Recognition.Benutzerverwaltung
{
    public class Benutzer
    {
        public int ID { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Email { get; set; }
        public string? Telefon { get; set; }
    }
}
