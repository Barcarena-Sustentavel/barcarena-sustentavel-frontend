import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DimensaoAdmin from './components/admin/dimensaoAdmin';
import DimensaoPage from './components/admin/dimensaoPage';

const App:FC = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/admin/dimensao" element={<DimensaoAdmin/>} />
        <Route path="/admin/dimensao/:dimensao" element={<DimensaoPage/>} />
      </Routes>
    </BrowserRouter>
  )
}
/*
interface AppProps {
  title: string;
}

interface User {
  login: {
    uuid: string;
  };
  name: {
    first: string;
    last: string;
  };
  email: string;
}
const App:FC<AppProps> = ({title}) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {

    const getUsers = async () => {
      try {
        const { data } = await axios.get(
          'https://randomuser.me/api/?results=10'
        );
        console.log(data);
        setUsers(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  });

return (
    <div>
      <h1>{title}</h1>
      <ul>
        {users.map(({ login, name, email }) => {
          return (
            <li key={login.uuid}>
              <div>
                Name: {name.first} {name.last}
              </div>
              <div>Email: {email}</div>
              <hr />
            </li>
          );
        })}
      </ul>
    </div>
  );};
*/
export default App