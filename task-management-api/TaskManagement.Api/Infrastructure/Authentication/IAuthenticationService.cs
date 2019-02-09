namespace TaskManagement.Api.Infrastructure.Authentication
{
    public interface IAuthenticationService
    { 
        string GetToken(string userName, string password);
    }
}