
const buildOptions = (data) => {
    const options = {};

    if (data) {
        options.body = JSON.stringify(data);
        options.headers = {
            'content-type': 'application/json',

        }
    }
    return options;
}

export const request = async (method, url, data) => {

    try {
        const response = await fetch(url, {
            method,
            ...buildOptions(data),
        });

        console.log(response.status);

        if (response.status == 403 || response.status == 401) {
            alert('No such user or password!');
            return new Error('No such user or password!');
        }

        if (response.status == 200) {
            const result = await response.json();

            return result;
        } else {
            alert('Something went wrong')
            return new Error('Something went wrong')
        };


    } catch (error) {

        console.log('request error', error);
        return error;
    }
}


export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const put = request.bind(null, 'PUT');
export const remove = request.bind(null, 'DELETE');
export const patch = request.bind(null, 'PATCH');