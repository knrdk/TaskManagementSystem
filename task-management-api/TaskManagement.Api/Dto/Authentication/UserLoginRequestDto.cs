using System;

namespace TaskManagement.Api.Dto.Authentication
{
    [Serializable]
    public class UserLoginRequestDto
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}