import { createBrowserRouter } from "react-router-dom"
import Register from "../components/Register"
import SearchFeature from "../components/SearchFeature"
import TM_Home from "../pages/TechnicalManager/TM_Home"
import TM_SampleAllotment from "../pages/TechnicalManager/TM_SampleAllotment"
import SampleViewMore from "../components/SampleViewMore"

const router = createBrowserRouter([
    {
        path: "/",
        element:<TM_Home /> ,
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