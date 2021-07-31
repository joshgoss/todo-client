import {createAsyncThunk } from '@reduxjs/toolkit';
import {api} from '../../utils';

export const fetchUsernameExists = createAsyncThunk('account/fetchUsernameExists',  async (username, thunkAPI) => {    
    const res = await api.get(`/users/username-exists/${encodeURIComponent(username)}`);   
    return res; 
});


export const createAccount = createAsyncThunk('account/create',  async (data, thunkAPI) => {    
    const res = await api.post(`/users/`, data);   
    return res; 
});