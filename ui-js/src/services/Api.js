
import {apiAuthPostFetch, apiNonAuthPostFetch} from './ApiFetch';

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
            });
    }
}

export function getBookPageData(bookId) {
    return function() {
        return apiAuthPostFetch('Home/GetBookPageData', bookId)
            .then(response => response);
    }
}

export function setBookAddComment(commentData) {
    return function() {
        return apiAuthPostFetch('Home/AddComment', commentData);
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
            });
    }
}

export function getBookGenres() {
    return function() {
        return apiNonAuthPostFetch('Home/GetAllGenres');
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
            });
    }
};

export function registrationRequest(userData) {
    return function() {
        return apiAuthPostFetch('Account/Register', userData);
    }
}

export function logoutRequest() {
    return function() {
        return apiAuthPostFetch("Account/Logout")
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
            });
    }
}

export function changeUserInfoData(userInfoData) {
    return function() {
        return apiAuthPostFetch("PersonalCabinet/EditUserInfo", userInfoData);
    }
}

export function changeUserInfoPicture(imageData) {
    return function() {
        return apiAuthPostFetch("PersonalCabinet/EditUserPicture", imageData);
    }
}

export function addBook(bookData) {
    return function() {
        return apiAuthPostFetch("PersonalCabinet/AddBook", bookData)
            .then(json => {
                console.log(json);
            })
    }
}

export function getBookShelfBooks() {
    return function() {
        return apiAuthPostFetch("PersonalCabinet/GetAllUserBooks")
            .then(data => {
                return data;
            });
    }
    
}

export function getDealData() {
    return function() {
        return apiAuthPostFetch("PersonalCabinet/GetAllMyDeals")
            .then(response => response);
    }
}

export function changeDealStatus(dealObj) {
    console.log(dealObj);
    return function() {
        const {method, ...dealData} = dealObj;
        return apiAuthPostFetch(`Order/${dealObj.method}`, dealData);
    }
}

