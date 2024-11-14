using Microsoft.Extensions.Options;
using MongoDB.Driver;
using VisualObjectRecognition.Server.Data;
using VisualObjectRecognition.Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace VisualObjectRecognition.Server.Services
{
    public class MongoDbService
    {
        private readonly IMongoCollection<User> _usersCollection;
        private readonly IMongoCollection<Storage> _storageCollection;

        public MongoDbService(IOptions<MongoDbSettings> settings)
        {
            var mongoClient = new MongoClient(settings.Value.ConnectionString);
            var database = mongoClient.GetDatabase(settings.Value.DatabaseName);

            _usersCollection = database.GetCollection<User>("Users");
            _storageCollection = database.GetCollection<Storage>("Storage");
        }

        // CRUD-Operationen für User
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

        // CRUD-Operationen für Storage
        public async Task<List<Storage>> GetStoragesAsync() =>
            await _storageCollection.Find(storage => true).ToListAsync();

        public async Task<Storage> GetStorageByIdAsync(string id) =>
            await _storageCollection.Find(storage => storage.Id == id).FirstOrDefaultAsync();

        public async Task CreateStorageAsync(Storage newStorage) =>
            await _storageCollection.InsertOneAsync(newStorage);

        public async Task UpdateStorageAsync(string id, Storage updatedStorage) =>
            await _storageCollection.ReplaceOneAsync(storage => storage.Id == id, updatedStorage);

        public async Task DeleteStorageAsync(string id) =>
            await _storageCollection.DeleteOneAsync(storage => storage.Id == id);
    }
}
