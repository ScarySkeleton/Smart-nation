const API_PATH='http://localhost:50363';
let headers = new Headers({
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Content-type': 'application/json; charset=UTF-8',
    'Access-Control-Allow-Origin':'*',
});

function statusChecker(response) {
    console.log(response);
    if(response.status >= 200 && response.status < 300)
        return Promise.resolve(response);
    return Promise.reject(response);
}

function errorHandler(error) {
    // TODO 
    //  Show error message
    return Promise.reject(error);
}

export function apiAuthPostFetch(path, data) {
    console.log(`starting auth fetch data from ${path}, data: `, data);
    console.log(JSON.stringify(data));
    //return function() {
        return fetch(`${API_PATH}/${path}`, {
            method: "POST",
            headers: headers,
            mode: "cors",
            credentials: "include",
            body: JSON.stringify(data)
        })
        .then(statusChecker)
        .then(response => response.json())
        .then(json => {
            return json;
        })
        .catch(errorHandler)
    //}
}

export function apiNonAuthPostFetch(path, data) {
    console.log(`starting auth fetch data from ${path}, data:`, data);
    console.log(API_PATH, path);
    return function() {
        return fetch(`${API_PATH}/${path}`, {
            method: "POST",
            headers: {
                Accept: 'application/json, text/javascript, */*; q=0.01',
                'Content-type': 'application/json; charset=UTF-8',
            },
            mode: "cors",
            body: JSON.stringify(data)
        })
        .then(statusChecker)
        .then(response => response.json())
        .then(json => {
            return json;
        });
    }
}