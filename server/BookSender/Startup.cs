using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using BookSender.Data;
using BookSender.Services.Interfaces;
using BookSender.Services;

namespace BookSender
{
	public class Startup
	{
		public Startup(IHostingEnvironment env)
		{
			var builder = new ConfigurationBuilder()
				.SetBasePath(env.ContentRootPath)
				.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
				.AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
				.AddEnvironmentVariables(); // could add connection strings here.
											// here it is.q
			Configuration = builder.Build();

		}

		public IConfiguration Configuration { get; }

		public void ConfigureServices(IServiceCollection services)
		{

			services.AddScoped<IUserService, UserService>();
			services.AddScoped<IBookService, BookService>();
			services.AddScoped<IBookHistoryService, BookHistoryService>();
			services.AddScoped<IGenreService, GenreService>();
			services.AddScoped<IDealService, DealService>();
			services.AddScoped<IDealStatusService, DealStatusService>();
			services.AddScoped<IRatingStatusService, RatingStatusService>();
			services.AddScoped<IReviewService, ReviewService>();

			//string connection = @"Data Source=.\SQLEXPRESS;Initial Catalog=SMARTDB;Integrated Security=True";
			//string connection = @"Server=tcp:smartserv.database.windows.net,1433;Initial Catalog=SMARTDB;Persist Security Info=False;User ID=Woka;Password='{ezhm-"+"\""+",jim1'; MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
			services.AddDbContext<ApplicationContext>(options => options.UseSqlServer(Configuration.GetConnectionString("AzureConnection")));

			services.AddMvc();
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IHostingEnvironment env)
		{

			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
				app.UseBrowserLink();

				using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
				{
					serviceScope.ServiceProvider.GetService<ApplicationContext>().Initialize();
				}
			}
			else
			{
				app.UseExceptionHandler("/Home/Error");
			}

            app.UseAuthentication();

            app.UseStaticFiles();

			app.UseMvc(routes =>
			{
				routes.MapRoute(
					name: "default",
					template: "{controller=Home}/{action=Index}/{id?}");
			});
		}
	}
}
