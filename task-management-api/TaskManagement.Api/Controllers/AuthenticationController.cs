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

        [HttpGet]
        public IActionResult Get()
        {
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

            return _authenticationService.GetToken(request.UserName, request.Password);
        }
    }
}