import { GET_RECIPE, RECEIVE_RECIPE, FAIL_RECIPE, CURRENT_RECIPE } from "../actions"

const initialState = {
  id: null,
  ingredients: null,
  instructions: null,
  name: null,
  isLoading: false,
  error: null,
}

const recipeFetching = (state) => {
  return { ...state, isLoading: true }
}

const recipeFetched = (state, payload) => {
  return { ...state, isLoading: false, ingredients: payload.ingredients, instructions: payload.instructions, name: payload.name }
}

const recipeFailed = (state, payload) => {
  return { ...state, isLoading: false, error: payload }
}

const currentRecipeUpdate = (state, id) => {
  return { ...state, id }
}

export default (state = initialState, { type, payload, id }) => {
  switch (type) {
    case GET_RECIPE:
      return recipeFetching(state)
    case RECEIVE_RECIPE:
      return recipeFetched(state, payload)
    case FAIL_RECIPE:
      return recipeFailed(state, payload)
    case CURRENT_RECIPE:
      return currentRecipeUpdate(state, id)
    default:
      return state
  }
}
