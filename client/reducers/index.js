import {combineReducers} from 'redux' // to combine different reducers
import partiesReducer from './partiesReducer'
import deputiesReducer from './deputiesReducer'
import projectsReducer from './projectsReducer'

const reducer = combineReducers({
  parties: partiesReducer,
  deputies: deputiesReducer,
  projects: projectsReducer
})


export default reducer
