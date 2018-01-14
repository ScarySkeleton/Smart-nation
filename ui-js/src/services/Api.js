
import {apiAuthPostFetch, apiNonAuthPostFetch} from './ApiFetch';
import {fetchingError} from './ApiUserInfo';

/*
    ================================================
                    MAIN BOOK SEARCH
    ================================================
*/
export function searchBooks(searchData) {
    return function() {
        return apiNonAuthPostFetch('Home/GetAllSearchedBooks', searchData)
            .then(json => {
                return {
                    searchedBooks: json
                };
            })
            .catch(error => {
                fetchingError(error);
            })
    }
}

export function getBookPageData(bookId) {
    return function() {
        return apiAuthPostFetch('Home/GetBookPageData', bookId)
            .then(response => response)
            .catch(error => {
                fetchingError(error);
            })
    }
}

export function setBookAddComment(commentData) {
    return function() {
        return apiAuthPostFetch('Home/AddComment', commentData)
        .catch(error => {
            fetchingError(error);
        })
    }
}

/*
    =================================================================
                                BOOK
    =================================================================
*/
export function orderBook(bookId) {
    return function() {
        return apiAuthPostFetch('Order/Order', bookId)
            .then(json => {
                return json;
            })
            .catch(error => {
                fetchingError(error);
            })
    }
}

export function getBookGenres() {
    return function() {
        return apiNonAuthPostFetch('Home/GetAllGenres')
            .then(response => response)
            .catch(error => {
                fetchingError(error);
            })
    }
}

/*
    ================================================================
                    USER LOGIN\LOGOUT\REGESTRATION
    ================================================================
*/
export function loginRequest(userData) {
    return function () {
        return apiAuthPostFetch('Account/Login', userData)
            .then(json => {
                return {
                    username: json.login
                    , name: json.name
                    , surname: json.surname
                    , role: json.role
                }
            })
            .catch(error => {
                fetchingError(error);
            })
    }
};

export function registrationRequest(userData) {
    return function() {
        return apiAuthPostFetch('Account/Register', userData)
            .catch(error => {
                fetchingError(error);
            })
    }
}

export function logoutRequest() {
    return function() {
        return apiAuthPostFetch("Account/Logout")
            .catch(error => {
                fetchingError(error);
            })
    }
}

export function loginWithFacebookRequest(userData) {
    console.log(userData);
    return function() {
        return apiNonAuthPostFetch("Account/LoginWithFacebook", userData)
            .catch(error => {
                fetchingError(error);
            })
    }
}

/*
    ================================================
                    USER CABINET
    ================================================
*/
export function getCabinetData() {
    return function() {
        return apiAuthPostFetch("PersonalCabinet/GetUserInfo")
            .then(data => {
                return data;
            })
            .catch(error => {
                fetchingError(error);
            })
    }
}

export function changeUserInfoData(userInfoData) {
    return function() {
        return apiAuthPostFetch("PersonalCabinet/EditUserInfo", userInfoData)
            .catch(error => {
                fetchingError(error);
            })
    }
}

export function changeUserInfoPicture(imageData) {
    return function() {
        return apiAuthPostFetch("PersonalCabinet/EditUserPicture", imageData)
            .catch(error => {
                fetchingError(error);
            })
    }
}

export function addBook(bookData) {
    return function() {
        return apiAuthPostFetch("PersonalCabinet/AddBook", bookData)
            .catch(error => {
                fetchingError(error);
            })
    }
}

export function getBookShelfBooks() {
    return function() {
        return apiAuthPostFetch("PersonalCabinet/GetAllUserBooks")
            .then(data =>data)
            .catch(error => {
                fetchingError(error);
            })
    }
    
}

export function getDealData() {
    return function() {
        return apiAuthPostFetch("PersonalCabinet/GetAllMyDeals")
            .then(response => response)
            .catch(error => {
                fetchingError(error);
            })
    }
}

export function changeDealStatus(dealObj) {
    return function() {
        const {method, dealData} = dealObj;
        return apiAuthPostFetch(`Order/${method}`, dealData)
            .catch(error => {
                fetchingError(error);
            })
    }
}

