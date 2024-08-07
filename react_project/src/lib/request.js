import { redirect } from 'react-router-dom';
import * as localService from '../services/localStorageService'
import { delay } from '../utils/utils';


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
    if (userData) {
        token = userData.accessToken;
    }

    if (token) {
        options.headers = {
            ...options.headers,
            'X-Authorization': token
        }
    }

    // console.log(options);

    return options;
}

export const request = async (method, url, data) => {
    let response = null;

    try {
        response = await fetch(url, {
            method,
            ...buildOptions(data),
        });
        // console.log(response.status);

        if (response.status === 204) {
            return {};
        }

        if (response.status === 403 || response.status === 401) {
            let text = await response.text()
            text = JSON.parse(text);
            // console.log(text.message);
            // throw new Error('No such user or password!');
            throw new Error(text.message);
        } else if (response.status === 409) {
            // alert('User already exist!');
            throw new Error('User already exist!');
        } else if (response.status == 200) {
            const result = await response.json();
            return result;

        } else if (response.status == 404) {
            throw new Error('Not found');

        } else {
            // alert('Something went wrong')
            // localService.removeItem('userData')
            throw new Error('Something went wrong')
        };


    } catch (error) {
        // alert(error.message)
        // console.log(error);
        if (error.message === 'Invalid access token') {
            localService.removeItem('userData');
            redirect('/');
        }
        // console.log(error.message);
        throw new Error(error.message);
    }

}


export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const put = request.bind(null, 'PUT');
export const remove = request.bind(null, 'DELETE');
export const patch = request.bind(null, 'PATCH');