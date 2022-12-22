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

                return Ok(JsonConverter.ConvertOtherUser(_unitOfWork.UserRepository.GetItems().Where(u=> !string.Equals(u.UserType, "MainAdmin")
                                                                                                                             && !string.Equals(u.UserType, "ContentAdmin")
                                                                                                                              && !string.Equals(u.UserType, "AccessAdmin")), _unitOfWork));
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

                var userIdForm = Request.Form["userId"];

                int userId = int.Parse(userIdForm);

                var posts = _unitOfWork.PostRepository.GetItems().Where(p => p.UserId == userId);
                foreach(var item in posts)
                {
                    item.UserId = null;
                    _unitOfWork.PostRepository.UpdateElement(item);
                    _unitOfWork.SaveChanges();
                }

                var comments = _unitOfWork.CommentRepository.GetItems().Where(c => c.UserId == userId);
                foreach (var item in comments)
                {
                    item.UserId = null;
                    _unitOfWork.CommentRepository.UpdateElement(item);
                    _unitOfWork.SaveChanges();
                }

                var messageSended = _unitOfWork.MessageRepository.GetItems().Where(m => m.UserSenderId == userId);
                foreach (var item in messageSended)
                {
                    item.UserSenderId = null;
                    _unitOfWork.MessageRepository.UpdateElement(item);
                    _unitOfWork.SaveChanges();
                }

                var messageRecieved = _unitOfWork.MessageRepository.GetItems().Where(m => m.UserReceiverId == userId);
                foreach (var item in messageRecieved)
                {
                    item.UserReceiverId = null;
                    _unitOfWork.MessageRepository.UpdateElement(item);
                    _unitOfWork.SaveChanges();
                }

                var relationSended = _unitOfWork.FriendRepository.GetItems().Where(fr=>fr.UserId == userId);
                foreach (var item in relationSended)
                {
                    item.UserId = null;
                    _unitOfWork.FriendRepository.UpdateElement(item);
                    _unitOfWork.SaveChanges();
                }

                var relationRecieved = _unitOfWork.FriendRepository.GetItems().Where(fr=>fr.FriendId == userId);
                foreach (var item in relationRecieved)
                {
                    item.FriendId = null;
                    _unitOfWork.FriendRepository.UpdateElement(item);
                    _unitOfWork.SaveChanges();
                }

                var likes = _unitOfWork.LikeRepository.GetItems().Where(l=> l.UserId == userId);
                foreach (var item in likes)
                {
                    item.UserId = null;
                    _unitOfWork.LikeRepository.UpdateElement(item);
                    _unitOfWork.SaveChanges();
                }

                _unitOfWork.UserRepository.DeleteElement(userId);
                _unitOfWork.SaveChanges();

                return Ok(JsonConverter.ConvertOtherUser(_unitOfWork.UserRepository.GetItems().Where(u => !string.Equals(u.UserType, "MainAdmin")
                                                                                                                             && !string.Equals(u.UserType, "ContentAdmin")
                                                                                                                              && !string.Equals(u.UserType, "AccessAdmin")), _unitOfWork));
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
