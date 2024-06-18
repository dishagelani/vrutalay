import { Routes, Route } from 'react-router-dom';
import Login from './views/auth/login';
import ViewExpenses from './views/dashboard/viewExpenses';
import { AuthContextProvider } from './context/authContext';

const App = () => {
 return (
    <div>
      <AuthContextProvider>
       <Routes>
          <Route path="/" element={<ViewExpenses />} />
          <Route path="/auth" element={<Login />} />
       </Routes>
       </AuthContextProvider>


    </div>
 );
};

export default App;