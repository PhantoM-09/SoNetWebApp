using DatabaseManager.Pattern;
using Microsoft.AspNetCore.Mvc;
using Models;
using System.Text.Json;
using WebApiServer.Model;
using WebApiServer.Utils;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApiServer.Controllers
{
    [Route("api/user/")]
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

        [Route("get-users")]
        [HttpGet]
        public IActionResult GetUsers()
        {
            try
            {
                var jwtToken = Request.Cookies["jwt"];
                var validatedToken = _jwtService.Verify(jwtToken);

                return Ok(JsonConverter.ConvertOtherUser(_unitOfWork.UserRepository.GetItems().Where(u=> !string.Equals(u.UserType, "Admin")), _unitOfWork));
            }
            catch (Exception ex)
            {
                return Unauthorized(new { message = "Вы не авторизованы" });
            }
        }

        [Route("get-all-users")]
        [HttpGet]
        public IActionResult GetAllUsers()
        {
            try
            {
                var jwtToken = Request.Cookies["jwt"];
                var validatedToken = _jwtService.Verify(jwtToken);

                var userId = int.Parse(validatedToken.Issuer);

                return Ok(JsonConverter.ConvertOtherUser(_unitOfWork.UserRepository.GetItems().Where(u=>u.UserId != userId), _unitOfWork));
            }
            catch (Exception ex)
            {
                return Unauthorized(new { message = "Вы не авторизованы" });
            }
        }

        [Route("delete-user")]
        [HttpPost]
        public IActionResult DeleteUser()
        {
            try
            {
                var jwtToken = Request.Cookies["jwt"];
                var validatedToken = _jwtService.Verify(jwtToken);

                var userId = Request.Form["userId"];

                _unitOfWork.UserRepository.DeleteElement(int.Parse(userId));
                _unitOfWork.SaveChanges();

                return Ok(JsonConverter.ConvertOtherUser(_unitOfWork.UserRepository.GetItems().Where(u => !string.Equals(u.UserType, "Admin")), _unitOfWork));
            }
            catch (Exception ex)
            {
                return Unauthorized(new { message = "Вы не авторизованы" });
            }
        }


        [Route("get-user")]
        [HttpGet]
        public IActionResult GetUser()
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

        [Route("get-strange-user/{id}")]
        [HttpGet]
        public IActionResult GetStrangeUser(int id)
        {
            try
            {
                var jwtToken = Request.Cookies["jwt"];
                var validatedToken = _jwtService.Verify(jwtToken);
                var userId = int.Parse(validatedToken.Issuer);

                var strangeUser = _unitOfWork.UserRepository.GetItem(id);

                if (strangeUser == null)
                    return NotFound(new { message = "Данного пользователя не существует" });

                return Ok(JsonConverter.ConvertStrangeUser(userId, strangeUser, _unitOfWork));
            }
            catch (Exception ex)
            {
                return Unauthorized(new { message = "Вы не авторизованы" });
            }
        }
    }
}
