import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    emplChecked: []
}

export const emplCheckedSlice = createSlice({
    name: 'emplChecked',
    initialState,
    reducers: {
        addEmployeeChecked(state, action) {
            state.emplChecked.push(action.payload);
        },
        removeEmployeeChecked(state, action) {
            state.emplChecked = state.emplChecked.filter(c => c.id !== action.payload.id)
        }
    }
})

export const emplCheckedActions = emplCheckedSlice.actions;
export const emplCheckedReducer = emplCheckedSlice.reducer;