

const ACCOUNT_KEY = 'account';
const AUTH_KEY = 'auth';

export const setAccount = (account) => {
    return localStorage.setItem(ACCOUNT_KEY, JSON.stringify(account));
}

export const getAccount = () => {
    const json = localStorage.getItem(ACCOUNT_KEY);
    return json ? JSON.parse(json) : undefined;
}

export const setAuth = (data) => {
    console.log('data is: ', data);
    return localStorage.setItem(AUTH_KEY, JSON.stringify(data));
};

export const getAuth = () => {
    const json = localStorage.getItem(AUTH_KEY);
    return json ? JSON.parse(json) : undefined;
};