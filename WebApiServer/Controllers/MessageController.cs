using DatabaseManager.Pattern;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;
using System.Linq;
using WebApiServer.Utils;

namespace WebApiServer.Controllers
{
    [Route("api/message")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        UnitOfWork _unitOfWork;
        JwtService _jwtService;

        public MessageController(UnitOfWork unitOfWork, JwtService jwtService)
        {
            this._unitOfWork = unitOfWork;
            this._jwtService = jwtService;
        }


        [Route("get-messages/{id}")]
        [HttpGet]
        public IActionResult GetMessages(int id)
        {
            try
            {
                var jwtToken = Request.Cookies["jwt"];
                var validatedToken = _jwtService.Verify(jwtToken);
                var userId = int.Parse(validatedToken.Issuer);

                var messages = _unitOfWork.MessageRepository.GetItems().Where(m => m.UserSenderId == userId && m.UserReceiverId == id).Union(_unitOfWork.MessageRepository.GetItems().Where(m => m.UserSenderId == id && m.UserReceiverId == userId));
                return Ok(JsonConverter.ConvertMessages(messages.OrderBy(m=> m.MessageCreate), _unitOfWork));
            }
            catch (Exception ex)
            {
                return Unauthorized(new { message = "Вы не авторизованы" });
            }

        }
    }
}
