const API_PATH='http://localhost:50363';
let headers = new Headers({
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Content-type': 'application/json; charset=UTF-8',
    'Access-Control-Allow-Origin':'*',
});

function statusChecker(response) {
    //console.log(response);
    if(response.status >= 200 && response.status < 300)
        return Promise.resolve(response);
    return Promise.reject(response);
}

function errorHandler(path, data, error) {
    // TODO 
    //  Show error message
    console.log(`Error was occure when send request via ${path} address with ${data} data, error: ${error}`);
    console.log(path, data, error);
    
    //return Promise.reject(error);
}

export function apiAuthPostFetch(path, data) {
    console.log(`starting auth fetch data from ${path}, data: `, data);
    return fetch(`${API_PATH}/${path}`, {
        method: "POST",
        headers: headers,
        mode: "cors",
        credentials: "include",
        body: JSON.stringify(data)
    })
    //.catch(errorHandler(path, data))
    .then(statusChecker)
    .then(response => response.json())
    .then(json => {
        return json;
    })
}

export function apiNonAuthPostFetch(path, data) {
    console.log(`starting auth fetch data from ${path}, data:`, data);
    return fetch(`${API_PATH}/${path}`, {
        method: "POST",
        headers: {
            Accept: 'application/json, text/javascript, */*; q=0.01',
            'Content-type': 'application/json; charset=UTF-8',
        },
        mode: "cors",
        body: JSON.stringify(data)
    })
    //.catch(errorHandler(path, data))
    .then(statusChecker)
    .then(response => response.json())
    .then(json => {
        console.log(json);
        return json;
    })
}