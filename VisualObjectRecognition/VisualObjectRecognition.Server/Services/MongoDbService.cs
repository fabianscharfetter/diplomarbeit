using Microsoft.Extensions.Options;
using MongoDB.Driver;
using VisualObjectRecognition.Server.Data;
using VisualObjectRecognition.Server.Models;

namespace VisualObjectRecognition.Server.Services
{
    public class MongoDbService
    {
        private readonly IMongoCollection<User> _usersCollection;

        public MongoDbService(IOptions<MongoDbSettings> settings)
        {
            var mongoClient = new MongoClient(settings.Value.ConnectionString);
            var database = mongoClient.GetDatabase(settings.Value.DatabaseName);
            _usersCollection = database.GetCollection<User>("Users");
        }

        public async Task<List<User>> GetUsersAsync() =>
            await _usersCollection.Find(user => true).ToListAsync();

        public async Task<User> GetUserByIdAsync(string id) =>
            await _usersCollection.Find(user => user.Id == id).FirstOrDefaultAsync();

        public async Task CreateUserAsync(User newUser) =>
            await _usersCollection.InsertOneAsync(newUser);

        public async Task UpdateUserAsync(string id, User updatedUser) =>
            await _usersCollection.ReplaceOneAsync(user => user.Id == id, updatedUser);

        public async Task DeleteUserAsync(string id) =>
            await _usersCollection.DeleteOneAsync(user => user.Id == id);
    }
}
