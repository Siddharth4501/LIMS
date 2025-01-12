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
import TM_ResultApproval from "../pages/TechnicalManager/TM_ResultApproval"
import TM_PendingSample from "../pages/TechnicalManager/TM_PendingSample"
import TM_ResultApprovalViewMore from "../pages/TechnicalManager/TM_ResultApprovalViewMore"
import TM_ApprovedRes from "../pages/TechnicalManager/TM_ApprovedRes"
import TM_RAResultStatus from "../pages/TechnicalManager/TM_RAResultStatus"
import ParticularUserSRH from "../pages/SampleRegistration/ParticularUserSRH"
import ChangePassword from "../pages/User/ChangePassword"
import MainUI from "../pages/Admin/MainUI/MainUI"
import AddGroup from "../pages/Admin/GroupRelated/AddGroup"
import AddTypeOfTesting from "../pages/Admin/GroupRelated/AddTypeOfTesting"
import AddTests from "../pages/Admin/GroupRelated/AddTests"
import UserList from "../pages/Admin/UserRelated/UserList"
import UserListViewMore from "../pages/Admin/UserRelated/UserListViewMore"

const router = createBrowserRouter([
    {
        path: "/Technical Manager/Home",
        element:<TM_Home /> ,
    },
    {
        path:"/Login",
        element:<Login />,
    },
    {
        path: "/",
        element:<UserInterface /> ,
    },
    {
        path: "/User/Change-Password",
        element:<ChangePassword /> ,
    },
    {
        path: "/Sample Registration/Home",
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
        path: "/ResultApproval",
        element:<TM_ResultApproval /> ,
    },
    {
        path: "/ResultApproval/Result_Status",
        element:<TM_RAResultStatus /> ,
    },
    {
        path: "/ResultApproval/Result_Status/View_More",
        element:<TM_ResultApprovalViewMore /> ,
    },
    {
        path: "/ResultApproved",
        element:<TM_ApprovedRes/> ,
    },
    {
        path: "/TM_PendingSamples",
        element:<TM_PendingSample /> ,
    },
    {
        path: "/SampleRegistrationUser/SampleHistory",
        element:<ParticularUserSRH/> ,
    },
    {
        path: "/SampleRegistrationUser/SampleHistory/View_More",
        element:<FullHistory/> ,
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
    {
        path: "/Admin/Home",
        element:<MainUI /> ,
    },
    {
        path: "/Admin/Group/AddGroup",
        element:<AddGroup /> ,
    },
    {
        path: "/Admin/Group/AddTypeOfTesting",
        element:<AddTypeOfTesting /> ,
    },
    {
        path: "/Admin/Group/AddTests",
        element:<AddTests/> ,
    },
    {
        path: "/Admin/User/UserList",
        element:<UserList/> ,
    },
    {
        path: "/Admin/User/UserList/View_More",
        element:<UserListViewMore/> ,
    },

])

export default router