import axios from 'axios'

const initialState = {
  votedProjects: [],
  tobeVoted: []
}


const FETCH_VOTED_PROJECTS = 'FETCH_VOTED_PROJECTS'

const loadVotedProjects = (votedProjects) => {
  return {
    type: FETCH_VOTED_PROJECTS,
    votedProjects
  }
}

export const fetchVotedProjects =() => {
  return async dispatch => {
    const { data } = await axios.get('https://dadosabertos.camara.leg.br/api/v2/proposicoes/2180055/votacoes')
    const votedProjects = data.dados
    dispatch(loadVotedProjects(votedProjects))
  }
}

const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VOTED_PROJECTS:
      return {...state, votedProjects: action.votedProjects}

    default:
      return state
  }
}

export default projectsReducer
