import { showInfoToast } from "../Toasts/toastsMsg";

const emailRegex = new RegExp(/[a-z0-9._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.)+(com|bg)/, 'i');
const passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_\-])[A-Za-z\d@$!%*?&_\-]{6,}$/)
const nameRegex = new RegExp(/^[A-Za-zА-Яа-я]+$/);
const birthDayRegex = new RegExp(/^(?:0[1-9]|[12]\d|3[01])([\/.-])(?:0[1-9]|1[012])\1(?:19|20)\d\d$/);
const validatedValues = {};
let error = false;
let validated = false;

export function loginValidator(values) {
    if (values.email !== '') {
        const isValid = emailValidator(values.email);
        if (!isValid) throw new Error("Email is not valid! .com or .bg only!")
    }
    if (values.email == '' || values.password == '') throw new Error('You must fill all fields!');
    return true;

}

export function registerValidator(values) {
    let result = true;
    for (let item of Object.keys(values)) {

        // console.log(validatedValues[item]);
        // console.log(validatedValues[item].value === values[item]);
        // console.log(validatedValues[item].validated);
        if (item === 'RepeatPassword') {
            if (values[item] === values.Password) {
                console.log(`${item} ---> passed`);
                continue;
            } else {
                result = false;
                throw showInfoToast(`${item} is not valid`, { toastId: 'validation' });
            }
        }
        if (validatedValues[item] && validatedValues[item].value === values[item] && validatedValues[item].validated && result === true) {
            // console.log(`${item} ---> passed`);
            continue;
        } else {
            result = false;
            throw showInfoToast(`${item} is not valid`, { toastId: 'validation' });
        }
    }
    // console.log(result);
    return result;

}


export function emailValidator(value) {
    if (!emailRegex.test(value)) {
        error = 'Email is invalid!'
    } else {
        error = false;
    }
    validated = !!error ? false : true;
    return {
        error,
        validated
    }
}


export function nameValidator(value) {

    if (!nameRegex.test(value)) {
        error = 'Only characters allowed.'
    } else if (value.length < 2) {
        error = 'Between (2-50) characters.'
    } else {
        error = false;
    }

    validated = !!error ? false : true;
    return {
        error,
        validated
    }
}

export function phoneValidator(value) {

    if (!/^\d{8,15}$/.test(value)) {
        error = 'Phone is invalid!'
    } else {
        error = false;
    }

    validated = !!error ? false : true;
    return {
        error,
        validated
    }
}
export function cityValidator(value) {

    if (!/^[A-Za-zА-Яа-я\s]{2,50}$/.test(value)) {
        error = 'City is invalid!'
    }
    else {
        error = false;
    }
    validated = !!error ? false : true;
    return {
        error,
        validated
    }
}

export function DateValidator(value) {

    let [day, month, year] = value.split('/');
    // console.log(day, month, year);
    if (Number(day) < 1 || Number(day) > 31) {
        error = "Day is invalid(1-31)"
    } else if (Number(month) < 1 || Number(month) > 12) {
        error = "Month (1-12)"
    } else if (Number(year) < 1900) {
        error = "Year after 1900!"
    } else if (!birthDayRegex.test(value)) {
        error = 'Date is invalid!'
    } else {
        error = false;
    }
    validated = !!error ? false : true;
    return {
        error,
        validated
    }
}

export function passwordValidator(value) {

    if (!/[A-Z]/.test(value)) {
        error = 'At least 1 capital letter'
    } else if (!/[a-z]/.test(value)) {
        error = 'At least 1 small letter'
    } else if (!/\d/.test(value)) {
        error = 'At least 1 digit'
    } else if (!/[@$!%*?&_\-]/.test(value)) {
        error = 'At least 1 special symbol'
    } else {
        error = false;
    }
    validated = !!error ? false : true;
    return {
        error,
        validated
    }
}

export function genderValidation(value) {
    if (value === 'Male' || value === 'Female' || value === 'Other') {
        error = false;
    } else {
        error = 'Invalid gender';
    }
    validated = !!error ? false : true;
    return {
        error,
        validated
    }
}


export function validatorHandler(key, value) {
    // console.log('key2 ->>', key);
    // console.log('value2 ->>', value);
    if (validatedValues.hasOwnProperty(key)) {
        if (validatedValues[key].value === value && validatedValues[key].validated) {
            // console.log('already validated');
            return {
                error: false,
                validated: true
            };
        } else {
            // console.log('not validated');
        }
    }

    validatedValues[key] = {
        validated: false,
        value
    };

    let test = false;

    switch (key) {
        case 'Name': test = nameValidator(value); break;
        case 'LastName': test = nameValidator(value); break;
        case 'Email': test = emailValidator(value); break
        case 'Password': test = passwordValidator(value); break;
        case 'Phone': test = phoneValidator(value); break;
        case 'City': test = cityValidator(value); break;
        case 'Date': test = DateValidator(value); break;
        case 'Gender': test = genderValidation(value); break;
        default:
            break;
    }
    validatedValues[key] = test;
    validatedValues[key].value = value;
    return test;
}