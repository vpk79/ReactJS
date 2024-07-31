
const emailRegex = new RegExp(/[a-z0-9._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.)+(com|bg)/, 'i');
const passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_\-])[A-Za-z\d@$!%*?&_\-]{6,}$/)
const nameRegex = new RegExp(/^[A-Za-zА-Яа-я]+$/);
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


export function registerValidator(values) {
    if (values.email !== '') {
        const isValid = emailValidator(values.email);
        if (!isValid) throw new Error('Email is not valid! .com or .bg only!')
    }

    if (values.email == '' || values.password == '') throw new Error('You must fill all fields!');
    if (values.password.length <= 5) throw new Error('Password too short! Minimum 6 symbols');
    if (values.password !== values['confirm-password']) throw new Error('Passwords did not match!');

    return true;

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

export function passwordValidator(value) {
    if (!passwordRegex.test(value)) {
        error = 'Password is invalid!'
    } else {
        error = false;
    }

    validated = !!error ? false : true;
    return {
        error,
        validated
    }
}


export function validatorHandler(key, value) {
    console.log('key2 ->>', key);
    console.log('value2 ->>', value);
    if (validatedValues.hasOwnProperty(key)) {
        if (validatedValues[key].value === value && validatedValues[key].validated) {
            return {
                error: false,
                validated: true
            };
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
        default:
            break;
    }

    // const result = !test ? {
    //     error: `${key} is invalid!`,
    //     validated: false
    // } :
    //     {
    //         error: false,
    //         validated: true
    //     };

    validatedValues[key] = test;


    return test;

}