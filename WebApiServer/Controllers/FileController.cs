using DatabaseManager.Pattern;
using Microsoft.AspNetCore.Mvc;
using Models;
using WebApiServer.Utils;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApiServer.Controllers
{
    [Route("api/file/")]
    [ApiController]
    public class FileController : ControllerBase
    {
        UnitOfWork _unitOfWork;
        JwtService _jwtService;
        public FileController(UnitOfWork unitOfWork, JwtService jwtService)
        {
            this._unitOfWork = unitOfWork;
            this._jwtService = jwtService;
        }

        [Route("get-profile-image")]
        [HttpGet]
        public IActionResult GetProfileImages()
        {
            try
            {
                var jwtToken = Request.Cookies["jwt"];
                var validatedToken = _jwtService.Verify(jwtToken);

                var userId = int.Parse(validatedToken.Issuer);
                
                return Ok(JsonConverter.ConverProfileImages(userId, _unitOfWork));
            }
            catch (Exception ex)
            {
                return Unauthorized(new { message = "Вы не авторизованы" });
            }
        }

        [Route("get-strange-profile-image/{id}")]
        [HttpGet]
        public IActionResult GetStrangeProfileImages(int id)
        {
            try
            {
                var jwtToken = Request.Cookies["jwt"];
                var validatedToken = _jwtService.Verify(jwtToken);

                return Ok(JsonConverter.ConverProfileImages(id, _unitOfWork));
            }
            catch (Exception ex)
            {
                return Unauthorized(new { message = "Вы не авторизованы" });
            }
        }

        // POST api/send-file
        [Route("add-profile-image")]
        [HttpPost]
        public IActionResult AddProfileImage()
        {
            try
            {
                var file = Request.Form.Files["image"];
                if (file == null)
                    return Ok("Пользователь создан");

                var email = Request.Form["email"];
                var userId = _unitOfWork.UserRepository.GetItems().FirstOrDefault(u => u.UserEmail == email).UserId;
                FileManager.LoadProfileImage(file, email);

                UFile profileImage = new UFile
                {
                    UFileId = 0,
                    UserId = userId,
                    UFileName = file.FileName,
                    UFileType = "Profile image"
                };
                _unitOfWork.UFileRepository.AddElement(profileImage);
                _unitOfWork.SaveChanges();

                return Ok("Пользователь создан");
            }
            catch(Exception ex)
            {
                return Ok("Пользователь создан");
            }
        }
    }
}
