import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux"
import { companyCheckedActions } from "../store/reducers/CompanySlice";
import { emplCheckedActions } from "../store/reducers/EmployeeSlice";

const actions = {
    ...companyCheckedActions,
    ...emplCheckedActions
}

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(actions, dispatch);
}