import {addNotification, notificationType} from '../features/notifications/notificationsSlice';
import {store} from '../store';


export const apiFetch = async ({
    endpoint='',
    method='',
    data=undefined,
    params=undefined
}) => {
    const ep = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
    const url = `${process.env.REACT_APP_API_URL}${ep}`;
    const response = await fetch(url, {
        method,
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: data ? JSON.stringify(data) : undefined
    }).then((r) => (r)).catch((e) => {
        store.dispatch(addNotification({
            message: 'Something went wrong while performing a request.', 
            type: notificationType.FAILURE
        }))

        return e;
    });

    return response.json();
};


export const get =  (endpoint='', params={}) => {
    return apiFetch({
        endpoint,
        method: 'GET',
        params
    });
};


export const post = (endpoint='', data={}) => {
    return apiFetch({
        endpoint,
        method: 'POST',
        data
    });
};

const api = {
    apiFetch,
    post,
    get
}

export default api;