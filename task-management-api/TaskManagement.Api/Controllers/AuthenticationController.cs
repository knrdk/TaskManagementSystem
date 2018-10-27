using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using TaskManagement.Api.Dto;
using TaskManagement.Api.Dto.Authentication;

namespace TaskManagement.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get(){
            return NoContent();
        }

        [AllowAnonymous]
        [HttpPost]
        public ActionResult<string> Post([FromBody]UserLoginRequestDto request)
        {
            if (request.UserName != "admin" || request.Password != "1234")
            {
                return Unauthorized();
            }

            return CreateToken(request);
        }

        private string CreateToken(UserLoginRequestDto userInfo)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            byte[] key = Encoding.ASCII.GetBytes("verySecretKey123456789!@#$%^&*(");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, userInfo.UserName)
                }),
                Expires = DateTime.UtcNow.AddHours(24),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
            string result = tokenHandler.WriteToken(token);
            return result;
        }
    }
}