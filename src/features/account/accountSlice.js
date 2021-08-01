import {createAsyncThunk } from '@reduxjs/toolkit';
import api, {FORM_CONTENT_TYPE} from '../../utils/api';
import { getAccount, getAuth, setAuth } from '../../utils/session';
import { createSlice } from '@reduxjs/toolkit';

export const fetchUsernameExists = createAsyncThunk('account/fetchUsernameExists',  async (username, thunkAPI) => {    
    return await api.get(`/users/username-exists/${encodeURIComponent(username)}`);   
});


export const createAccount = createAsyncThunk('account/create',  async (data, thunkAPI) => {    
    return await api.post(`/users/`, data);   
});

export const login = createAsyncThunk('account/login',  async (data, thunkAPI) => {    
    const resp = await api.post(`/token/`, data, {'Content-Type': FORM_CONTENT_TYPE});  
    setAuth(resp);
    return resp;
});


const initialState = { auth: null, account: null }

const accountSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
      loadSession: (state, action) => {
          state.auth = getAuth();
          state.account = getAccount();
      }
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
        state.auth = action.payload;
    });
  }
});

export const {loadSession} = accountSlice.actions;
export default accountSlice.reducer;

