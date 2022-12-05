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
                User foundUser = _unitOfWork.UserRepository.GetItem(userId);
                SimpleUser user = new SimpleUser
                {
                    UserId = foundUser.UserId,
                    UserLastName = foundUser.UserLastName,
                    UserName = foundUser.UserName,
                    UserBirthDay = foundUser.UserBirthDay,
                    UserSex = foundUser.UserSex
                };

                return Ok(user);
            }
            catch(Exception ex)
            {
                return Unauthorized(new {message = "Вы не авторизованы"});
            }


        }
    }
}
