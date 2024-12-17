using VisualObjectRecognition.Server.Models;

namespace VisualObjectRecognition.Server.Services
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetUsersAsync();
        Task<User> GetUserAsync(string id, string secondname);

        Task<User> CreateUserAsync(User user);
        Task<User> UpdateUserAsync(string id, User user);
        Task<bool> DeleteUser(string id, string secondname);
    }
}
