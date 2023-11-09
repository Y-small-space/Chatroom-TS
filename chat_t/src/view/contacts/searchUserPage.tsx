import React, { useState, useEffect, useCallback } from 'react'
import { Layout, Button, List, Divider, Avatar, Card, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons'
import axios from 'axios';

const userId = localStorage.getItem('userId')
export default function SearchUserPage() {
  const [searchResult, setSearchResult] = useState(null);
  const [searchUser, setSearchUser] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isClickSearch, setIsClickSearch] = useState(false);
  const handleEnterKey = (event) => {
    if (event.key === 'Enter') {
      SearchUser();
      setIsClickSearch(!isClickSearch);
      setSearchUser('')
    }
  }
    // 添加好友
    const AddFriends = async (friendId) => {
      try {
        const response = await axios.post('http://localhost:4000/api/addFriends',
          {
            userIdToAdd: friendId,
            currentUserId: userId
          });
        console.log(friendId, userId);
        const message = response.data.message;
        console.log(message.users);
        setSuccessMessage(message);
      } catch (error) {
        setErrorMessage(`${error.message}`)
        console.error('添加好友失败', error);
      }
    }

  // 搜索好友
  const SearchUser = async () => {
    setSuccessMessage('');
    setErrorMessage('');
    try {
      const response = await axios.get(`http://localhost:4000/api/search?query=${searchUser}`);
      setSearchResult(response.data.users[0]);
    } catch (error) {
      console.error('搜索失败：', error)
    }
  }
  return (
    <Card
      style={{
        display: 'flex',
        height: '100%',
        marginLeft: '20px',
        marginRight: '20px',
        backgroundColor: "transparent",
        border: '1px solid rgba(140, 140, 140, 0.35)',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around'
      }}
    >
      <Input
        size="large"
        style={{ width: '500px' }}
        onChange={e => setSearchUser(e.target.value)}
        onKeyDown={handleEnterKey}
      ></Input>
      {searchResult &&
        <Card
          style={{ display:'flex',justifyContent:'space-between',alignItems:'center',flexDirection:'column',width: '500px', marginTop: '20px', height: '280px', backgroundColor: '',textAlign:'center' }}
        >
          <Avatar style={{ marginTop: '30px', backgroundColor: 'rgb(0,150,255)' }} size={70}>{searchResult.username}</Avatar>
          <div style={{marginTop:'20px',height:'20px',textAlign:"center",fontSize:'30px'}}>{searchResult.username}</div>
          <Button onClick={()=>AddFriends(searchResult.username)} style={{ marginTop: '40px', border: "0", backgroundColor: 'rgb(100,100,100,0.5)' }}>ADD</Button>
        </Card>}
    </Card>
  )
}

