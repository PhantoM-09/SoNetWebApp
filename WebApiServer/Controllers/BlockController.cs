using DatabaseManager.Pattern;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;
using WebApiServer.Model;
using WebApiServer.Utils;

namespace WebApiServer.Controllers
{
    [Route("api/block")]
    [ApiController]
    public class BlockController : ControllerBase
    {
        UnitOfWork _unitOfWork;
        JwtService _jwtService;
        public BlockController(UnitOfWork unitOfWork, JwtService jwtService)
        {
            this._unitOfWork = unitOfWork;
            this._jwtService = jwtService;
        }

        [Route("get-users")]
        [HttpGet]
        public IActionResult GetBlockedUsers()
        {
            try
            {
                var jwtToken = Request.Cookies["jwt"];
                var validatedToken = _jwtService.Verify(jwtToken);

                return Ok(JsonConverter.ConvertOtherUser(_unitOfWork.UserRepository.GetItems().Where(u => u.BlockId != null), _unitOfWork));
            }
            catch(Exception ex)
            {
                return Unauthorized(new { message = "Вы не авторизованы" });
            }
        }

        [Route("get-block/{id}")]
        [HttpGet]
        public IActionResult GetBlock(int id)
        {
            try
            {
                var jwtToken = Request.Cookies["jwt"];
                var validatedToken = _jwtService.Verify(jwtToken);

                var user = _unitOfWork.UserRepository.GetItem(id);
                var block = _unitOfWork.BlockRepository.GetItem(user.BlockId.Value);
                var simpleBlock = new SimpleBlock
                {
                    BlockId = block.BlockId,
                    BlockReason = block.BlockReason,
                    BlockStart = block.BlockStart,
                    BlockEnd = block.BlockEnd
                };

                return Ok(simpleBlock);
            }
            catch (Exception ex)
            {
                return Unauthorized(new { message = "Вы не авторизованы" });
            }
        }

        [Route("unblock-user/{id}")]
        [HttpDelete]
        public IActionResult UnblockUser(int id)
        {
            try
            {
                var jwtToken = Request.Cookies["jwt"];
                var validatedToken = _jwtService.Verify(jwtToken);

                var user = _unitOfWork.UserRepository.GetItem(id);

                _unitOfWork.BlockRepository.DeleteElement(user.BlockId.Value);
                _unitOfWork.SaveChanges();

                return Ok(JsonConverter.ConvertOtherUser(_unitOfWork.UserRepository.GetItems().Where(u => u.BlockId != null), _unitOfWork));
            }
            catch (Exception ex)
            {
                return Unauthorized(new { message = "Вы не авторизованы" });
            }
        }

        [Route("get-noblock-users")]
        [HttpGet]
        public IActionResult GetNoBlockedUsers()
        {
            try
            {
                var jwtToken = Request.Cookies["jwt"];
                var validatedToken = _jwtService.Verify(jwtToken);

                return Ok(JsonConverter.ConvertOtherUser(_unitOfWork.UserRepository.GetItems().Where(u => u.BlockId == null && !string.Equals(u.UserType, "Admin")), _unitOfWork));
            }
            catch (Exception ex)
            {
                return Unauthorized(new { message = "Вы не авторизованы" });
            }
        }

        [Route("add-user/{id}")]
        [HttpPost]
        public IActionResult AddUserBlock([FromBody]SimpleBlock block, int id)
        {
            try
            {
                var jwtToken = Request.Cookies["jwt"];
                var validatedToken = _jwtService.Verify(jwtToken);

                Block addedBlock = new Block
                {
                    BlockId = block.BlockId,
                    BlockReason = block.BlockReason,
                    BlockStart = block.BlockStart,
                    BlockEnd = block.BlockEnd
                };
                _unitOfWork.BlockRepository.AddElement(addedBlock);
                _unitOfWork.SaveChanges();

                var blockedUser = _unitOfWork.UserRepository.GetItem(id);
                blockedUser.BlockId = addedBlock.BlockId;
                _unitOfWork.UserRepository.UpdateElement(blockedUser);
                _unitOfWork.SaveChanges();

                return Ok(JsonConverter.ConvertOtherUser(_unitOfWork.UserRepository.GetItems().Where(u => u.BlockId == null && !string.Equals(u.UserType, "Admin")), _unitOfWork));
            }
            catch (Exception ex)
            {
                return Unauthorized(new { message = "Вы не авторизованы" });
            }
        }
    }
}
