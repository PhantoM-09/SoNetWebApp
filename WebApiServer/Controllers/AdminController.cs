using DatabaseManager.Pattern;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;
using WebApiServer.Utils;

namespace WebApiServer.Controllers
{
    [Route("api/admin")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        UnitOfWork _unitOfWork;
        JwtService _jwtService;

        public AdminController(UnitOfWork unitOfWork, JwtService jwtService)
        {
            this._unitOfWork = unitOfWork;
            this._jwtService = jwtService;
        }


        [Route("add-admin/{id}")]
        [HttpPost]
        public IActionResult GrantAdmin(int id)
        {
            try
            {
                var jwtToken = Request.Cookies["jwt"];
                var validatedToken = _jwtService.Verify(jwtToken);

                var user = _unitOfWork.UserRepository.GetItem(id);

                user.UserType = Request.Form["type"];
                _unitOfWork.UserRepository.UpdateElement(user);
                _unitOfWork.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {
                return Unauthorized(new { message = "Вы не авторизованы" });
            }
        }

        [Route("delete-admin/{id}")]
        [HttpDelete]
        public IActionResult RevokeAdmin(int id)
        {
            try
            {
                var jwtToken = Request.Cookies["jwt"];
                var validatedToken = _jwtService.Verify(jwtToken);

                var user = _unitOfWork.UserRepository.GetItem(id);

                user.UserType = "User";
                _unitOfWork.UserRepository.UpdateElement(user);
                _unitOfWork.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {
                return Unauthorized(new { message = "Вы не авторизованы" });
            }
        }

        [Route("get-admins/")]
        [HttpGet]
        public IActionResult GetAdmins()
        {
            try
            {
                var jwtToken = Request.Cookies["jwt"];
                var validatedToken = _jwtService.Verify(jwtToken);

                return Ok(JsonConverter.ConvertOtherUser(_unitOfWork.UserRepository.GetItems().Where(u => u.BlockId == null && !string.Equals(u.UserType, "MainAdmin")
                                                                                                                             && !string.Equals(u.UserType, "User")), _unitOfWork));
            }
            catch (Exception ex)
            {
                return Unauthorized(new { message = "Вы не авторизованы" });
            }
        }
    }
}
