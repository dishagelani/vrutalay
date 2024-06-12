import { Routes, Route } from 'react-router-dom';
import Login from './views/auth/login';
import ViewExpenses from './views/dashboard/viewExpenses';

const App = () => {
 return (
    <>
       <Routes>
          <Route path="/" element={<ViewExpenses />} />
          <Route path="/auth" element={<Login />} />
       </Routes>
    </>
 );
};

export default App;