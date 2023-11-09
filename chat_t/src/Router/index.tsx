import Login from '../view/login';
import Register from '../view/register';
import Layout from '../view/layout';
import Chat from '../view/chat';
import Contacts from '../view/contacts';
import NullUser from '../view/contacts/nullUser';
import UserDetails from '../view/contacts/userDetails';
import SearchUserPage from '../view/contacts/searchUserPage';
import { Routes, Route ,Navigate} from 'react-router-dom';

export default function IndexRouter() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/layout/*' element={<Layout />} >
        <Route index element={< Chat />} />
        <Route path='chat' element={<Chat />} />
        <Route path='contacts/*' element={<Contacts />} >
          <Route index element={<NullUser />} />
          <Route path='null' element={<NullUser />} />
          <Route path='userdetails' element={<UserDetails />} />
          <Route path='seachuser' element={<SearchUserPage />} />
        </Route>
      </Route>
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  )
}

