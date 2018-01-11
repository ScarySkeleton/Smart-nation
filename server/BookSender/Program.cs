using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Threading;
using Microsoft.EntityFrameworkCore;
using System.Timers;
using BookSender.Data;
using System.Data.SqlClient;

namespace BookSender
{
    public class Program
    {
        private static readonly DbContextOptions<ApplicationContext> ConfigurationManager;

        public static void Main(string[] args)
        {
            Task.Run(() => StartTimer());

            BuildWebHost(args).Run();
        }

        public static void StartTimer()
        {
            System.Timers.Timer myTimer = new System.Timers.Timer();
            myTimer.Elapsed += new ElapsedEventHandler(OnTimer);
            myTimer.Interval = 86400000;
            myTimer.Enabled = true;
            myTimer.AutoReset = false;
        }

        public static void OnTimer(Object source, ElapsedEventArgs e)
        {
            Console.WriteLine("DateTime: " + DateTime.Now);
            try
            {
                string connectionString = @"OurConnectionString";
                string sqlExpression = "UpdateStatuses";
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    connection.Open();
                    SqlCommand command = new SqlCommand(sqlExpression, connection);
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    var result = command.ExecuteNonQuery();

                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
            }
            // System.Timers.Timer theTimer = (System.Timers.Timer)source;
            // theTimer.Enabled = true;
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .Build();
    }
}
