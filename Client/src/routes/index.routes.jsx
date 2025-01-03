import { createBrowserRouter } from "react-router-dom"
import Register from "../components/Register"
import TM_Home from "../pages/TechnicalManager/TM_Home"
import TM_SampleAllotment from "../pages/TechnicalManager/TM_SampleAllotment"
import SampleViewMore from "../components/SampleViewMore"
import Login from "../pages/User/Login"
import UserInterface from "../pages/User/UserInterface"
import AllSamplesHistory from "../pages/SampleRegistration/AllSamplesHistory"
import FullHistory from "../pages/SampleRegistration/FullHistory"
import UserSampleRegister from "../pages/User/UserSampleRegister"
import AN_PendingSamplesViewMore from "../pages/Analyst/AN_PendingSamplesViewMore"
import AN_PendingSamples from "../pages/Analyst/AN_PendingSamples"
import AN_CompletedSamples from "../pages/Analyst/AN_CompletedSamples"
import AnalystHome from "../pages/Analyst/AnalystHome"

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
        path: "/UserInterface",
        element:<UserInterface /> ,
    },
    {
        path: "/UserInterface/SampleRegisterOptions",
        element:<UserSampleRegister /> ,
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
    {
        path: "/AllSampleHistory",
        element:<AllSamplesHistory/> ,
    },
    {
        path: "/AllSampleHistory/View_More",
        element:<FullHistory/> ,
    },
    {
        path:"/AN_PendingSample/ViewMore",
        element:<AN_PendingSamplesViewMore/>
    },
    {
        path:"/AN_PendingSamples",
        element:<AN_PendingSamples/>
    },
    {
        path:"/AN_CompletedSamples",
        element:<AN_CompletedSamples/>
    },
    // {
    //     path:"/AN_CompletedSamples/ViewMore",
    //     element:<AN_CompletedSamples/>
    // },
    {
        path:"/Analyst/Home",
        element:<AnalystHome/>
    },

])

export default router