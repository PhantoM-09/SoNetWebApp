using DatabaseManager.Pattern;
using Microsoft.AspNetCore.Mvc;
using Models;
using System.Security.Cryptography;
using System.Text;
using WebApiServer.Model;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApiServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        UnitOfWork _unitOfWork;
        public AuthController(UnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }

        // POST api/<AuthController>
        [HttpPost]
        public void Post([FromBody] SimpleUser simpleUser)
        {
            User user = new User();
            user.UserLastName = simpleUser.UserLastName;
            user.UserName = simpleUser.UserName;
            user.UserEmail = simpleUser.UserEmail;

            MD5 md5 = MD5.Create();
            user.UserPassword = Convert.ToBase64String(
                                        md5.ComputeHash(
                                            Encoding.UTF8.GetBytes(simpleUser.UserPassword)));

            user.UserSex = simpleUser.UserSex;
            user.UserBirthDay = simpleUser.UserBirthDay;
            
        }

        // PUT api/<AuthController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<AuthController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
