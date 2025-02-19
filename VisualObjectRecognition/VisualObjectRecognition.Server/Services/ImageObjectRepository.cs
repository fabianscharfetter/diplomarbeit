using Microsoft.Azure.Cosmos;
using MongoDB.Driver;
using VisualObjectRecognition.Server.Models;

namespace VisualObjectRecognition.Server.Services
{
    public class ImageObjectRepository : IImageObjectRepository
    {
        private readonly Container _container;
        public ImageObjectRepository(string conn, string key, string databaseName, string containerName)
        {
            var cosmosClient = new CosmosClient(conn, key, new CosmosClientOptions() { });
            _container = cosmosClient.GetContainer(databaseName, containerName);
        }

        public async Task<IEnumerable<ImageObject>> GetImageObjectsAsync()
        {
            var query = _container.GetItemQueryIterator<ImageObject>(new QueryDefinition("SELECT * FROM c"));

            var results = new List<ImageObject>();

            while (query.HasMoreResults)
            {
                var response = await query.ReadNextAsync();
                results.AddRange(response.ToList());
            }

            return results;
        }

        public async Task<IEnumerable<ImageObject>> GetImageObjectAsync(string id)
        {
            var query = _container.GetItemQueryIterator<ImageObject>(new QueryDefinition("SELECT * FROM c WHERE c.id = @id").WithParameter("@id", id));

            try
            {
                var response = await query.ReadNextAsync();
                return response;

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new InvalidOperationException($"Fehler beim Abfragen von Bild {id}!", ex);
            }
        }

        public async Task<ImageObject> CreateImageObjectAsync(ImageObject imageObject)
        {
            var response = await _container.CreateItemAsync(imageObject, new PartitionKey(imageObject.UserId));
            return response.Resource;
        }

        public async Task<bool> DeleteImageObject(string id, string userid)
        {
            try
            {
                var response = await _container.DeleteItemAsync<Models.User>(id, new PartitionKey(userid));
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public async Task<ImageObject> UpdateImageObjectAsync(string id, ImageObject imageObject)
        {
            var response = await _container.UpsertItemAsync(imageObject, new PartitionKey(imageObject.UserId));
            return response.Resource;
        }
    }
}
