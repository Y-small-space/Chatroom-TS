import axios from "axios";

const userId = localStorage.getItem('userId')

function getAllhistoryAction() {
  return (dispatch: (arg0: { type: string; payload: any; }) => void) => {
    axios.get(`http://localhost:4000/api/chatHistory/${userId}`)
      .then(res => {
        dispatch({
          type: "chathistory-content",
          payload: res.data
        })
      })
      .catch((error) => {
        console.log('Axios请求失败：', error)
      })
  }
}

export default getAllhistoryAction