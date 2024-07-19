import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider
  } from "react-router-dom";
import Protected from "./protected";
import { isAuthenticated } from "./helper";
import Login from "../views/auth/login";  
import ViewExpenses from '../views/dashboard/expenses';
import { Breakdown } from "../views/dashboard/breakdown";
import AddExpense from "../views/dashboard/addExpense";
  const router = createBrowserRouter(
    
    createRoutesFromElements(
 <>
      <Route path="/">        
        <Route element={<Protected />}>
           <Route index element={  <ViewExpenses />} />
           <Route path="/breakdown" element={  <Breakdown />} />
           <Route path="/add-expense" element={  <AddExpense />} />
           <Route path="/edit-expense" element={  <AddExpense />} />
      </Route>
      <Route path="/auth" element={<Login />} loader={async () => await isAuthenticated()} />
      </Route>
 </>
    )
  );
  
  const Index = () => {
    return      (
<>
<RouterProvider router={router} />
</>
    )    
  };
  
  export default Index;