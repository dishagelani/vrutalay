
import { AuthContextProvider } from './context/authContext';
import Routes from "./routes/index"

const App = () => {
 return (
    <div>
      <AuthContextProvider>
         <Routes />
       </AuthContextProvider>


    </div>
 );
};

export default App;