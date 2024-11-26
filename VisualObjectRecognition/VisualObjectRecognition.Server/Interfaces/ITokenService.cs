using VisualObjectRecognition.Server.Models;

namespace VisualObjectRecognition.Server.Interfaces
{
	public interface ITokenService
	{
		string CreateToken(User user);
	}
}
