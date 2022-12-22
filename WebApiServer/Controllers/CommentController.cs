using DatabaseManager.Pattern;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;
using WebApiServer.Utils;

namespace WebApiServer.Controllers
{
    [Route("api/comment/")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        UnitOfWork _unitOfWork;
        JwtService _jwtService;

        public CommentController(UnitOfWork unitOfWork, JwtService jwtService)
        {
            this._unitOfWork = unitOfWork;
            this._jwtService = jwtService;
        }

        [Route("add-comment/{id}")]
        [HttpPost]
        public IActionResult AddComment(int id)
        {
            try
            {
                var jwtToken = Request.Cookies["jwt"];
                var validatedToken = _jwtService.Verify(jwtToken);
                var userId = int.Parse(validatedToken.Issuer);

                var commentText = Request.Form["text"];

                var comment = new Comment
                {
                    CommentId = 0,
                    CommentText = commentText,
                    CommentSend = DateTime.Now,
                    PostId = id,
                    UserId = userId
                };

                _unitOfWork.CommentRepository.AddElement(comment);
                _unitOfWork.SaveChanges();

                return Ok(JsonConverter.ConvertComments(_unitOfWork.CommentRepository.GetItems().Where(c => c.PostId == id), _unitOfWork));
            }
            catch(Exception ex)
            {
                return Unauthorized(new { message = "Вы не авторизованы" });
            }
        }

        [Route("get-comments/{id}")]
        [HttpGet]
        public IActionResult GetComments(int id)
        {
            try
            {
                var jwtToken = Request.Cookies["jwt"];
                var validatedToken = _jwtService.Verify(jwtToken);
                var userId = int.Parse(validatedToken.Issuer);

                return Ok(JsonConverter.ConvertComments(_unitOfWork.CommentRepository.GetItems().Where(c => c.PostId == id), _unitOfWork));
            }
            catch (Exception ex)
            {
                return Unauthorized(new { message = "Вы не авторизованы" });
            }



        }

        [Route("delete-comment/{id}")]
        [HttpPost]
        public IActionResult DeleteComment(int id)
        {
            try
            {
                var jwtToken = Request.Cookies["jwt"];
                var validatedToken = _jwtService.Verify(jwtToken);

                var postId = Request.Form["postId"];
                _unitOfWork.CommentRepository.DeleteElement(id);
                _unitOfWork.SaveChanges();

                return Ok(JsonConverter.ConvertComments(_unitOfWork.CommentRepository.GetItems().Where(c => c.PostId == int.Parse(postId)), _unitOfWork));
            }
            catch (Exception ex)
            {
                return Unauthorized(new { message = "Вы не авторизованы" });
            }



        }
    }
}
