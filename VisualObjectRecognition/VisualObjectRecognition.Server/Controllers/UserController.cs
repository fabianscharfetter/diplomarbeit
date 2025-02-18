using Microsoft.AspNetCore.Mvc;
using VisualObjectRecognition.Server.Models;
using VisualObjectRecognition.Server.Services;
using Newtonsoft.Json;
using System.Text;


namespace VisualObjectRecognition.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {

        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        // GET: api/User
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            try
            {
                var users = await _userRepository.GetUsersAsync();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        // GET: api/User/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(string id)
        {
            try
            {
                var response = await _userRepository.GetUserAsync(id);
                var user = response.FirstOrDefault();

                if (user == null)
                {
                    return NotFound($"User with ID {id} not found.");
                }
                return Ok(user);
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        // POST: api/User
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] Models.User user)
        {
            if (user == null)
            {
                return BadRequest("User object is null.");
            }

            try
            {
                var createdUser = await _userRepository.CreateUserAsync(user);
                return CreatedAtAction(nameof(GetUser), new { id = createdUser.Id }, createdUser);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        // PUT: api/User/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(string id, [FromBody] Models.User user)
        {
            if (user == null || user.Id != id)
            {
                return BadRequest("User ID mismatch.");
            }

            try
            {
                var updatedUser = await _userRepository.UpdateUserAsync(id, user);
                return Ok(updatedUser);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        // DELETE: api/User/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id, string secondname)
        {
            try
            {
                var success = await _userRepository.DeleteUser(id, secondname);
                if (success)
                {
                    return Ok($"Successfully deleted user {id}!");
                }
                return NotFound($"User with ID {id} not found.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        // ITEM Hinzufügen
        // POST: api/User/AddUserItem/{id}
        [HttpPost("/AddUserItem/{id}")]
        public async Task<IActionResult> AddUserItem(string id, [FromBody] string itemTitle)
        {
            try
            {
                var response = await _userRepository.GetUserAsync(id);
                var user = response.FirstOrDefault();

                if (user == null)
                {
                    return NotFound($"Fehler beim Hinzufügen eines Items");
                }

                var item = new Item();
                string itemid = Guid.NewGuid().ToString();
                item.Id = itemid;
                item.Title = itemTitle;
                item.Permisson = 0; // Legal als Standard

                if (user.Items == null)
                {
                    user.Items = new List<Item>();
                }
                user.Items.Add(item);

                await UpdateUser(id, user);

                return Ok(user);
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        // ITEM Löschen
        // POST: api/User/DeleteUserItem/{id}
        [HttpPost("/DeleteUserItem/{id}")]
        public async Task<IActionResult> DeleteUserItem(string id, [FromBody] string itemId)
        {
            try
            {
                var response = await _userRepository.GetUserAsync(id);
                var user = response.FirstOrDefault();

                if (user == null)
                {
                    return NotFound($"Fehler beim Hinzufügen eines Items");
                }

                if (user.Items != null)
                {
                    foreach(var item in user.Items)
                    {
                        if (item.Id == itemId)
                        {
                            user.Items.Remove(item);
                            await UpdateUser(id, user);
                            return Ok(user);
                        }
                    }
                }
                else
                {
                    return BadRequest();
                }

                return StatusCode(500, "An error occurred.");
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        // Storage Hinzufügen
        // POST: api/User/AddUserStorage/{id}
        [HttpPost("/AddUserStorage/{id}")]
        public async Task<IActionResult> AddUserStorage(string id, [FromBody] string storageID)
        {
            try
            {
                var response = await _userRepository.GetUserAsync(id);
                var user = response.FirstOrDefault();
                var storageObject = new Storage();

                if (user == null)
                {
                    return NotFound($"Fehler beim Hinzufügen eines Storages");
                }

                //Storage per ID suchen
                using (HttpClient client = new HttpClient())
                {
                    //Stroage User hinzufügen
                    string url = $"https://localhost:7228/api/Storage/{storageID}";
                    HttpResponseMessage http_response = await client.GetAsync(url);
                    if (http_response.IsSuccessStatusCode)
                    {
                        var responseJSON = await http_response.Content.ReadAsStringAsync();
                        storageObject = JsonConvert.DeserializeObject<Storage>(responseJSON);

                        if (user.Storages == null)
                        {
                            user.Storages = new List<Storage>();
                        }

                        if(storageObject == null)
                        {
                            return BadRequest("Storage konnte nicht gefunden werden!");
                        }
                        else
                        {
                            user.Storages.Add(storageObject);
                        }
                        await UpdateUser(id, user);


                    }
                    else
                    {
                        Console.WriteLine($"Fehler: {http_response.StatusCode}");
                        return BadRequest();
                    }
                }

                //UserId von Storage updaten 
                storageObject.UserID = id;
                using (HttpClient client = new HttpClient())
                {
                    string jsonStorage = JsonConvert.SerializeObject(storageObject);
                    string url = $"https://localhost:7228/api/Storage/{storageID}";

                    var content = new StringContent(jsonStorage, Encoding.UTF8, "application/json");

                    HttpResponseMessage httpResponse = await client.PutAsync(url, content);

                    // Antwort auslesen
                    if (httpResponse.IsSuccessStatusCode)
                    {
                        Console.WriteLine("Request erfolgreich!");
                        string responseContent = await httpResponse.Content.ReadAsStringAsync();
                    }
                    else
                    {
                        return BadRequest();
                    }
                }

                return Ok(user);
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }


        // Storage Löschen
        // POST: api/User/DeleteUserStorage/{id}
        [HttpPost("/DeleteUserStorage/{id}")]
        public async Task<IActionResult> DeleteUserStorage(string id, [FromBody] string storageID)
        {
            try
            {
                var response = await _userRepository.GetUserAsync(id);
                var user = response.FirstOrDefault();
                var storageObject = new Storage();

                if (user == null)
                {
                    return NotFound($"User nicht gefunden");
                }

                if (user.Storages != null)
                {
                    foreach (var storage in user.Storages)
                    {
                        if (storage.Id == storageID)
                        {
                            // Storage von User Storages entfernen
                            storageObject = storage;
                            user.Storages.Remove(storageObject);
                            if(user.Storages.Count == 0)
                            {
                                user.Storages = null;
                            }

                            // UserId von Storage löschen 
                            storageObject.UserID = null;
                            using (HttpClient client = new HttpClient())
                            {
                                string jsonStorage = JsonConvert.SerializeObject(storageObject);
                                string url = $"https://localhost:7228/api/Storage/{storageID}";

                                var content = new StringContent(jsonStorage, Encoding.UTF8, "application/json");

                                HttpResponseMessage httpResponse = await client.PutAsync(url, content);

                                // Antwort auslesen
                                if (httpResponse.IsSuccessStatusCode)
                                {
                                    Console.WriteLine("Request erfolgreich!");
                                    string responseContent = await httpResponse.Content.ReadAsStringAsync();
                                }
                                else
                                {
                                    return BadRequest($"Fehler beim Löschen der UserId von Storage {storageID}");
                                }
                            }
                            await UpdateUser(id, user);
                            return Ok(user);
                        }
                    }
                }
                else
                {
                    return BadRequest("Feheler beim Entfernen eines Storages");
                } 
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
            return BadRequest("Fehler");        
        }
    }
}
