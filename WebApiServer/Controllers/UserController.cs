using DatabaseManager.Pattern;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using Models;
using System.Globalization;
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

        [Route("get-countries")]
        [HttpGet]
        public IActionResult GetCountries()
        {
            try
            {
                var jwtToken = Request.Cookies["jwt"];
                var validatedToken = _jwtService.Verify(jwtToken);

                var addresses = _unitOfWork.AddressRepository.GetItems();

                return Ok(addresses.Distinct());                                                                                                         
            }
            catch (Exception ex)
            {
                return Unauthorized(new { message = "Вы не авторизованы" });
            }
        }

        [Route("get-cities/{id}")]
        [HttpGet]
        public IActionResult GetCities(int id)
        {
            try
            {
                var jwtToken = Request.Cookies["jwt"];
                var validatedToken = _jwtService.Verify(jwtToken);

                var address = _unitOfWork.AddressRepository.GetItem(id);

                List<string> cities = new List<string>();
                var addresses = _unitOfWork.AddressRepository.GetItems().Where(a => string.Equals(a.AddressCountry, address.AddressCountry));

                foreach(var item in addresses)
                {
                    cities.Add(item.AddressCity);
                }

                return Ok(cities);
            }
            catch (Exception ex)
            {
                return Unauthorized(new { message = "Вы не авторизованы" });
            }
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
                if(posts != null)
                {
                    foreach (var item in posts)
                    {
                        item.UserId = null;
                        _unitOfWork.PostRepository.DeleteElement(item.PostId);
                        _unitOfWork.SaveChanges();
                    }
                }


                var comments = _unitOfWork.CommentRepository.GetItems().Where(c => c.UserId == userId);
                if(comments != null)
                {
                    foreach (var item in comments)
                    {
                        item.UserId = null;
                        item.PostId = null;
                        _unitOfWork.CommentRepository.DeleteElement(item.CommentId);
                        _unitOfWork.SaveChanges();
                    }
                }

                var messageSended = _unitOfWork.MessageRepository.GetItems().Where(m => m.UserSenderId == userId);
                if(messageSended != null)
                {
                    foreach (var item in messageSended)
                    {
                        item.UserSenderId = null;
                        item.UserReceiverId = null;
                        _unitOfWork.MessageRepository.DeleteElement(item.MessageId);
                        _unitOfWork.SaveChanges();
                    }
                }

                var messageRecieved = _unitOfWork.MessageRepository.GetItems().Where(m => m.UserReceiverId == userId);
                if(messageRecieved != null)
                {
                    foreach (var item in messageRecieved)
                    {
                        item.UserReceiverId = null;
                        item.UserSenderId = null;
                        _unitOfWork.MessageRepository.DeleteElement(item.MessageId);
                        _unitOfWork.SaveChanges();
                    }
                }

                var relationSended = _unitOfWork.FriendRepository.GetItems().Where(fr=>fr.UserId == userId);
                if(relationSended != null)
                {
                    foreach (var item in relationSended)
                    {
                        item.UserId = null;
                        item.FriendId = null;
                        _unitOfWork.FriendRepository.DeleteElement(item.RelationId);
                        _unitOfWork.SaveChanges();
                    }
                }

                var relationRecieved = _unitOfWork.FriendRepository.GetItems().Where(fr=>fr.FriendId == userId);
                if(relationRecieved != null)
                {
                    foreach (var item in relationRecieved)
                    {
                        item.FriendId = null;
                        item.UserId = null;
                        _unitOfWork.FriendRepository.DeleteElement(item.RelationId);
                        _unitOfWork.SaveChanges();
                    }
                }

                var likes = _unitOfWork.LikeRepository.GetItems().Where(l=> l.UserId == userId);
                if(likes != null)
                {
                    foreach (var item in likes)
                    {
                        item.UserId = null;
                        item.PostId = null;
                        _unitOfWork.LikeRepository.DeleteElement(item.LikeId);
                        _unitOfWork.SaveChanges();
                    }
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

        [Route("edit-user")]
        [HttpPut]
        public IActionResult EditUser()
        {
            try
            {
                var jwtToken = Request.Cookies["jwt"];
                var validatedToken = _jwtService.Verify(jwtToken);
                var userId = int.Parse(validatedToken.Issuer);

                var lastName = Request.Form["lastName"];
                var name = Request.Form["name"];
                var birthDate = Request.Form["birthDate"];
                var country = Request.Form["country"];
                var city = Request.Form["city"];
                var sex = Request.Form["sex"];

                var user = _unitOfWork.UserRepository.GetItem(userId);

                if(!StringValues.IsNullOrEmpty(lastName))
                {
                    user.UserLastName = !string.Equals(lastName, user.UserLastName) ? lastName : user.UserLastName;
                }

                if (!StringValues.IsNullOrEmpty(name))
                {
                    user.UserName = !string.Equals(name, user.UserName) ? name : user.UserName;
                }

                if (!StringValues.IsNullOrEmpty(birthDate))
                {
                    var newBirthDate = DateTime.ParseExact(birthDate, "dd.mm.yyyy", CultureInfo.InvariantCulture);
                    user.UserBirthDay = newBirthDate != user.UserBirthDay ? newBirthDate : user.UserBirthDay;
                    
                }

                if (!StringValues.IsNullOrEmpty(sex))
                {
                    user.UserSex = !string.Equals(sex, user.UserSex) ? sex : user.UserSex;

                }

                if(!StringValues.IsNullOrEmpty(country))
                {
                    var address = _unitOfWork.AddressRepository.GetItems().FirstOrDefault(a => a.AddressCountry == country && a.AddressCity == city);
                    user.AddressId = address.AddressId != user.AddressId ? address.AddressId : user.AddressId;
                }

                _unitOfWork.UserRepository.UpdateElement(user);
                _unitOfWork.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {
                return Unauthorized(new { message = "Вы не авторизованы" });
            }
        }
    }
}
