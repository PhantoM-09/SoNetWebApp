using DatabaseManager.Pattern;
using Models;
using System.Text.Json.Nodes;

namespace WebApiServer.Utils
{
    public class JsonConverter
    {
        public static string ConvertUser(int userId, UnitOfWork unitOfWork)
        {
            User user = unitOfWork.UserRepository.GetItem(userId);

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
            var profileImage = unitOfWork.UFileRepository.GetItems().FirstOrDefault(uf => uf.UserId == userId && string.Equals(uf.UFileType, "Profile image"));
            var profileImagePath = "standard_files/standard_profile_image.png";
            if(profileImage != null)
            {
                profileImagePath = FileManager.GetImagePath(profileImage.User.UserEmail, profileImage.UFileName);
            }

            //var profileBackground = unitOfWork.UFileRepository.GetItems().FirstOrDefault(uf => uf.UserId == userId && string.Equals(uf.UFileType, "Profile background"));

            JsonObject jsonImages = new JsonObject();
            jsonImages.Add("profileImage", profileImagePath);

            string json = jsonImages.ToJsonString();
            return json;
        }
    }
}
