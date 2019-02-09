using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace TaskManagement.Api.Infrastructure.Authentication
{
    internal class Constants
    {
        private static readonly byte[] _key;

        public static SymmetricSecurityKey SecurityKey { get; }

        static Constants()
        {
            _key = Encoding.ASCII.GetBytes("verySecretKey123456789!@#$%^&*(");
            SecurityKey = new SymmetricSecurityKey(_key);
        }
    }
}