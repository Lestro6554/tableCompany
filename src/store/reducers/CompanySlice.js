import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    companyChecked: []
}

export const companyCheckedSlice = createSlice({
    name: 'companyChecked',
    initialState,
    reducers: {
        addCompanyChecked(state, action) {
            state.companyChecked.push(action.payload);
        },
        removeCompanyChecked(state, action) {
            state.companyChecked = state.companyChecked.filter(c => c.id !== action.payload.id)
        }
    }
})

export const companyCheckedActions = companyCheckedSlice.actions;
export const companyCheckedReducer = companyCheckedSlice.reducer;