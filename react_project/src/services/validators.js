
const emailRegex = new RegExp(/[a-z0-9._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.)+(com|bg)/, 'i');

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
    if(values.email !== ''){
        const isValid = emailValidator(values.email);
        if (!isValid) throw new Error('Email is not valid! .com or .bg only!')
    }

    if (values.email == '' || values.password == '') throw new Error('You must fill all fields!');
    if (values.password.length <= 5) throw new Error('Password too short! Minimum 6 symbols');
    if (values.password !== values['confirm-password']) throw new Error('Passwords did not match!');

    return true;

}