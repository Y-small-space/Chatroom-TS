import React, { useState } from 'react'
import { Avatar, Button, Input, Alert } from 'antd'
import { UserOutlined, EyeTwoTone, EyeInvisibleOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import './index.css'

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log('Username:', username);
    console.log('Password:', password);
    try {
      const response = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        localStorage.setItem('userId', username);
        console.log('登录成功！');
        navigate('/layout')
      } else {
        setIsError("账号或者密码有误！请重新尝试！")
        console.error('登录失败！');
      }
    } catch (error) {
      console.error('发生错误：', error);
    }
  }

  const handleEnterKey = (event: { key: string }) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  }

  return (
    <div className='login'>
      <Avatar
        size={100}
      >
        User
      </Avatar>
      <Input
        size='large'
        placeholder='input id'
        style={{
          width: '200px',
          marginBottom: "10px",
          marginTop: "30px",
        }}
        status={isError ? 'error' : ''}
        onChange={(e) => setUsername(e.target.value)}
        suffix={<UserOutlined />}
      ></Input>
      <Input.Password
        size='large'
        placeholder="input password"
        style={{
          width: '200px',
          marginBottom: "7px"
        }}
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={handleEnterKey}
        status={isError ? 'error' : ''}
      />
      {
        isError &&
        <Alert
          message="Error"
          description={isError}
          type="error"
          showIcon
          closable
        />
      }
      <Button
        style={{ marginTop: '150px' }}
        type='link'
        href='/register'
      >Register<ArrowRightOutlined /></Button>
    </div >
  )
}
