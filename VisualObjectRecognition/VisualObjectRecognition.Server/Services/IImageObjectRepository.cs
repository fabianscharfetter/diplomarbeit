using VisualObjectRecognition.Server.Models;

namespace VisualObjectRecognition.Server.Services
{
    public interface IImageObjectRepository
    {

        Task<IEnumerable<ImageObject>> GetImageObjectsAsync();
        Task<IEnumerable<ImageObject>> GetImageObjectAsync(string id);
        Task<ImageObject> CreateImageObjectAsync(ImageObject imageObject);
        Task<ImageObject> UpdateImageObjectAsync(string id, ImageObject imageObject);
        Task<bool> DeleteImageObject(string id, string userid);
    }
}
