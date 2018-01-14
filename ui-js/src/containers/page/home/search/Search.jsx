import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import Search from '../../../../components/search/Search.jsx';
import {
    fetchSearchBooks
} from './search.actions';

class SearchContainer extends PureComponent {
    constructor(props) {
        super(props);
        
        this.search = this.search.bind(this);
    }

    search({titleValue, authorValue, categoryValue}) {

        this.props.searchBooks({
            Title: titleValue,
            Author: authorValue,
            Gener: categoryValue 
        })

    }

    render() {
        return ( 
            <Search
                clickToSearch={this.search}
                genres={this.props.BookGenre} />
        );
    };
};

const mapStateToProps = state => {
    return {
        BookGenre: state.CommonBookInfo.bookGenre
    }
}

const mapDispatchToProps = dispatch => {
    return {
        searchBooks: (data) => dispatch(fetchSearchBooks(data))
    }
}

export default SearchContainer = connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
