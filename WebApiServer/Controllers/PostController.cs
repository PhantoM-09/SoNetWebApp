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

        [Route("delete-post/{id}")]
        [HttpDelete]
        public IActionResult DeletePost(int id)
        {
            try
            {
                var jwtToken = Request.Cookies["jwt"];
                var validatedToken = _jwtService.Verify(jwtToken);
                var userId = int.Parse(validatedToken.Issuer);

                _unitOfWork.PostRepository.DeleteElement(id);
                _unitOfWork.SaveChanges();

                List<Post> posts = new List<Post>(_unitOfWork.PostRepository.GetItems().Where(p => p.UserId == userId).OrderByDescending(post => post.PostPublication));
                return Ok(posts);
            }
            catch(Exception ex)
            {
                return Unauthorized(new { message = "Вы не авторизованы" });
            }
        }

        [Route("update-post/{id}")]
        [HttpPut]
        public IActionResult UpdatePost(int id, [FromBody]SimplePost newPost)
        {
            try
            {
                var jwtToken = Request.Cookies["jwt"];
                var validatedToken = _jwtService.Verify(jwtToken);
                var userId = int.Parse(validatedToken.Issuer);

                var updatedPost = _unitOfWork.PostRepository.GetItem(id);
                updatedPost.PostText = newPost.PostText;

                _unitOfWork.PostRepository.UpdateElement(updatedPost);
                _unitOfWork.SaveChanges();

                List<Post> posts = new List<Post>(_unitOfWork.PostRepository.GetItems().Where(p => p.UserId == userId).OrderByDescending(post => post.PostPublication));
                return Ok(posts);
            }
            catch (Exception ex)
            {
                return Unauthorized(new { message = "Вы не авторизованы" });
            }
        }

        [Route("change-like/{id}")]
        [HttpPut]
        public IActionResult ChangeLike(int id)
        {
            try
            {
                var jwtToken = Request.Cookies["jwt"];
                var validatedToken = _jwtService.Verify(jwtToken);
                var userId = int.Parse(validatedToken.Issuer);

                var like = _unitOfWork.LikeRepository.GetItem(id, userId);

                if(like != null)
                {
                    _unitOfWork.LikeRepository.DeleteElement(like.PostId, like.UserId);
                    _unitOfWork.SaveChanges();
                }
                else
                {
                    _unitOfWork.LikeRepository.AddElement(new Like { PostId = id,
                                                                     UserId = userId });
                    _unitOfWork.SaveChanges();
                }

                return Ok(_unitOfWork.LikeRepository.GetItems().Where(l=>l.PostId == id).Count());
            }
            catch (Exception ex)
            {
                return Unauthorized(new { message = "Вы не авторизованы" });
            }
        }

        [Route("get-like-count/{id}")]
        [HttpGet]
        public IActionResult GetLikeCount(int id)
        {
            try
            {
                var jwtToken = Request.Cookies["jwt"];
                var validatedToken = _jwtService.Verify(jwtToken);
                var userId = int.Parse(validatedToken.Issuer);

                return Ok(_unitOfWork.LikeRepository.GetItems().Where(l => l.PostId == id).Count());
            }
            catch (Exception ex)
            {
                return Unauthorized(new { message = "Вы не авторизованы" });
            }
        }

        [Route("get-liked/{id}")]
        [HttpGet]
        public IActionResult CheckLike(int id)
        {
            try
            {
                var jwtToken = Request.Cookies["jwt"];
                var validatedToken = _jwtService.Verify(jwtToken);
                var userId = int.Parse(validatedToken.Issuer);

                var like = _unitOfWork.LikeRepository.GetItem(id, userId);

                if (like == null)
                    return Ok("not liked");
                else
                    return Ok("liked");
            }
            catch (Exception ex)
            {
                return Unauthorized(new { message = "Вы не авторизованы" });
            }
        }
    }
}
