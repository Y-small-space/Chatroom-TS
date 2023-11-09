import React, { useState } from 'react'
import { Alert, Avatar, Button, Input, Space } from 'antd'
import { UserOutlined, EyeTwoTone, EyeInvisibleOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import './index.css'
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate()

  // 提交事件
  const handleRegister = async () => {
    if (password.length < 8) {
      setPasswordError("密码必须8位以上！！！")
    }

    try {
      const response = await fetch('http://localhost:4000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // 注册成功，可以进行重定向或显示成功消息
        console.log('注册成功！');
        setIsRegistered(true)
      } else {
        const data = await response.json();
        if (data.error.includes('用户名已存在')) {
          setUsernameError('您的用户名已经有人注册！');
        } else if (data.error.includes('密码必须')) {
          setPasswordError('密码必须8位以上');
        }
        // 注册失败，处理错误情况
        console.error('注册失败！');
      }
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('发生错误：', error);
    }
  };

  return (
    <div className='register'>
      <Avatar
        size={100}
      >User</Avatar>
      <Input
        size='large'
        placeholder='input id'
        style={{
          width: '200px',
          marginBottom: "5px",
          marginTop: "30px"
        }}
        suffix={<UserOutlined />}
        onChange={(e) => setUsername(e.target.value)}
      ></Input>
      {
        passwordError &&
        <Alert type='error' message={usernameError} showIcon style={{ width: "200px" }} />
      }
      <Input.Password
        size='large'
        placeholder="input password"
        style={{
          width: '200px',
          marginTop: "5px",
          marginBottom: "5px"
        }}
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        onChange={(e) => setPassword(e.target.value)}
        onPressEnter={handleRegister}
      />
      {
        passwordError &&
        <Alert type='error' message={passwordError} showIcon style={{ width: "200px" }} />
      }
      {isRegistered && <Alert
        message="Success!!!"
        type='success'
        description="Register Successful and would want to login page"
        showIcon
        style={{ marginTop: '20px', width: '300px' }}
        action={
          <Space direction='vertical'>
            <Button onClick={() => { navigate('/login') }} style={{ width: '80px', color: 'blue', background: 'transparent' }}>Accept</Button>
            <Button onClick={() => { setIsRegistered(false) }} style={{ width: '80px', color: 'red', background: 'transparent' }}>Decline</Button>
          </Space>
        }
      ></Alert>}
      <Button
        style={{ marginTop: '100px' }}
        type='link'
        href='/login'
      ><ArrowLeftOutlined />Login</Button>
    </div>
  )
}
