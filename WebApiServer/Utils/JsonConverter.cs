using DatabaseManager.Pattern;
using Models;
using System.Text.Json.Nodes;

namespace WebApiServer.Utils
{
    public class JsonConverter
    {
        public static string ConvertUser(User user, UnitOfWork unitOfWork)
        {
            JsonObject jsonUser = new JsonObject();
            jsonUser.Add("id", user.UserId);
            jsonUser.Add("lastName", user.UserLastName);
            jsonUser.Add("name", user.UserName);
            jsonUser.Add("sex", user.UserSex);
            jsonUser.Add("birthDate", user.UserBirthDay != null ? user.UserBirthDay.Value.ToShortDateString() : null);
            jsonUser.Add("type", user.UserType);

            jsonUser.Add("friendCount", unitOfWork.FriendRepository.GetItems()
                                                    .Where(f => f.UserId == user.UserId && f.FriendRelation == 1)
                                                            .Count());
            jsonUser.Add("subscriberCount", unitOfWork.FriendRepository.GetItems()
                                                    .Where(f => f.UserId == user.UserId && f.FriendRelation == 0)
                                                            .Count());

            if(user.AddressId.HasValue)
            {
                var userAddress = unitOfWork.AddressRepository.GetItem(user.AddressId.Value);
                if (userAddress != null)
                {
                    jsonUser.Add("country", userAddress.AddressCountry);
                    jsonUser.Add("city", userAddress.AddressCity);
                }
            }
            else
            {
                jsonUser.Add("country", null);
                jsonUser.Add("city", null);
            }
            

            string json = jsonUser.ToJsonString();
            return json;
        }

        public static string ConvertStrangeUser(int userId, User strangeUser, UnitOfWork unitOfWork)
        {
            JsonObject jsonUser = new JsonObject();
            jsonUser.Add("lastName", strangeUser.UserLastName);
            jsonUser.Add("name", strangeUser.UserName);
            jsonUser.Add("sex", strangeUser.UserSex);
            jsonUser.Add("birthDate", strangeUser.UserBirthDay != null ? strangeUser.UserBirthDay.Value.ToShortDateString() : null);

            jsonUser.Add("friendCount", unitOfWork.FriendRepository.GetItems()
                                                    .Where(f => f.UserId == strangeUser.UserId && f.FriendRelation == 1)
                                                            .Count());
            jsonUser.Add("subscriberCount", unitOfWork.FriendRepository.GetItems()
                                                    .Where(f => f.UserId == strangeUser.UserId && f.FriendRelation == 0)
                                                            .Count());

            if (strangeUser.AddressId.HasValue)
            {
                var userAddress = unitOfWork.AddressRepository.GetItem(strangeUser.AddressId.Value);
                if (userAddress != null)
                {
                    jsonUser.Add("country", userAddress.AddressCountry);
                    jsonUser.Add("city", userAddress.AddressCity);
                }
            }
            else
            {
                jsonUser.Add("country", null);
                jsonUser.Add("city", null);
            }


            var relation = unitOfWork.FriendRepository.GetItem(userId, strangeUser.UserId);
            if (relation == null)
                jsonUser.Add("type", "other");
            else
            {
                if (relation.FriendRelation == 1)
                    jsonUser.Add("type", "friend");
                else
                    jsonUser.Add("type", "subscriber");
            }

            string json = jsonUser.ToJsonString();
            return json;
        }

        public static string ConverProfileImages(int userId, UnitOfWork unitOfWork)
        {
            var user = unitOfWork.UserRepository.GetItem(userId);

            var profileImage = unitOfWork.UFileRepository.GetItems().FirstOrDefault(uf => uf.UserId == userId && string.Equals(uf.UFileType, "Profile image"));
            var profileImagePath = "standard_files/standard_profile_image.png";
            if(profileImage != null)
            {
                profileImagePath = FileManager.GetImagePath(user.UserEmail, profileImage.UFileName);
            }

            var profileBackground = unitOfWork.UFileRepository.GetItems().FirstOrDefault(uf => uf.UserId == userId && string.Equals(uf.UFileType, "Profile background"));
            var profileBackgroundPath = "standard_files/standard_profile_background.png";
            if (profileBackground != null)
            {
                profileBackgroundPath = FileManager.GetImagePath(user.UserEmail, profileBackground.UFileName);
            }

            JsonObject jsonImages = new JsonObject();
            jsonImages.Add("profileImage", profileImagePath);
            jsonImages.Add("profileBackground", profileBackgroundPath);

            string json = jsonImages.ToJsonString();
            return json;
        }
        public static string ConvertOtherUser(IEnumerable<User> users, UnitOfWork unitOfWork)
        {
            JsonArray jsonUsers = new JsonArray();
            foreach(var item in users)
            {
                JsonObject jsonUser = new JsonObject();
                jsonUser.Add("userId", item.UserId);
                jsonUser.Add("userLastName", item.UserLastName);
                jsonUser.Add("userName", item.UserName);

                var progileImage = unitOfWork.UFileRepository.GetItems().FirstOrDefault(uf => uf.UserId == item.UserId && string.Equals(uf.UFileType, "Profile image"));
                var profileImagePath = "standard_files/standard_profile_image.png";
                if(progileImage != null)
                    profileImagePath = FileManager.GetImagePath(item.UserEmail, progileImage.UFileName);

                jsonUser.Add("userProfileImage", profileImagePath);

                jsonUsers.Add(jsonUser);
            }

            string json = jsonUsers.ToJsonString();
            return json;
        }

        public static string ConvertMessages(IEnumerable<Message> messages, UnitOfWork unitOfWork)
        {
            JsonArray jsonMessages = new JsonArray();
            foreach (var item in messages)
            {
                JsonObject jsonMessage = new JsonObject();
                jsonMessage.Add("messageText", item.MessageText);
                jsonMessage.Add("messageSend", item.MessageCreate);

                var user = unitOfWork.UserRepository.GetItem(item.UserSenderId.Value);
                jsonMessage.Add("messageSender", user.UserLastName + " " + user.UserName);

                jsonMessages.Add(jsonMessage);
            }

            string json = jsonMessages.ToJsonString();
            return json;
        }

        public static string ConvertComments(IEnumerable<Comment> commnets, UnitOfWork unitOfWork)
        {
            JsonArray jsonComments = new JsonArray();
            foreach (var item in commnets)
            {
                JsonObject jsonComment = new JsonObject();
                jsonComment.Add("commentId", item.CommentId);
                jsonComment.Add("commentSend", item.CommentSend);
                jsonComment.Add("commentText", item.CommentText);

                var user = unitOfWork.UserRepository.GetItem(item.UserId.Value);
                jsonComment.Add("userLastName", user.UserLastName);
                jsonComment.Add("userName", user.UserName);
                jsonComment.Add("userId", user.UserId);

                var profileImage = unitOfWork.UFileRepository.GetItems().FirstOrDefault(uf => uf.UserId == user.UserId && string.Equals(uf.UFileType, "Profile image"));
                var profileImagePath = "standard_files/standard_profile_image.png";
                if (profileImage != null)
                {
                    profileImagePath = FileManager.GetImagePath(user.UserEmail, profileImage.UFileName);
                }

                jsonComment.Add("userProfileImage", profileImagePath);

                jsonComments.Add(jsonComment);
            }

            string json = jsonComments.ToJsonString();
            return json;
        }
    }
}
