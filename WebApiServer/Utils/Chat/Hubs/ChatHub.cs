using DatabaseManager.Pattern;
using Microsoft.AspNetCore.SignalR;
using Models;

namespace WebApiServer.Utils.Chat.Hubs
{
    public class ChatHub : Hub
    {
        UnitOfWork _unitOfWork;
        JwtService _jwtService;
        private IDictionary<string, UserConnection> _connection;

        public ChatHub(UnitOfWork unitOfWork, JwtService jwtService, IDictionary<string, UserConnection> connections)
        {
            _unitOfWork = unitOfWork;
            _jwtService = jwtService;
            _connection = connections;
        }

        public void CheckAutorization()
        {

        }

        public async Task SendMessage(string messageText)
        {
            if(_connection.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                string groupName = userConnection.UserId + userConnection.CompanionId;
                var existingGroup = _unitOfWork.MessageRepository.GetItems().FirstOrDefault(m => m.MessageGroupName == groupName);
                if(existingGroup == null)
                {
                    groupName = groupName = userConnection.CompanionId + userConnection.UserId;
                }

                var message = new Message
                {
                    MessageId = 0,
                    MessageCreate = DateTime.Now,
                    MessageText = messageText,
                    MessageGroupName = groupName,
                    UserSenderId = int.Parse(userConnection.UserId),
                    UserReceiverId = int.Parse(userConnection.CompanionId)
                };

                var user = _unitOfWork.UserRepository.GetItem(int.Parse(userConnection.UserId));
                await Clients.Group(groupName)
                    .SendAsync("ReceiveMessage", message.MessageText, message.MessageCreate, user.UserLastName + " " + user.UserName);

                _unitOfWork.MessageRepository.AddElement(message);
                _unitOfWork.SaveChanges();
            }
        }

        public async Task Join(UserConnection userConnection)
        {
            _connection[Context.ConnectionId] = userConnection;

            string groupName = userConnection.CompanionId + userConnection.UserId; 

            var existingGroup = _unitOfWork.MessageRepository.GetItems().FirstOrDefault(m => m.MessageGroupName == groupName);
            if(existingGroup == null)
            {
                groupName = userConnection.UserId + userConnection.CompanionId;
            }

            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

            var user = _unitOfWork.UserRepository.GetItem(int.Parse(userConnection.UserId));
            var messageText = $"{user.UserLastName + " " + user.UserName} вошел в чат";
            var message = new Message
            {
                MessageId = 0,
                MessageCreate = DateTime.Now,
                MessageText = messageText,
                MessageGroupName = groupName,
                UserSenderId = int.Parse(userConnection.UserId),
                UserReceiverId = int.Parse(userConnection.CompanionId)
            };

            await Clients.Group(groupName).SendAsync("ReceiveMessage", message.MessageText, message.MessageCreate, user.UserLastName + " " + user.UserName);

            _unitOfWork.MessageRepository.AddElement(message);
            _unitOfWork.SaveChanges();
        }
    }
}
