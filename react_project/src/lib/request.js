import * as localService from '../services/localStorageService'


const buildOptions = (data) => {
    const options = {};
    let token = '';

    if (data) {
        options.body = JSON.stringify(data);
        options.headers = {
            'content-type': 'application/json',
        }
    }

    const userData = localService.getItem('userData');
    if(userData){
        token = userData.accessToken;
    }

    if(token){
        options.headers = {
            ...options.headers,
            'X-Authorization': token
        }
    }

    // console.log(options);

    return options;
}

export const request = async (method, url, data) => {

    
    try {
        let response = null;
        
            response = await fetch(url, {
                method,
                ...buildOptions(data),
            });
        // console.log(response.status);

        if(response.status === 204) {
            return {};
        }

        if (response.status === 403 || response.status === 401) {
            // alert('No such user or password!');
            localService.removeItem('userData')
            return new Error('No such user or password!');
        } else if (response.status === 409){
            // alert('User already exist!');
            return new Error('User already exist!');
        } else if (response.status == 200) {
            const result = await response.json();
            return result;

        } else {
            // alert('Something went wrong')
            localService.removeItem('userData')
            return new Error('Something went wrong')
        };


    } catch (error) {
        // alert(error.message)
        return new Error(error.message);
    }
}


export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const put = request.bind(null, 'PUT');
export const remove = request.bind(null, 'DELETE');
export const patch = request.bind(null, 'PATCH');