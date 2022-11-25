import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Blogs from "../../Pages/Blogs/Blogs";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import error from '../../assets/error.png'
import Signup from "../../Pages/Signup/Signup";
import Products from "../../Pages/Home/Products/Products";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            },
            {
                path: '/blogs',
                element: <Blogs></Blogs>
            },
            {
                path: '/category/:id',
                element: <Products></Products>,
                loader: ({ params }) => fetch(`http://localhost:5000/categories/${params.id}`)
            },
            {
                path: '*',
                element: <div>
                    <div className="flex justify-center"><img src={error} alt="" /></div>
                    <h2 className="text-center text-2xl font-bold">Click any above link to continue 😵‍💫😵‍💫</h2>
                </div>
            }
        ]
    }
])

export default router;