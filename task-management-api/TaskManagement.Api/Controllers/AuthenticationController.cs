using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskManagement.Api.Dto.Authentication;
using TaskManagement.Api.Infrastructure.Authentication;

namespace TaskManagement.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;

        public AuthenticationController(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }

        /// <summary>
        /// Returns user name
        /// </summary>
        [HttpGet]
        public ActionResult<string> Get()
        {
            return User.Identity.Name;
        }


        /// <summary>
        /// Returns user token for a given user
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /authentication
        ///     {
        ///        "UserName": "admin",
        ///        "Password": "1234"
        ///     }
        ///
        /// </remarks>
        [AllowAnonymous]
        [HttpPost]
        [ProducesResponseType(200)]
        [ProducesResponseType(401)]
        public ActionResult<string> Post([FromBody]UserLoginRequestDto request)
        {
            if (request.UserName != "admin" || request.Password != "1234")
            {
                return Unauthorized();
            }

            return _authenticationService.GetToken(request.UserName, request.Password);
        }
    }
}