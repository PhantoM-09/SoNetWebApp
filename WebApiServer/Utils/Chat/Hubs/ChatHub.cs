using DatabaseManager.Pattern;
using Microsoft.AspNetCore.SignalR;
using Models;

namespace WebApiServer.Utils.Chat.Hubs
{
    public class ChatHub : Hub
    {
        private string bot;
        UnitOfWork _unitOfWork;
        JwtService _jwtService;

        public ChatHub(UnitOfWork unitOfWork, JwtService jwtService)
        {
            bot = "MyChatBot";

            _unitOfWork = unitOfWork;
            _jwtService = jwtService;
        }

        public void CheckAutorization()
        {

        }

        public async Task Join(UserConnection userConnection)
        {
            string groupName = userConnection.UserId + userConnection.CompanionId;

            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

            var user = _unitOfWork.UserRepository.GetItem(int.Parse(userConnection.UserId));
            var messageText = $"{user.UserLastName + " " + user.UserName} вошел в чат";
            var message = new Message
            {
                MessageId = 0,
                MessageCreate = new DateTime(),
                MessageText = messageText,
                MessageGroupName = groupName,
                UserSenderId = int.Parse(userConnection.UserId),
                UserReceiverId = int.Parse(userConnection.CompanionId)
            };

            await Clients.Group(groupName).SendAsync("ReceiveMessage", message.MessageText, message.MessageCreate);

            _unitOfWork.MessageRepository.AddElement(message);
            _unitOfWork.SaveChanges();
        }
    }
}
