

export const setItem = (data) =>  localStorage.setItem('userData', JSON.stringify(data));

export const getIitem = (data) => localStorage.getItem(data);

export const removeItem = (data) =>  localStorage.removeItem(data);