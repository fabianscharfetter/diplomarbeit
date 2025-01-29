using Azure.Storage.Blobs.Models;
using Azure.Storage.Blobs;
using System.Text.RegularExpressions;

namespace VisualObjectRecognition.Server.Services
{
    public class BlobStorageService
    {
        private readonly BlobContainerClient _blobContainerClient;

        public BlobStorageService(IConfiguration configuration)
        {
            string connectionString = configuration["StorageAccount:connectionString"];
            string containerName = configuration["StorageAccount:imagesContainer"];

            var blobServiceClient = new BlobServiceClient(connectionString);
            _blobContainerClient = blobServiceClient.GetBlobContainerClient(containerName);
            _blobContainerClient.CreateIfNotExists(PublicAccessType.Blob);
        }

        public async Task<string> UploadPngImageAsync(Stream imageStream, string fileName)
        {
            fileName = Regex.Replace(fileName, @"[\-_:\[\]{}()/\\]", ".");
            fileName = Regex.Replace(fileName, @"[\s]", "_");


            var blobClient = _blobContainerClient.GetBlobClient(fileName);

            await blobClient.UploadAsync(imageStream, new BlobHttpHeaders { ContentType = "image/jpeg" });

            return blobClient.Uri.ToString();
        }
    }
}
