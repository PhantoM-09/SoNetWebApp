using Microsoft.AspNetCore.Mvc;
using System.Buffers;
using System.Drawing.Imaging;
using System.Drawing;
using System.IO;
using System.Text.Json;
using Models;
using System.Text;

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
        public void Post()
        {
            var reader = Request.BodyReader;
            var stream = reader.AsStream();
            using (MemoryStream memoryStream = new MemoryStream())
            {
                stream.CopyTo(memoryStream);

                memoryStream.Position = 0;

                var bytes = memoryStream.ToArray();

                var json = Encoding.UTF8.GetString(bytes);

                User user = JsonSerializer.Deserialize<User>(json);
            }
            
            
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
