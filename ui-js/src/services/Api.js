
import {apiAuthPostFetch, apiNonAuthPostFetch} from './ApiFetch';

const API_PATH='http://localhost:50363';

function statusChecker(response) {
    if(response.status >= 200 && response.status < 300)
        return Promise.resolve(response);
    return Promise.reject(response);
}

/*
    ================================================
                    MAIN BOOK SEARCH
    ================================================
*/
export function searchBooks(searchData) {
    return function() {
        return fetch(`${API_PATH}/Home/GetAllSearchedBooks`, {
            method: "POST",
            headers: {
                Accept: 'application/json, text/javascript, */*; q=0.01',
                'Content-type': 'application/json; charset=UTF-8',
            },
            mode: "cors",
            credentials: "include",
            body: JSON.stringify(searchData)
        })
        .then(statusChecker)
        .then(response => response.json())
        .then(json => {
            return {
                searchedBooks: json
            };
        });
    }
}

export function getBookPageData(bookId) {
    return apiNonAuthPostFetch('/Home/GetBookPageData,', bookId);
}

export function setBookAddComment(commentData) {
    return apiNonAuthPostFetch('/Home/SetBookComment,', commentData);
}

/*
    =================================================================
                            BOOK REQUEST
    =================================================================
*/
export function getOrderBookData(bookId) {
    return function() {
        return fetch(`${API_PATH}/Order/Order`, {
            method: "POST",
            headers: {
                Accept: 'application/json, text/javascript, */*; q=0.01',
                'Content-type': 'application/json; charset=UTF-8',
            },
            mode: "cors",
            body: JSON.stringify(bookId)
        })
        .then(statusChecker)
        .then(response => response.json())
        .then(json => {
            return json;
        });
    }
}

/*
    ================================================================
                    USER LOGIN\LOGOUT\REGESTRATION
    ================================================================
*/
export function loginRequest(userData) {
    return function () {
        return fetch(`${API_PATH}/Account/Login`, {
            method: "POST",
            headers: {
                Accept: 'application/json, text/javascript, */*; q=0.01',
                'Content-type': 'application/json; charset=UTF-8',
            },
            mode: "cors",
            credentials: "include",
            body: JSON.stringify(userData)
        })
        .then(statusChecker)
        .then(response => response.json())
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
        return fetch(`${API_PATH}/Account/Register`, {
            method: "POST",
            headers: {
                Accept: 'application/json, text/javascript, */*; q=0.01',
                'Content-type': 'application/json; charset=UTF-8',
            },
            mode: "cors",
            credentials: "include",
            body: JSON.stringify(userData)
        })
        .then(statusChecker);
    }
}

export function logoutRequest() {
    return function() {
        return fetch(`${API_PATH}/Account/Logout`, {
            method: "POST", 
            headers: {
                Accept: 'application/json, text/javascript, */*; q=0.01',
                'Content-type': 'application/json; charset=UTF-8',
            },
            mode: "cors",
            credentials: "include",
        });
    }
}

/*
    ================================================
                    USER CABINET
    ================================================
*/
export function getCabinetData() {
    console.log("Get user info")
    return function() {
        return apiAuthPostFetch("PersonalCabinet/GetUserInfo")
            .then(data => {
                return data;
            });
    }
}

export function addBook(bookData) {
    // return apiAuthPostFetch("PersonalCabinet/AddBook", bookData)
    //     .then(json => {
    //         console.log(json);
    //     })
    console.log(bookData);
    return function() {
        return fetch(`${API_PATH}/PersonalCabinet/AddBook`, {
            method: "POST",
            headers: {
                Accept: 'application/json, text/javascript, */*; q=0.01',
                'Content-type': 'application/json; charset=UTF-8',
            },
            mode: "cors",
            credentials: "include",
            body: JSON.stringify(bookData)
        })
        .then(statusChecker)
        .then(response => response.json())
        .then(json => {
            // Doing something after adding book
            console.log(json);
        })
    }
}

export function getBookShelfBooks() {
    console.log("get Book Shelf Books");
    return function() {
        return apiAuthPostFetch("PersonalCabinet/GetAllUserBooks")
            .then(data => {
                return data;
            });
    }
    
}
