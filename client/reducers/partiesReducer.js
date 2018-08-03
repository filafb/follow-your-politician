import axios from 'axios'

const LOAD_PARTIES = 'LOAD_PARTIES'

const initialState = {
  list: [],
  alliances: []
}

const loadedParties = (parties, alliances) => ({
  type: LOAD_PARTIES,
  parties,
  alliances
})


export const loadParties = () => {
  return async dispatch => {
    try{
      const { data } = await axios.get('/api/parties')
      const [parties, alliances] = data
      const action = loadedParties(parties, alliances)
      dispatch(action)
    } catch(err) {
      console.error(err)
    }
  }
}

const partiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PARTIES:
      return {list: action.parties, alliances: action.alliances}

    default:
      return state

  }
}

export default partiesReducer
