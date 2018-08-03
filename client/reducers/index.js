import {combineReducers} from 'redux' // to combine different reducers
import partiesReducer from './partiesReducer'
import deputiesReducer from './deputiesReducer'

const reducer = combineReducers({
  parties: partiesReducer,
  deputies: deputiesReducer
})


export default reducer
