import { useState } from "react";
import * as localService from '../services/localStorageService'

export default function usePersistedState(defaultValue){
    const [state, setState] = useState(()=> {
        const persistedState = localService.getItem('userData');

        if(persistedState){
            return persistedState;
        }

        return defaultValue;
    });

    const setPersistedState = (value) => {
        setState(value);
        localService.setItem(value)
    }

    return [
        state, 
        setPersistedState
    ];
}