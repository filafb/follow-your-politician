import {combineReducers} from 'redux' // to combine different reducers
import partiesReducer from './partiesReducer'

const reducer = combineReducers({
  parties: partiesReducer
})


export default reducer
