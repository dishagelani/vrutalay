
import { AuthContextProvider } from './context/authContext';
import { ExpenseContextProvider } from './context/expenseContext';
import Routes from "./routes/index"

const App = () => {
   return (
      <div className='auth'>
         <AuthContextProvider>
            <ExpenseContextProvider>         
            <Routes />
            </ExpenseContextProvider>
         </AuthContextProvider>


      </div>
   )
}

export default App;