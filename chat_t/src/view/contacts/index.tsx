import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component'
import { Layout, Button, List, Divider, Avatar } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom'
import { RootState } from '../../app/store';
import getContactListAction from '../../app/actionCreator/getContactListAction';
const { Content, Sider } = Layout;

// type User{
  
// }

export default function Contacts() {
  const [isClick, setIsClick] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const contactList = useSelector<RootState, User[]>((state) => state.contactReducer.user);

  useEffect(() => {
    LoadContactList();
  }, []);

  const LoadContactList = () => {
    setLoading(true);
    try {
      if (contactList.length === 0) {
        // 如果联系人列表为空，才触发加载操作
        dispatch(getContactListAction());
      }
    } catch (error) {
      console.error('加载联系人列表时出错：', error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <Content
      style={{
        padding: '0 50px',
        marginTop: "30px"
      }}
    >
      <Layout
        style={{
          height: "100%",
          padding: '24px 0',
          backgroundColor: "rgb(255,255,255,0.5)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)"
        }}
      >
        <Sider
          width={300}
          style={{
            backgroundColor: "transparent",
            fontSize: '20px'
          }}
        >
          <div
            id="scrollableDiv"
            style={{
              height: "100%",
              overflow: 'auto',
              padding: '0 16px',
              marginLeft: '20px',
              border: '1px solid rgba(140, 140, 140, 0.35)',
            }}
          >
            <Button size='large' onClick={handleAddFriends} ghost style={{ width: '100%', borderColor: 'rgba(140, 140, 140, 0.35)', marginTop: '10px' }}>ADD</Button>
            <InfiniteScroll
              dataLength={firendList.length}
              next={LoadContactList}
              hasMore={firendList.length < 50}
              endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
              scrollableTarget="scrollableDiv"
              loader={null}
            >
              <List
                dataSource={firendList}
                renderItem={(item) => (
                  <List.Item >
                    <List.Item.Meta
                      avatar={<Avatar size={30} style={{ backgroundColor: "rgb(0,150,255)" }}>{item.username}</Avatar>}
                      title={item.username}
                    />
                    <div onClick={
                      () => {
                        setIsClick(false)
                        setSelectedUser(item)
                        navigate(`/layout/contacts/userdetails?id=${item.username}`)
                      }}>Content</div>
                  </List.Item>
                )}
              />
            </InfiniteScroll>
          </div>
        </Sider>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Content>
  )
}