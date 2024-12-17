﻿using Microsoft.Azure.Cosmos;
using VisualObjectRecognition.Server.Models;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace VisualObjectRecognition.Server.Services
{
    public class StorageRepository : IStorageRepository
    {
        private readonly Container _container;
        public StorageRepository(string conn, string key, string databaseName, string containerName)
        {
            var cosmosClient = new CosmosClient(conn, key, new CosmosClientOptions() { });
            _container = cosmosClient.GetContainer(databaseName, containerName);
        }

        public async Task<IEnumerable<Models.Storage>> GetStoragesAsync()
        {
            var query = _container.GetItemQueryIterator<Models.Storage>(new QueryDefinition("SELECT * FROM c"));

            var results = new List<Models.Storage>();

            while (query.HasMoreResults)
            {
                var response = await query.ReadNextAsync();
                results.AddRange(response.ToList());
            }

            return results;
        }

        public async Task<Models.Storage> GetStorageAsync(string id, string title)
        {
            try
            {
                var response = await _container.ReadItemAsync<Models.Storage>(id, new PartitionKey(title));
                return response;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new InvalidOperationException($"Error retrieving storage with ID {id}", ex);
            }
        }

        public async Task<Models.Storage> CreateStorageAsync(Models.Storage storage)
        {
            var response = await _container.CreateItemAsync(storage, new PartitionKey(storage.Title));
            return response.Resource;
        }

        public async Task<bool> DeleteStorage(string id, string title)
        {
            var response = await _container.DeleteItemAsync<Models.Storage>(id, new PartitionKey(title));

            if (response.Resource != null)
                return true;

            return false;
        }

        public async Task<Models.Storage> UpdateStorageAsync(string id, Models.Storage storage)
        {
            var response = await _container.UpsertItemAsync(storage, new PartitionKey(storage.Title));
            return response.Resource;
        }
    }
}