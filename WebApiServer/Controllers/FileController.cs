using Microsoft.AspNetCore.Mvc;
using System.Drawing;
using System.Drawing.Imaging;
using System.Security.Cryptography;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApiServer.Controllers
{
    [Route("api/file/")]
    [ApiController]
    public class FileController : ControllerBase
    {
        // GET: api/<FileController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<FileController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/send-file
        [Route("send-file")]
        [HttpPost]
        public void Post()
        {
            var file = Request.Form.Files["image"];
            var email = Request.Form["email"];
            MD5 md5 = MD5.Create();
            var userDirectory = Convert.ToBase64String(
                                        md5.ComputeHash(
                                            Encoding.UTF8.GetBytes(email)));

            var filePath = "wwwroot/" + userDirectory + "/" + file.FileName;

            using (MemoryStream stream = new MemoryStream())
            {
                file.CopyTo(stream);

                using (Image image = Image.FromStream(stream))
                {
                    image.Save(filePath, ImageFormat.Png);
                }
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
