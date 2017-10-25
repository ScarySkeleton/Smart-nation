const API_PATH = '/';

export function loginRequest(userData) {
    console.log("api");
    return function () {
        return {
            login: "beokha",
            name: "Danil",
            surname: "Bilokha",
            role: "admin"
        }
    }
};
