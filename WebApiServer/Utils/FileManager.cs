using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;
using System.Security.Cryptography;
using System.Text;

namespace WebApiServer.Utils
{
    public class FileManager
    {
        public static void LoadProfileImage(IFormFile file, string email)
        {
            var filePath = "wwwroot/" + GetImagePath(email, file.Name);

            using (MemoryStream stream = new MemoryStream())
            {
                file.CopyTo(stream);
                stream.Position = 0;

                var image = Image.Load<Rgba32>(stream);
                image.SaveAsPng(filePath);
            }
        }

        public static string GetImagePath(string email, string fileName)
        {
            MD5 md5 = MD5.Create();
            var userDirectory = Convert.ToBase64String(
                                        md5.ComputeHash(
                                            Encoding.UTF8.GetBytes(email)));

             return userDirectory + "/" + fileName;
        }
    }
}
