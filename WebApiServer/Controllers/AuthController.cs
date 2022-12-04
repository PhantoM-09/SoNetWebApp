﻿using DatabaseManager.Pattern;
using Microsoft.AspNetCore.Mvc;
using Models;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using WebApiServer.Model;
using WebApiServer.Utils;

namespace WebApiServer.Controllers
{
    [Route("api/auth/")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        UnitOfWork _unitOfWork;
        JwtService _jwtService;
        public AuthController(UnitOfWork unitOfWork, JwtService jwtService)
        {
            this._unitOfWork = unitOfWork;
            this._jwtService = jwtService;
        }

        // POST api/registration
        [Route("register")]
        [HttpPost]
        public IActionResult Register([FromBody] SimpleUser simpleUser)
        {
            var userExist = _unitOfWork.UserRepository.GetItems().FirstOrDefault(u => u.UserEmail == simpleUser.UserEmail);
            if(userExist != null)
            {
                return BadRequest(new { message = "Email занят" });
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

            return Ok();
        }

        [Route("login")]
        [HttpPost]
        public IActionResult Login()
        {
            var email = Request.Form["email"];
            var foundUser = _unitOfWork.UserRepository.GetItems().FirstOrDefault(u => u.UserEmail == email);
            if (foundUser == null)
                return BadRequest(new {message = "Несуществующий email"});

            var password = Request.Form["password"];
            var md5 = MD5.Create();
            if (!string.Equals(foundUser.UserPassword, Convert.ToBase64String(md5.ComputeHash(Encoding.UTF8.GetBytes(password)))))
                return BadRequest(new { message = "Неверный пароль" });

            var jwtToken = _jwtService.GenerateToken(foundUser.UserId, foundUser.UserType);
            Response.Cookies.Append("jwtToken", jwtToken, new CookieOptions
            {
                HttpOnly = true
            });

            return Ok();
        }
    }
}
