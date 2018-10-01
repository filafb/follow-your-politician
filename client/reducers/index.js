import {combineReducers} from 'redux' // to combine different reducers
import partiesReducer from './partiesReducer'
import deputiesReducer from './deputiesReducer'
import projectsReducer from './projectsReducer'
import candidatesReducer from './candidatesReducer'

const reducer = combineReducers({
  parties: partiesReducer,
  deputies: deputiesReducer,
  projects: projectsReducer,
  candidates: candidatesReducer
})


export default reducer
