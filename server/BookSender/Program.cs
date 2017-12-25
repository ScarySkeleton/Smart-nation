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

namespace BookSender
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Task.Run(() => StartTimer());

            BuildWebHost(args).Run();
        }

        public static void StartTimer()
        {
            System.Timers.Timer myTimer = new System.Timers.Timer();
            myTimer.Elapsed += new ElapsedEventHandler(OnTimer);
            myTimer.Interval = 60000;
            myTimer.Enabled = true;
            myTimer.AutoReset = false;
        }

        public static void OnTimer(Object source, ElapsedEventArgs e)
        {
            Console.WriteLine("DateTime: " + DateTime.Now);
            try
            {
                ApplicationContext applicationContext;

            }
            catch
            {
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
