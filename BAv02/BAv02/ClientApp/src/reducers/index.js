import { combineReducers } from 'redux'
import driversReducer from "./driversReducer"
import dmvReducer from "./dmvReducer"

export default combineReducers({
    drivers: driversReducer,
    dmv: dmvReducer
})