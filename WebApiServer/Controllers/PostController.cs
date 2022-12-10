using DatabaseManager.Pattern;
using Microsoft.AspNetCore.Mvc;
using Models;
using WebApiServer.Model;
using WebApiServer.Utils;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApiServer.Controllers
{
    [Route("api/post/")]
    [ApiController]
    public class PostController : ControllerBase
    {
        UnitOfWork _unitOfWork;
        JwtService _jwtService;

        public PostController(UnitOfWork unitOfWork, JwtService jwtService)
        {
            this._unitOfWork = unitOfWork;
            this._jwtService = jwtService;
        }

        [Route("get-posts")]
        [HttpGet]
        public IActionResult GetPosts()
        {
            try
            {
                var jwtToken = Request.Cookies["jwt"];
                var validatedToken = _jwtService.Verify(jwtToken);

                var userId = int.Parse(validatedToken.Issuer);

                List<Post> posts = new List<Post>(_unitOfWork.PostRepository.GetItems().Where(p => p.UserId == userId).OrderByDescending(post=>post.PostPublication));
                return Ok(posts);
            }
            catch(Exception ex)
            {
                return Unauthorized(new {message = "Вы не авторизованы"});
            }

        }

        [Route("add-post")]
        [HttpPost]
        public IActionResult AddPost([FromBody]SimplePost post)
        {
            try
            {
                var jwtToken = Request.Cookies["jwt"];
                var validatedToken = _jwtService.Verify(jwtToken);

                var userId = int.Parse(validatedToken.Issuer);

                Post addedPost = new Post
                {
                    PostId = 0,
                    PostText = post.PostText,
                    PostPublication = post.PostPublication,
                    PostLikeAmount = 0,
                    UserId = userId
                };

                _unitOfWork.PostRepository.AddElement(addedPost);
                _unitOfWork.SaveChanges();

                addedPost.User = null;
                addedPost.Comments = null;
                addedPost.UserId = 0;

                return Ok(addedPost);
            }
            catch (Exception ex)
            {
                return Unauthorized(new { message = "Вы не авторизованы" });
            }
        }
      
    }
}
