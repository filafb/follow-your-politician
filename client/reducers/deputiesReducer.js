import axios from 'axios'
import { fetchDeputies } from './helperFunctions'

const LOAD_DEPUTIES = 'LOAD_DEPUTIES'

const initialState = {
  list: []
}

const loadedDeputies = deputies => ({
  type: LOAD_DEPUTIES,
  deputies
})

export const loadDeputies = (parties) => {
  return async dispatch => {
    try{
      const api = fetchDeputies(parties)
      const { data } = await axios.get(api)
      dispatch(loadedDeputies(data.dados))
    } catch(err){
      console.error(err)
    }
  }
}

const deputiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_DEPUTIES:
      return {list: action.deputies}

    default:
      return state
  }
}

export default deputiesReducer
