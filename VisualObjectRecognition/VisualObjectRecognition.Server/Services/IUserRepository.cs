using VisualObjectRecognition.Server.Models;

namespace VisualObjectRecognition.Server.Services
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetUsersAsync();
        Task<IEnumerable<User>> GetUserAsync(string id);

        Task<User> CreateUserAsync(User user);
        Task<User> UpdateUserAsync(string id, User user);
        Task<bool> DeleteUser(string id, string secondname);
    }
}
