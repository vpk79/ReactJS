
const emailRegex = new RegExp(/[a-z0-9._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.)+(com|bg)/, 'i');
const nameRegex = new RegExp(/^[a-zA-Z]+$/);
const validatedValues = {};

export function loginValidator(values) {
    if (values.email !== '') {
        const isValid = emailValidator(values.email);
        if (!isValid) throw new Error("Email is not valid! .com or .bg only!")
    }
    if (values.email == '' || values.password == '') throw new Error('You must fill all fields!');
    return true;

}

export function emailValidator(email) {
    const isValid = emailRegex.test(email);
    if (!isValid) return false;
    return true;
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
    return nameRegex.test(value);
}


export function validatorHandler(key, value) {
    console.log('key2 ->>', key);
    console.log('value2 ->>', value);
    if (validatedValues.hasOwnProperty(key)) {
        if (validatedValues[key].value === value && validatedValues[key].validated){
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

        default:
            break;
    }

    const result = !test ? {
        error: `${key} is invalid!`,
        validated: false
    } :
        {
            error: false,
            validated: true
        };

    validatedValues[key].validated = !test ? false : true;


    return result;

}