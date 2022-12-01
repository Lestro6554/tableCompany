import {combineReducers, configureStore} from "@reduxjs/toolkit";
import { companyCheckedReducer } from "./reducers/CompanySlice";
import { emplCheckedReducer } from "./reducers/EmployeeSlice";
import { companyAPI } from "./services/CompanyService";
import { employeeAPI } from "./services/EmployeeService";

const rootReducer = combineReducers({
    [companyAPI.reducerPath]: companyAPI.reducer,
    [employeeAPI.reducerPath]: employeeAPI.reducer,
    companyChecked: companyCheckedReducer,
    employeeChecked: emplCheckedReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(
                companyAPI.middleware, 
                employeeAPI.middleware
            )
    })
}