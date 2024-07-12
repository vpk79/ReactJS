

export const setItem = (data) =>  localStorage.setItem('userData', JSON.stringify(data));

export const getItem = (data) => JSON.parse(localStorage.getItem(data));

export const removeItem = (data) =>  localStorage.removeItem(data);