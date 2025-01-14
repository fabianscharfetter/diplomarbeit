using Microsoft.Azure.Cosmos;
using MongoDB.Driver;
using VisualObjectRecognition.Server.Models;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace VisualObjectRecognition.Server.Services
{
    public class UserRepository : IUserRepository
    {
        private readonly Container _container;
        public UserRepository(string conn, string key, string databaseName, string containerName) 
        { 
            var cosmosClient = new CosmosClient(conn, key, new CosmosClientOptions() { });
            _container = cosmosClient.GetContainer(databaseName, containerName);
        }

        public async Task<IEnumerable<Models.User>> GetUsersAsync()
        {
            var query = _container.GetItemQueryIterator<Models.User>(new QueryDefinition("SELECT * FROM c"));

            var results = new List<Models.User>();

            while(query.HasMoreResults)
            {
                var response = await query.ReadNextAsync();
                results.AddRange(response.ToList());
            }

            return results;
        }

        public async Task<IEnumerable<Models.User>> GetUserAsync(string id)
        {
            var query = _container.GetItemQueryIterator<Models.User>(new QueryDefinition("SELECT * FROM c WHERE c.id = @id").WithParameter("@id", id));

            try
            {
                var response = await query.ReadNextAsync();
                return response;

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new InvalidOperationException($"Error retrieving user with ID {id}", ex);
            }
        }

        public async Task<Models.User> CreateUserAsync(Models.User user)
        {
            var response = await _container.CreateItemAsync(user, new PartitionKey(user.SecondName));
            return response.Resource;
        }

        public async Task<bool> DeleteUser(string id, string secondname)
        {
            try
            {
                var response = await _container.DeleteItemAsync<Models.User>(id, new PartitionKey(secondname));
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<Models.User> UpdateUserAsync(string id, Models.User user)
        {
            var response = await _container.UpsertItemAsync(user, new PartitionKey(user.SecondName));
            return response.Resource;
        }
    }
}
