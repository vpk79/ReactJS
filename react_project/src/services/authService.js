import * as request from '../lib/request';
import * as localService from './localStorageService';

const baseUrl = 'http://localhost:3030/users'

export const login = async (email, password) => {
    try {
        const result = await request.post(`${baseUrl}/login`, {
            email,
            password
        });

        return result;
    } catch (error) {
        console.log('login error', error);
        return error;
    }
}



export const register = (email, password) => {
    try {
        request.post(`${baseUrl}/register`, {
            email,
            password
        });
    } catch (error) {
        console.log('register error', error);
        return error;
    }
}


export const logout = async () => {
    const options = {};
    const userData = localService.getItem('userData');
    const token = userData.accessToken;
    options.headers = {
        'X-Authorization': { token }
    }
    console.log(options);
    const result = await fetch(`${baseUrl}/logout`, { method: 'GET', options });

    console.log(result);
}
