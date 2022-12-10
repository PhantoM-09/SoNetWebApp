using DatabaseManager.Pattern;
using Microsoft.AspNetCore.Mvc;
using Models;
using System.Text.Json;
using WebApiServer.Model;
using WebApiServer.Utils;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApiServer.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        UnitOfWork _unitOfWork;
        JwtService _jwtService;
        public UserController(UnitOfWork unitOfWork, JwtService jwtService)
        {
            this._unitOfWork = unitOfWork;
            this._jwtService = jwtService;
        }

        [HttpGet("get-user")]
        public IActionResult Get()
        {
            try
            {
                var jwtToken = Request.Cookies["jwt"];
                var validatedToken = _jwtService.Verify(jwtToken);

                var userId = int.Parse(validatedToken.Issuer);
                var user = _unitOfWork.UserRepository.GetItem(userId);

                if (user == null)
                    return NotFound(new { message = "Вы были удалены" });

                if (user.BlockId != null)
                {
                    var userBlock = _unitOfWork.BlockRepository.GetItem(user.BlockId.Value);
                    var blockedMessage = "Вы были заблокированы. Причина: " + userBlock.BlockReason;
                    return BadRequest(new { message = blockedMessage});
                }    

                //проверить на null может быть удален адмнистратором и сделать проверку в заблокированных
                return Ok(JsonConverter.ConvertUser(user, _unitOfWork));
            }
            catch(Exception ex)
            {
                return Unauthorized(new {message = "Вы не авторизованы"});
            }
        }
    }
}
