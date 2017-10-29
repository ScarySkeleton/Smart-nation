using Xunit;
using BookSender.Services;
using BookSender.Services.Interfaces;
using BookSender.Data;
using System;
using BookSender.Data.Models;
using System.Collections.Generic;

namespace XBookSender.Test
{
    public class BookServiceTest
    {
        //private static ApplicationContext applicationContext;
        //IBookService book = new BookService (applicationContext);

        private IBookService _bookService;

        public BookServiceTest(IBookService bookService)
        {
            _bookService = bookService;
        }

        [Fact]
        public void PassingTest()
        {
            var i = new List<Book>();
            Assert.Equal(i, _bookService.BooksSearch(""));
        }

        [Fact]
        public void FallingTest()
        {
            Assert.Equal(1, _bookService.BooksSearch("5tvyjb").Count);
        }
        
        
    }
}
