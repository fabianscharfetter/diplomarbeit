﻿using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using Microsoft.AspNetCore.Identity;
using AspNetCore.Identity.MongoDbCore.Models;

namespace VisualObjectRecognition.Server.Models
{
    public class User
    {

        [Newtonsoft.Json.JsonProperty(PropertyName = "id")]
        public string Id { get; set; } = string.Empty;


        public string Email { get; set; } = string.Empty;


        public string PasswordHash { get; set; } = string.Empty;


        public string FirstName { get; set; } = string.Empty;


        [Newtonsoft.Json.JsonProperty(PropertyName = "secondname")]
        public string SecondName { get; set; } = string.Empty;


        public UserRole Role { get; set; } 


        public string? Firma { get; set; }


        public string PhoneNbr { get; set; } = string.Empty;


        public Adress? Adress { get; set; }


        public List<Storage>? Storages { get; set; }


		public List<Item>? Items { get; set; }
	}
}
