
import { AuthContextProvider } from './context/authContext';
import { ExpenseContextProvider } from './context/expenseContext';
import { TodoContextProvider } from './context/toDoContext';
import Routes from "./routes/index"

const App = () => {
   return (
      <div className='auth'>
         <AuthContextProvider>
            <ExpenseContextProvider>
               <TodoContextProvider>
                  <Routes />
               </TodoContextProvider>
            </ExpenseContextProvider>
         </AuthContextProvider>


      </div>
   )
}

export default App;