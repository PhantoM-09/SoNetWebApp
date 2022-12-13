using DatabaseManager.Pattern;
using Microsoft.AspNetCore.Mvc;
using Models;
using WebApiServer.Utils;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApiServer.Controllers
{
    [Route("api/friend/")]
    [ApiController]
    public class FriendController : ControllerBase
    {
        UnitOfWork _unitOfWork;
        JwtService _jwtService;
        public FriendController(UnitOfWork unitOfWork, JwtService jwtService)
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
                var userId = int.Parse(validatedToken.Issuer);

                var users = _unitOfWork.UserRepository.GetItems().Where(u => u.UserId != userId && u.RelationSend?.FirstOrDefault(rs => rs.FriendId == userId) == null && u.RelationReceive?.FirstOrDefault(rr => rr.UserId == userId) == null);
                return Ok(JsonConverter.ConvertOtherUser(users, _unitOfWork));
            }
            catch (Exception ex)
            {
                return Unauthorized(new { message = "Вы не авторизованы" });
            }
        }

        [Route("get-friends")]
        [HttpGet]
        public IActionResult GetFriends()
        {
            try
            {
                var jwtToken = Request.Cookies["jwt"];
                var validatedToken = _jwtService.Verify(jwtToken);
                var userId = int.Parse(validatedToken.Issuer);

                var users = _unitOfWork.UserRepository.GetItems().Where(u => u.UserId != userId  && u.RelationReceive?.FirstOrDefault(rr => rr.UserId == userId && rr.FriendRelation == 1) != null );
                return Ok(JsonConverter.ConvertOtherUser(users, _unitOfWork));
            }
            catch (Exception ex)
            {
                return Unauthorized(new { message = "Вы не авторизованы" });
            }
        }

        [Route("get-subscribers")]
        [HttpGet]
        public IActionResult GetSubscribers()
        {
            try
            {
                var jwtToken = Request.Cookies["jwt"];
                var validatedToken = _jwtService.Verify(jwtToken);
                var userId = int.Parse(validatedToken.Issuer);

                var users = _unitOfWork.UserRepository.GetItems().Where(u => u.UserId != userId && u.RelationReceive?.FirstOrDefault(rr => rr.UserId == userId && rr.FriendRelation == 0) != null);
                return Ok(JsonConverter.ConvertOtherUser(users, _unitOfWork));
            }
            catch (Exception ex)
            {
                return Unauthorized(new { message = "Вы не авторизованы" });
            }
        }

        [Route("add-friend")]
        [HttpPost]
        public IActionResult AddFriend()
        {
            try
            {
                var jwtToken = Request.Cookies["jwt"];
                var validatedToken = _jwtService.Verify(jwtToken);
                var userId = int.Parse(validatedToken.Issuer);

                var friendId = Request.Form["friendId"];

                _unitOfWork.FriendRepository.AddElement(
                    new Friend
                    {
                        UserId = userId,
                        FriendId = int.Parse(friendId),
                        FriendRelation = 1
                    });

                _unitOfWork.FriendRepository.AddElement(
                   new Friend
                   {
                       UserId = int.Parse(friendId),
                       FriendId = userId,
                       FriendRelation = 0
                   });

                _unitOfWork.SaveChanges();

                return Ok();
            }
            catch(Exception e)
            {
                return Unauthorized(new { message = "Вы не авторизованы" });
            }
            
        }

        [Route("delete-friend")]
        [HttpPost]
        public IActionResult DeleteFriend()
        {
            try
            {
                var flagWho = "";

                var jwtToken = Request.Cookies["jwt"];
                var validatedToken = _jwtService.Verify(jwtToken);
                var userId = int.Parse(validatedToken.Issuer);

                var friendId = Request.Form["friendId"];

                var hisRelation = _unitOfWork.FriendRepository.GetItem(int.Parse(friendId), userId);
                if(hisRelation.FriendRelation == 1)
                {
                    var myRelation = _unitOfWork.FriendRepository.GetItem(userId, int.Parse(friendId));
                    myRelation.FriendRelation = 0;
                    _unitOfWork.FriendRepository.UpdateElement(myRelation);
                    flagWho = "subscriber";
                }
                else
                {
                    _unitOfWork.FriendRepository.DeleteElement(userId, int.Parse(friendId));
                    _unitOfWork.FriendRepository.DeleteElement(int.Parse(friendId), userId);
                    flagWho = "other";
                }

                _unitOfWork.SaveChanges();

                return Ok(flagWho);
            }
            catch (Exception e)
            {
                return Unauthorized(new { message = "Вы не авторизованы" });
            }

        }

        [Route("apply-friend")]
        [HttpPost]
        public IActionResult ApplyFriend()
        {
            try
            {
                var jwtToken = Request.Cookies["jwt"];
                var validatedToken = _jwtService.Verify(jwtToken);
                var userId = int.Parse(validatedToken.Issuer);

                var friendId = Request.Form["friendId"];

                var relation = _unitOfWork.FriendRepository.GetItem(userId, int.Parse(friendId));
                relation.FriendRelation = 1;
                _unitOfWork.SaveChanges();

                return Ok();
            }
            catch (Exception e)
            {
                return Unauthorized(new { message = "Вы не авторизованы" });
            }

        }
    }
}
