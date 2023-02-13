import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/About";
import Erroe404 from './pages/erroe404';
 
import Profile from "./pages/Profile";
// LEVEL2
import { useContext } from "react";
import ThemeContext from "./context/ThemeContext";
import Signin from './pages/signin/Singin';
import Signup from './pages/Signup';
import EditTask from "pages/edit-task/Edit-Task";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Erroe404 />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },


  {
    path: "/signup",
    element: <Signup />,
  },



  {
    path: "/about",
    element: <About />,
  },

 
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/edit-task",
    element: <EditTask />,
  },
]);

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`${theme}`}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
