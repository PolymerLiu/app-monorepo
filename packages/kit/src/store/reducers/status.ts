import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type StatusState = {
  lastActivity: number;
  isUnlock: boolean;
  boardingCompleted: boolean;
  webviewGlobalKey: number;
  authenticationType?: 'FINGERPRINT' | 'FACIAL';
};

const initialState: StatusState = {
  lastActivity: 0,
  isUnlock: false,
  boardingCompleted: false,
  webviewGlobalKey: 0,
};

export const slice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    setBoardingCompleted: (state) => {
      state.boardingCompleted = true;
    },
    setAuthenticationType(
      state,
      action: PayloadAction<'FINGERPRINT' | 'FACIAL'>,
    ) {
      state.authenticationType = action.payload;
    },
    unlock: (state) => {
      state.lastActivity = Date.now();
      state.isUnlock = true;
    },
    lock: (state) => {
      state.isUnlock = false;
    },
    refreshLastActivity: (
      state,
      action?: PayloadAction<number | undefined>,
    ) => {
      state.lastActivity = action?.payload || Date.now();
    },
    refreshWebviewGlobalKey: (state) => {
      state.webviewGlobalKey = Date.now();
    },
  },
});

export const {
  setBoardingCompleted,
  setAuthenticationType,
  lock,
  unlock,
  refreshLastActivity,
  refreshWebviewGlobalKey,
} = slice.actions;

export default slice.reducer;
