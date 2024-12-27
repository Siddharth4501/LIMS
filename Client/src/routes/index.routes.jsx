import { createBrowserRouter } from "react-router-dom"
import Register from "../components/Register"
import TM_Home from "../pages/TechnicalManager/TM_Home"
import TM_SampleAllotment from "../pages/TechnicalManager/TM_SampleAllotment"
import SampleViewMore from "../components/SampleViewMore"
import Login from "../pages/User/Login"

const router = createBrowserRouter([
    {
        path: "/",
        element:<TM_Home /> ,
    },
    {
        path:"/Login",
        element:<Login />,
    },

    {

        
        path: "/SampleRegister",
        element: <Register />,
    },
    {
        path: "/SampleAllotment",
        element:<TM_SampleAllotment /> ,
    },
    {
        path: "/SampleAllotment/View_More",
        element:<SampleViewMore /> ,
    },
])

export default router