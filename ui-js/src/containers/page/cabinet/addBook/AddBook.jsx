import React from 'react';

import BookForm from './addBookForm/AddBookForm';

const AddBook = () => {
    
    return (
        <div className='container add-book'>
         <h1>Add book popup</h1>

            <BookForm />
        </div>
    )
}

export default AddBook; 
