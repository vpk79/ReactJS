import * as request from '../lib/request';

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

