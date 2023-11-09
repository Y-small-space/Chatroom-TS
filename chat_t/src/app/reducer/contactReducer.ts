const contactReducer = (prevState = {
  user: []
}, action: { type: string; payload: never[] }) => {
  let newState = { ...prevState }
  switch (action.type) {
    case "contact-user":
      newState.user = action.payload
      return newState
    default:
      return prevState
  }
}

export default contactReducer