import axios from "axios";
import { Dispatch } from "redux";
const userId = localStorage.getItem('userId')


interface ContactUserAction {
  type: string,
  payload: any
}

function getContactListAction() {
  console.log(userId)
  return (dispatch:Dispatch) => {
    axios.get(`http://localhost:4000/api/friendList?userId=${userId}`)
      .then(res => {
        dispatch({
          type: "contact-user",
          payload: res.data
        })
      })
      .catch((error) => {
        console.log('Axios请求失败：', error)
      })
  }
}

export default getContactListAction