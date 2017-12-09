const API_PATH = '/';

function statusChecker(response) {
    if(response.status >= 200 && response.status < 300)
        return Promise.resolve(response);
    return Promise.reject(response);
}

/*
    ================================================================
                    USER LOGIN\LOGOUT\REGESTRATION
    ================================================================
*/
export function loginRequest(userData) {
    return function () {
        return fetch("http://localhost:50363/Account/Login", {
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
        }});
    }
};

export function registrationRequest(userData) {
    return function() {
        return fetch("http://localhost:50363/Account/Register", {
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
        return fetch("http://localhost:50363/Account/Logout", {
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
export function getCabinetData(data) {
    return function() {
        return {
            userId: 1,
            photo: null,
            description: 'My name is user and I like to read',
        }
    }
}

export function addBook(data) {
    return function() {
        return fetch("http://localhost:50363/PersonalCabinet/AddBook", {
            method: "POST",
            headers: {
                Accept: 'application/json, text/javascript, */*; q=0.01',
                'Content-type': 'application/json; charset=UTF-8',
            },
            mode: "cors",
            credentials: "include",
            body: JSON.stringify(data)
        })
        .then(statusChecker)
        .then(response => response.json())
        .then(json => {
            console.log(json);
        })
    }
}

export function getBookShelfBooks() {
    return function() {
        return fetch("http://localhost:50363/PersonalCabinet/GetBook", {
            method: "POST",
            headers: {
                Accept: 'application/json, text/javascript, */*; q=0.01',
                'Content-type': 'application/json; charset=UTF-8',
            },
            mode: "cors",
            credentials: "include"
        })
        .then(statusChecker)
        .then(response => response.json())
        .then(json => {
            console.log(json);
            return json;
        })
    }
}
