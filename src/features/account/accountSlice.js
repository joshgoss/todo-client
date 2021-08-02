import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSelector, createSlice } from "@reduxjs/toolkit";
import api, { FORM_CONTENT_TYPE } from "../../utils/api";
import {
  clearSession,
  getAccount,
  getAuth,
  setAccount,
  setAuth,
} from "../../utils/session";

export const fetchUsernameExists = createAsyncThunk(
  "account/fetchUsernameExists",
  async (username, thunkAPI) => {
    return await api.get(
      `/users/username-exists/${encodeURIComponent(username)}`
    );
  }
);

export const createAccount = createAsyncThunk(
  "account/create",
  async (data, thunkAPI) => {
    return await api.post(`/users/`, data);
  }
);

export const login = createAsyncThunk(
  "account/login",
  async (data, thunkAPI) => {
    const resp = await api.post(`/token/`, data, {
      "Content-Type": FORM_CONTENT_TYPE,
    });
    setAuth(resp);
    return resp;
  }
);

export const fetchMe = createAsyncThunk(
  "account/fetchMe",
  async (username, thunkAPI) => {
    const resp = await api.get(`/users/me`);
    setAccount(resp);
    return resp;
  }
);

const initialState = { auth: null, account: null };

const accountSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    loadSession: (state, action) => {
      state.auth = getAuth();
      state.account = getAccount();
    },
    wipeSession: (state) => {
      clearSession();
      state.auth = null;
      state.account = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.auth = action.payload;
    });

    builder.addCase(fetchMe.fulfilled, (state, action) => {
      state.account = action.payload;
    });
  },
});

export const { wipeSession, loadSession } = accountSlice.actions;
export default accountSlice.reducer;

const getAuthState = (state) => state.session.auth;
const getAccountState = (state) => state.session.account;

export const isAuthenticatedSelector = createSelector([getAuthState], (auth) =>
  auth && auth.access_token ? true : false
);

export const accountSelector = createSelector(
  [getAccountState],
  (account) => account
);
