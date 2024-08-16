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
import AnnualReport from "../views/dashboard/annualReport";
import ToDoList from "../views/dashboard/toDoList";
import ThingsToBuy from "../views/dashboard/thingsToBuy";
// import ThingsToBuy from "../views/dashboard/thingsToBuyCopy";
import Comparision from "../views/dashboard/comparision";
  const router = createBrowserRouter(
    
    createRoutesFromElements(
 <>
      <Route path="/">        
        <Route element={<Protected />}>
           <Route index element={  <ViewExpenses />} />
           <Route path="/breakdown" element={  <Breakdown />} />
           <Route path="/add-expense" element={  <AddExpense />} />
           <Route path="/edit-expense" element={  <AddExpense />} />
           <Route path="/annual-report" element={  <AnnualReport />} />
           <Route path="/view-comparision" element={  <Comparision />} />
           <Route path="/to-do-list" element={  <ToDoList />} />
           <Route path="/things-to-buy" element={  <ThingsToBuy />} />
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