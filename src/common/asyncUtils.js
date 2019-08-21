export function reduxThunkPromise(baseName, fn, payload){
  return dispatch => {
    dispatch({type: `${baseName}_LOADING`, payload})

    return fn().then(
      response => dispatch({type: `${baseName}_SUCCESS`, payload: response}),
      error => dispatch({type: `${baseName}_FAILURE`, payload: error}))
  }
}
