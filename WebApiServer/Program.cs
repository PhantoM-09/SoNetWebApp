using DatabaseManager;
using DatabaseManager.Pattern;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;
using WebApiServer.Utils;
using WebApiServer.Utils.Chat;
using WebApiServer.Utils.Chat.Hubs;

var builder = WebApplication.CreateBuilder(args);

var connection = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
                                                options.UseSqlServer(connection));
builder.Services.AddTransient<UnitOfWork>();
builder.Services.AddTransient<JwtService>();

builder.Services.Configure<FormOptions>(options =>
{
    options.ValueCountLimit = 10; //default 1024
    options.ValueLengthLimit = int.MaxValue; //not recommended value
    options.MultipartBodyLengthLimit = long.MaxValue; //not recommended value
});

builder.Services.AddSignalR();

builder.Services.AddCors(options =>
{
    options.AddPolicy("CORSPolicy",
        builder =>
        {
            builder
            .AllowCredentials()
            .AllowAnyMethod()
            .AllowAnyHeader()
            .WithOrigins("http://localhost:3000");

        });
});
// Add services to the container.

builder.Services.AddSingleton<IDictionary<string, UserConnection>>(options => new Dictionary<string, UserConnection>());
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CORSPolicy");

app.UseStaticFiles();
app.UseAuthorization();

app.UseRouting();
app.UseEndpoints(endpoints =>
{
    endpoints.MapHub<ChatHub>("/chat");
});

app.MapControllers();

app.Run();
