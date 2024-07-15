

export function loginValidator(values){

    if (values.email == '' || values.password == '') throw new Error('You must fill all fields!');
    // if (values.password.length <= 5) throw new Error('Password too short!');

    const emailRegex = new RegExp(/[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/, 'i');
    const isValid = emailRegex.test(values.email);
    if (!isValid) throw new Error('Email is not valid!')

    return true;

}


export function registerValidator(values){
    console.log(values);
    if (values.email == '' || values.password == '') throw new Error('You must fill all fields!');
    // if (values.password.length <= 5) throw new Error('Password too short!');
    if (values.password !== values['confirm-password']) throw new Error('Passwords did not match!');

    const emailRegex = new RegExp(/[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/, 'i');
    const isValid = emailRegex.test(values.email);
    if (!isValid) throw new Error('Email is not valid!')

    return true;

}