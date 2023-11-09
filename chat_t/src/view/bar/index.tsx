import { Avatar, Dropdown, Layout, Menu, Space } from 'antd';
import type { MenuProps } from 'antd';
import { CommentOutlined, LogoutOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
const { Header } = Layout;


const items1: MenuProps['items'] = [
  {
    label: 'Chat',
    key: 'chat',
    icon: <CommentOutlined />
  },
  {
    label: 'Contacts',
    key: 'contacts',
    icon: <TeamOutlined />
  }
]
const items:MenuProps['items'] = [
  {
    label: 'Profile',
    key: 'profile',
    icon: <UserOutlined />
  },
  {
    label: 'Logout',
    key: 'logout',
    icon: <LogoutOutlined />
  }
]

const userId = localStorage.getItem('userId')

export default function Bar() {
  const navigator = useNavigate()
  const onClick = (e: { key: any; }) => {
    navigator(`/layout/${e.key}`)
  }
  const userClick = (e: { key: string; }) => {
    if (e.key === 'logout') {
      localStorage.clear()
      navigator('/login')
    }
  }
  return (
    <Header
      style={{
        width: "100%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: "rgb(255,255,255,0.5)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      <Menu items={items1} style={{ marginLeft: "100px", backgroundColor: "transparent", fontSize: '18px' }} onClick={onClick} mode='horizontal' />
      <Dropdown
        menu={{
          items,
          onClick: userClick,
        }}
      >
        <Space>
          <Avatar size={50} style={{ float: 'right', marginRight: '30px' }}>{userId}</Avatar>
        </Space>
      </Dropdown>
    </Header>
  )
}
