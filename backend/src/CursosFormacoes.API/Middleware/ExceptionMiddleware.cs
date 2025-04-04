using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace CursosFormacoes.API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception ex)
        {
            var response = context.Response;
            response.ContentType = "application/json";
            response.StatusCode = (int)HttpStatusCode.InternalServerError;
            
            var errorResponse = new
            {
                status = response.StatusCode,
                message = ex.Message
            };
                return response.WriteAsync(JsonSerializer.Serialize(errorResponse));
        }
    }
}
