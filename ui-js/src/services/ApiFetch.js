const API_PATH='http://localhost:50363';

function statusChecker(response) {
    if(response.status >= 200 && response.status < 300)
        return Promise.resolve(response);
    return Promise.reject(response);
}

export function apiAuthPostFetch(path, data) {
    return function() {
        return fetch(`${API_PATH}/${path}`, {
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
            return json;
        });
    }
}

export function apiNonAuthPostFetch(path, data) {
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