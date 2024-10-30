namespace Visual_Obj_Recognition.Benutzerverwaltung
{
    public enum AdminRechte
    {
        // Kein spezielles Recht
        None = 0,

        // Leserecht
        Read = 1,

        // Erlaubt bearbeiten
        Edit = 2,

        // Erlaubt das Löschen
        Delete = 3,

        //Erlaubt das Verwalten anderer Admins
        Manage = 4,

        // Alle Rechte kombiniert
        All = Read | Edit | Delete | Manage,
    }
}
