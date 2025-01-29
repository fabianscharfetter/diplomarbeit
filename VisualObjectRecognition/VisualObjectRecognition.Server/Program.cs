using VisualObjectRecognition.Server.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using VisualObjectRecognition.Server.Interfaces;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//COSMOSDB
builder.Services.AddScoped<IUserRepository, UserRepository>(
    x => new UserRepository(
        builder.Configuration.GetConnectionString("CosmosDb"),
        builder.Configuration["CosmosConfig:primaryKey"],
        builder.Configuration["CosmosConfig:databaseName"],
        builder.Configuration["CosmosConfig:userContainer"]
        ))
    .AddScoped<IStorageRepository, StorageRepository>(
    x => new StorageRepository(
        builder.Configuration.GetConnectionString("CosmosDb"),
        builder.Configuration["CosmosConfig:primaryKey"],
        builder.Configuration["CosmosConfig:databaseName"],
        builder.Configuration["CosmosConfig:storagesContainer"]
        ))
	.AddScoped<IImageObjectRepository, ImageObjectRepository>(
    x => new ImageObjectRepository(
        builder.Configuration.GetConnectionString("CosmosDb"),
        builder.Configuration["CosmosConfig:primaryKey"],
        builder.Configuration["CosmosConfig:databaseName"],
        builder.Configuration["CosmosConfig:imageObjectContainer"]
        ));

//Azure Storage Account
builder.Services.AddSingleton<BlobStorageService>();


builder.Services.AddAuthentication(options =>
{
	options.DefaultAuthenticateScheme =
	options.DefaultChallengeScheme =
	options.DefaultForbidScheme =
	options.DefaultScheme =
	options.DefaultSignInScheme =
	options.DefaultSignOutScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
	options.TokenValidationParameters = new TokenValidationParameters
	{
		ValidateIssuer = true,
		ValidIssuer = builder.Configuration["JWT:Issuer"],
		ValidateAudience = true,
		ValidAudience = builder.Configuration["JWT:Audience"],
		ValidateIssuerSigningKey = true,
		IssuerSigningKey = new SymmetricSecurityKey(
			System.Text.Encoding.UTF8.GetBytes(builder.Configuration["JWT:SigningKey"])
		)
	};
});

builder.Services.AddScoped<ITokenService, TokenService>();

// Füge CORS hinzu
builder.Services.AddCors(options =>
{
	options.AddPolicy("AllowSpecificOrigin", policy =>
	{
		policy.WithOrigins("https://localhost:5173") // Erlaube das Frontend
			  .AllowAnyHeader()
			  .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

// Aktiviere die CORS-Policy
app.UseCors("AllowSpecificOrigin");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();