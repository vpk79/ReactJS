import { redirect } from 'react-router-dom';
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
        // alert(error.message);
        return new Error(error.message);
    }
}



export const register = (email, password) => {
    try {
       const result = request.post(`${baseUrl}/register`, {
            email,
            password
        });
        return result;
    } catch (error) {
        // console.log('register error', error);
        return error;
    }
}


export const logout = async () => {
     request.get(`${baseUrl}/logout`);
     localService.removeItem('userData');
     redirect('/');
}
