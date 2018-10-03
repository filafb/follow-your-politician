import axios from 'axios'
import { getCandidates, getPartiesAndAlliances, filterMyCandidates } from './helperFunctions'
import { stateNames } from '../components/stateNames'
import { loadedParties } from './partiesReducer'

const FETCH_CANDIDATES = 'FETCH_CANDIDATES'
const GET_MY_CANDIDATES = 'GET_MY_CANDIDATES'
const FETCHING = 'FETCHING'
const ERROR = 'ERROR'

const initialState = {
  listAll: [],
  filtered: [],
  isFetching: false,
  errorMessage: ''
}

const fetchedCandidates = listAll => ({
  type: FETCH_CANDIDATES,
  listAll
})

const gottenMyCandidates = MyList => ({
  type: GET_MY_CANDIDATES,
  MyList
})

const fetching = message => ({
  type: FETCHING,
  message
})

const getError = message => ({
  type: ERROR,
  message
})

export const fetchCandidates = state => {
  return async dispatch => {
    try{
      dispatch(fetching('all'))
      const [stateFiltered] = stateNames.filter(st => st.name === state)
      const api = getCandidates(stateFiltered.initials)
      const { data } = await axios.get(api)
      const candAuthorized = data.candidatos.filter(cand => {
        return cand.descricaoSituacao === 'Deferido'
      })
      dispatch(fetchedCandidates(candAuthorized))
      const parties = getPartiesAndAlliances(candAuthorized)
      dispatch(loadedParties(parties))
    }
    catch (err){
      dispatch(getError('Erro de network. Atualize a página'))
    }
  }
}

export const getMyCandidates = (list, state) => {
  return async dispatch => {
    try{
      dispatch(fetching('mine'))
      const [stateFiltered] = stateNames.filter(st => st.name === state)
      const links = filterMyCandidates(list, stateFiltered.initials)
      const candDetailed = links.map(link => {
        const data  = axios.get(link)
        return data
      })
      //console.log(candDetailed)
      const candidatesRaw = await Promise.all(candDetailed)
      const candidates = candidatesRaw.map(cand => cand.data)
      console.log(candidates)
      dispatch(gottenMyCandidates(candidates))
    } catch (err){
      dispatch(getError('Erro de network. Atualize a página'))
    }
  }
}

const candidatesReducer = (state = initialState, action) => {
  switch (action.type){
    case FETCH_CANDIDATES:
      return {...state, listAll: action.listAll, isFetching: false}

    case GET_MY_CANDIDATES:
      return {...state, filtered: action.MyList, isFetching: false}

    case FETCHING:
      return {...state, isFetching: action.message}

    case ERROR:
      return {...state, errorMessage: action.message}

    default:
      return state
  }
}

export default candidatesReducer
