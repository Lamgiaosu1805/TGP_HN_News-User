const apiDev = "http://192.168.1.8:3000/api/v1"
const apiProduct = "https://tntt-api.vercel.app/api/v1"

export default Utils = {
    apiUrl: apiProduct,
    debounce: (callback, delay) => {
        let timeoutId;
    
        return (text) => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
    
            timeoutId = setTimeout(() => {
                callback(text);
            },  1000);
        };
    }
}