import { createBrowserRouter } from "react-router-dom"
import Register from "../components/Register"
import SearchFeature from "../components/SearchFeature"
import TM_Home from "../pages/TechnicalManager/TM_Home"

const router = createBrowserRouter([
    {
        path: "/",
        element:<TM_Home /> ,
    },
    {

        
        path: "/SampleRegister",
        element: <Register />,
    },
])

export default router