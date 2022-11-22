using Microsoft.AspNetCore.Mvc;
using System.Buffers;
using System.Drawing.Imaging;
using System.Drawing;
using System.IO;
using System.Text.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApiServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        // GET: api/<ValuesController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<ValuesController>
        [HttpPost]
        public string Post()
        {
            
            var file = Request.Form.Files["image"];
            var filePath = "wwwroot/" + file.FileName;

            using (MemoryStream stream = new MemoryStream())
            {
                file.CopyTo(stream);

                using (Image image = Image.FromStream(stream))
                {
                    image.Save(filePath, ImageFormat.Png);
                }
            }

            return JsonSerializer.Serialize("https://localhost:7132/" + file.FileName);


            //var file = Request.Form.Files["image"];
            //var filePath = "d:/UserFiles/" + file.FileName;

            //string base64 = "";
            //using (MemoryStream stream = new MemoryStream())
            //{
            //    file.CopyTo(stream);

            //    base64 = Convert.ToBase64String(stream.ToArray());
            //}

            //return JsonSerializer.Serialize(base64);
        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
