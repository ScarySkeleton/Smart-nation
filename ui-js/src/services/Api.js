const API_PATH = '/';

export function loginRequest(userData) {
    return function () {
        console.log("api");
        return fetch("http://localhost:50364/AccountController/Login", {
            method: "POST",
            headers: {
                Accept: 
                'application/json, text/plain, */*',
                'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
            body: userData
        }).then(response => console.log(response));
        /* return {
            username: "beokha",
            name: "Danil",
            surname: "Bilokha",
            role: "admin"
        } */
    }
};
