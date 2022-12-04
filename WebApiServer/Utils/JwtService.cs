using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace WebApiServer.Utils
{
    public class JwtService
    {
        private string secureKey = "SoNetUser";

        public string GenerateToken(int id, string role)
        {
            var symmetricalSecureKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secureKey));
            var credentials = new SigningCredentials(symmetricalSecureKey, SecurityAlgorithms.HmacSha256);

            var claim = new Claim("type", role);
            var listClaims = new List<Claim>();
            listClaims.Add(claim);

            var header = new JwtHeader(credentials);
            var payload = new JwtPayload(id.ToString(), null, listClaims, null, DateTime.Today.AddDays(1));

            var securityToken = new JwtSecurityToken(header, payload);

            return new JwtSecurityTokenHandler().WriteToken(securityToken);
        }

        public JwtSecurityToken Verify(string jwtToken)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(secureKey);
            tokenHandler.ValidateToken(jwtToken, new TokenValidationParameters
            {
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuerSigningKey = true,
                ValidateIssuer = false,
                ValidateAudience = false
            }, out SecurityToken validatedToken);

            return (JwtSecurityToken)validatedToken;
        }
    }
}
