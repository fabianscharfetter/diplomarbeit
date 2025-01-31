using Azure.Storage.Blobs.Models;
using Azure.Storage.Blobs;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;

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
            var blobClient = _blobContainerClient.GetBlobClient(fileName);

            await blobClient.UploadAsync(imageStream, new BlobHttpHeaders { ContentType = "image/jpeg" });

            return blobClient.Uri.ToString();
        }

        // Methode zum Downloaden eines Bildes aus dem Blob Storage
        public async Task<Stream> DownloadImageAsync(string fileName)
        {
            var blobClient = _blobContainerClient.GetBlobClient(fileName);

            // Überprüfen, ob das Blob existiert
            if (await blobClient.ExistsAsync())
            {
                var blobDownloadInfo = await blobClient.DownloadAsync();
                return blobDownloadInfo.Value.Content;
            }
            else
            {
                throw new FileNotFoundException("Das Bild wurde nicht gefunden.");
            }
        }


    }
}
