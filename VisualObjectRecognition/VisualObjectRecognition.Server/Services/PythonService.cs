using System;
using System.Diagnostics;
using System.Text;
using System.Threading.Tasks;

namespace VisualObjectRecognition.Server.Services
{
    public class PythonService
    {
        private readonly string _pythonExePath;

        public PythonService(string pythonExePath)
        {
            _pythonExePath = pythonExePath;
        }

        public async Task<string> ExecutePythonScriptAsync(string scriptPath, string arguments = "")
        {
            try
            {
                // Prozess konfigurieren
                ProcessStartInfo psi = new ProcessStartInfo
                {
                    FileName = _pythonExePath,               // Python-Binary in der venv
                    Arguments = $"{scriptPath} {arguments}", // Skript und Argumente
                    RedirectStandardOutput = true,          // Normale Ausgabe umleiten
                    RedirectStandardError = true,           // Fehlerausgabe umleiten
                    UseShellExecute = false,                // Shell nicht verwenden
                    CreateNoWindow = true                   // Kein neues Fenster
                };

                using (Process process = new Process { StartInfo = psi })
                {
                    process.Start();

                    // Lies sowohl die Standard-Ausgabe als auch die Fehlerausgabe
                    string output = await process.StandardOutput.ReadToEndAsync();
                    string error = await process.StandardError.ReadToEndAsync();
                    
                    await process.WaitForExitAsync(); // Warten, bis der Prozess endet

                    // Beide zusammenfügen für Logging oder spätere Analyse
                    string combinedOutput = $"{output}\n{error}";

                    // Fehlerausgabe prüfen: Wenn StandardError echte Probleme enthält, werfe Exception
                    if (!string.IsNullOrEmpty(error) && process.ExitCode != 0)
                    {
                        throw new Exception($"Python-Fehler: {error.Trim()}");
                    }

                    return combinedOutput.Trim(); // Gesamtausgabe zurückgeben
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Fehler beim Ausführen des Python-Skripts: {ex.Message}", ex);
            }
        }
    }

}
