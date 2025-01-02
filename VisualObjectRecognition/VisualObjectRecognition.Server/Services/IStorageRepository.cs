using VisualObjectRecognition.Server.Models;

namespace VisualObjectRecognition.Server.Services
{
    public interface IStorageRepository
    {
        Task<IEnumerable<Storage>> GetStoragesAsync();
        Task<Storage> GetStorageAsync(string id, string title);

        Task<Storage> CreateStorageAsync(Storage storage);
        Task<Storage> UpdateStorageAsync(string id, Storage storage);
        Task<bool> DeleteStorage(string id, string title);

    }
}
