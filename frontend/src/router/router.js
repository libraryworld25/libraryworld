import { createBrowserRouter } from 'react-router-dom';
import Home from '../screens/home/Home.jsx';
import About from '../screens/about/About.jsx';
import Profile from '../screens/auth/Profile.jsx';
import Login from '../screens/auth/Login.jsx';
import Signup from '../screens/auth/Signup.jsx';
import ContactPage from '../screens/contact/ContactPage.jsx';
import Forgot from '../screens/auth/Forgot.jsx';
import NewBooks from '../screens/newbooks/NewBooks.jsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/about",
        element: <About />
    },
    {
        path: "/newbooks",
        element: <NewBooks />
    },
    {
        path: "/profile",
        element: <Profile />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "/forgot",
        element: <Forgot />
    },
    {
        path: "/contact",
        element: <ContactPage />
    },
]);

export default router;