using Microsoft.AspNetCore.Mvc;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;
using System.Collections;
using System.Security.Cryptography;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApiServer.Controllers
{
    [Route("api/file/")]
    [ApiController]
    public class FileController : ControllerBase
    {
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
                MD5 md5 = MD5.Create();
                var userDirectory = Convert.ToBase64String(
                                            md5.ComputeHash(
                                                Encoding.UTF8.GetBytes(email)));

                var filePath = "wwwroot/" + userDirectory + "/" + file.FileName;

                using (MemoryStream stream = new MemoryStream())
                {
                    file.CopyTo(stream);
                    stream.Position = 0;

                    var image = Image.Load<Rgba32>(stream);
                    image.SaveAsPng(filePath);
                }

                return Ok("Пользователь создан");
            }
            catch(Exception ex)
            {
                return Ok("Пользователь создан");
            }
        }

        // PUT api/<FileController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<FileController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
