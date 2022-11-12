export const GET_RECIPE = "GET_RECIPE"
export const RECEIVE_RECIPE = "RECEIVE_RECIPE"
export const FAIL_RECIPE = "FAIL_RECIPE"
export const CURRENT_RECIPE = "CURRENT_RECIPE"

const fetchingRecipe = () => ({
  type: GET_RECIPE,
})

const fetchedRecipe = (payload) => ({
  type: RECEIVE_RECIPE,
  payload,
})

const failedRecipe = (payload) => ({
  type: FAIL_RECIPE,
  payload,
})

const currentRecipe = (id) => ({
  type: CURRENT_RECIPE,
  id
})

const getRecipeRequest = async (id) => {
  const response = await fetch(`/api/recipe/${id}`, {
    method: "GET"
  })
  const recipeResult = await response.json()
  return recipeResult
}

export const getRecipe = (id) => {
  return (dispatch) => {
    dispatch(fetchingRecipe())
    return getRecipeRequest(id)
      .then((res) => dispatch(fetchedRecipe(res)))
      .catch((err) => dispatch(failedRecipe(err)))
  }
}

export const setCurrentRecipeId = (id) => {
  return dispatch => dispatch(currentRecipe(id))
}
