import axios from 'axios'

const LOAD_PARTIES = 'LOAD_PARTIES'
const DEFINE_ALLIANCES = 'DEFINE_ALLIANCES'

const initialState = {
  list: [],
  alliance: {}

}

export const loadedParties = (parties) => ({
  type: LOAD_PARTIES,
  parties,

})

export const getAlliances = (allianceName, list) =>({
  type: DEFINE_ALLIANCES,
  alliance: {
    allianceName,
    list
  }
})

// export const loadParties = () => {
//   return async dispatch => {
//     try{
//       const { data } = await axios.get('/api/parties')
//       const [parties, alliances] = data
//       const action = loadedParties(parties, alliances)
//       dispatch(action)
//     } catch(err) {
//       console.error(err)
//     }
//   }
// }

const partiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PARTIES:
      return {...state, ...{list: action.parties}}

    case DEFINE_ALLIANCES:
      return {...state, ...{alliance: action.alliance}}

    default:
      return state

  }
}

export default partiesReducer
