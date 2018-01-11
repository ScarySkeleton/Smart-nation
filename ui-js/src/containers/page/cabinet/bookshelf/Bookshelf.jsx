import {
    fetchingBookShelfBooks
} from './bookshelf.actions';
import defaulBookImage from '../../../../img/cabinet/book_1.svg';

import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
//import Image from 'react-image';

class Bookshelf extends PureComponent {

    // constructor(props) {
    //     super(props);

    //     this.insertBinaryImage = this.insertBinaryImage.bind(this);
    //     this.hexToBase64 = this.hexToBase64.bind(this);
    // }

    componentDidMount() {
        this.props.fetchBooks();
    }

    // insertBinaryImage(binaryImg) {
    //     //console.log(binaryImg);
    //     return 'data:image/jpeg;base64,' + this.hexToBase64(binaryImg);
    // }

    // hexToBase64(data) {
    //     //console.log(data);
    //     return btoa(String.fromCharCode.apply(null, data.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
    // }

    render() {
        console.log(this.props);
        return (
            <div className='container bookshelf-cabinet'>
                {
                    (this.props.bookShelfBooks.length)
                    ?    this.props.bookShelfBooks.map((book, index) => {
                            return (
                                <div className='container bookshelf-cabinet__book' key={index}>
                                    <Link to={`book/${book.id}`}>
                                        <div className='bookshelf-cabinet__book_title book__title'>
                                            {book.title}
                                        </div>
                                        <div className='bookshelf-cabinet__book_image book__image'>
                                        {
                                            !!book.photoInBinary
                                            ? <img src={`data:image/png;base64,${book.photoInBinary}`} alt="beastie.png" scale="0" />
                                            : <image src={defaulBookImage} />
                                        }
                                        </div>
                                    </Link>
                                    {/* <div className='bookshelf-cabinet__book_description book__description'>
                                    </div>
                                    <div className='bookshelf-cabinet__book_author book__author'>
                                    </div>
                                    <div className='bookshelf-cabinet__book_raiting book__raiting'>
                                    </div>
                                    <div className='bookshelf-cabinet__book_contributor book__user-contributor'>
                                    </div>
                                    <div className='bookshelf-cabinet__book_time-created book__time-created'>
                                    </div>
                                    <div className='bookshelf-cabinet__book_time-printed book__time-printed'>
                                    </div>
                                    <div className='bookshelf-cabinet__book_isbn book__isbn'>
                                    </div>
                                    <div className='bookshelf-cabinet__book_price book__price'>
                                    </div>
                                    <div className='bookshelf-cabinet__book_is-usable book__is-usable'>
                                    </div> */}
                                </div>
                            )
                        })
                    : (
                        <div className='container bookshelf-cabinet__no-books'>
                            You don't have any books
                        </div>
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        bookShelfBooks: state.BookShelf.bookShelfBooks
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchBooks: () => dispatch(fetchingBookShelfBooks())
    }
}

export default Bookshelf = connect(mapStateToProps, mapDispatchToProps)(Bookshelf);
