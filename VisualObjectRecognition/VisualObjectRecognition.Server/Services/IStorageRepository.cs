using VisualObjectRecognition.Server.Models;

namespace VisualObjectRecognition.Server.Services
{
    public interface IStorageRepository
    {
        Task<IEnumerable<Storage>> GetStoragesAsync();
        Task<IEnumerable<Storage>> GetStorageAsync(string id);

        Task<Storage> CreateStorageAsync(Storage storage);
        Task<Storage> UpdateStorageAsync(string id, Storage storage);
        Task<bool> DeleteStorage(string id, string title);

    }
}
