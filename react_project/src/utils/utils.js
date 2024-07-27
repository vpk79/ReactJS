
export function generateUID() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let uid = '';

    const length = 16;

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        uid += characters.charAt(randomIndex);
    }

    return uid;
}

export function getCurrentDate() {
    const date = new Date();

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    const formattedDate = `${day}-${month}-${year}`;
    const formattedTime = `${hours}:${formattedMinutes}`;

    return { formattedDate, formattedTime };
}
