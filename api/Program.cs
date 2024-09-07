using api.Services;
using api.Services.Context;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<ExpenseItemService>();
builder.Services.AddScoped<PasswordService>();

//for our Azure server
var connectionString = builder.Configuration.GetConnectionString("ExpenseAppString");
builder.Services.AddDbContext<DataContext>(options => options.UseSqlServer(connectionString));

//Cors policy
builder.Services.AddCors(options => {
    options.AddPolicy("ExpensePolicy",
    builder => {
        builder.WithOrigins("http://localhost:5173")
        .AllowAnyHeader()
        .AllowAnyMethod();
    }
    );
});

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
app.UseCors("ExpensePolicy");
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();


