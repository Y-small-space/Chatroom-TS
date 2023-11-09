import React, { useState, useContext, createContext } from 'react';
import "./index.css"
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom'
import Bar from '../bar';
const { Footer } = Layout;

type FriendList = {
  friendList_room: string[];
  setFriendList_room: React.Dispatch<React.SetStateAction<string[]>>;
  contactsRoomId: object[];
  setContactsRoomId: React.Dispatch<React.SetStateAction<object[]>>;
}

const FriendListContext = createContext<FriendList|null>(null);

const Layouts = () => {
  const [friendList_room, setFriendList_room] = useState<string[]>([]);
  const [contactsRoomId, setContactsRoomId] = useState<object[]>([]);

  return (
    <FriendListContext.Provider value={{ friendList_room, setFriendList_room, contactsRoomId, setContactsRoomId }}>
      <Layout className='layout' >
        <Bar />
        <Outlet />
        <Footer
          style={{
            textAlign: 'center',
            backgroundColor: 'transparent',
            color: 'white'
          }}
        >
          Chat Room ©2023 Created by JY
        </Footer>
      </Layout>
    </FriendListContext.Provider>

  );
};
export default Layouts;

export function useFriendList() {
  return useContext(FriendListContext);
}