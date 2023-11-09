const allhistoryReducer = (prevState = {
  chatHistory: []
}, action: { type: string; payload: never[] }) => {
  let newState = { ...prevState }
  switch (action.type) {
    case "chathistory-content":
      newState.chatHistory = action.payload
      return newState

    default:
      return prevState
  }
}

export default allhistoryReducer