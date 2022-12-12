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

            var userAddress = unitOfWork.AddressRepository.GetItem(user.UserId);
            if(userAddress != null)
            {
                jsonUser.Add("country", userAddress.AddressCountry);
                jsonUser.Add("city", userAddress.AddressCity);
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
        public static string ConvertOtherUser(int userId, UnitOfWork unitOfWork)
        {
            var users = unitOfWork.UserRepository.GetItems().Where(u => u.UserId != userId);

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
    }
}
