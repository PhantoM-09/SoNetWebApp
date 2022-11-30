using DatabaseManager.Pattern;
using Microsoft.AspNetCore.Mvc;
using Models;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using WebApiServer.Model;

namespace WebApiServer.Controllers
{
    [Route("api")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        UnitOfWork _unitOfWork;
        public AuthController(UnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }

        // POST api/registration
        [Route("registration")]
        [HttpPost]
        public string Registration([FromBody] SimpleUser simpleUser)
        {
            var userExist = _unitOfWork.UserRepository.GetItems().FirstOrDefault(u => u.UserEmail == simpleUser.UserEmail);
            if(userExist != null)
            {
                return JsonSerializer.Serialize("Email занят");
            }

            MD5 md5 = MD5.Create();

            User user = new User
            {
                UserLastName = simpleUser.UserLastName,
                UserName = simpleUser.UserName,
                UserEmail = simpleUser.UserEmail,
                UserPassword = Convert.ToBase64String(
                                        md5.ComputeHash(
                                            Encoding.UTF8.GetBytes(simpleUser.UserPassword))),
                UserSex = simpleUser.UserSex,
                UserBirthDay = (DateTime)simpleUser.UserBirthDay,
                UserIsOnline = false,
                UserType = "User",

            };
            _unitOfWork.UserRepository.AddElement(user);
            _unitOfWork.SaveChanges();

            Directory.CreateDirectory("wwwroot/" + Convert.ToBase64String(
                                                           md5.ComputeHash(
                                                               Encoding.UTF8.GetBytes(user.UserEmail))));

            return JsonSerializer.Serialize("");
        }



    }
}
