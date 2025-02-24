import { createBrowserRouter } from "react-router-dom"
import Register from "../components/Register"
import TM_Home from "../pages/TechnicalManager/TM_Home"
import TM_SampleAllotment from "../pages/TechnicalManager/TM_SampleAllotment"
import SampleViewMore from "../components/SampleViewMore"
import Login from "../pages/User/Login"
import UserInterface from "../pages/User/UserInterface"
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
import AllSamplesHistory from "../pages/Admin/Sample Related/AllSamplesHistory"
import AllDeletedSamples from "../pages/Admin/Sample Related/AllDeletedSamples"
import DeletedUserList from "../pages/Admin/UserRelated/DeletedUserList"
import AddUser from "../pages/Admin/UserRelated/AddUser"
import GroupList from "../pages/Admin/GroupRelated/GroupList"
import TypeOfTestingList from "../pages/Admin/GroupRelated/TypeOfTestingList"
import TestsList from "../pages/Admin/GroupRelated/TestsList"
import MethodList from "../pages/Admin/MethodRelated/MethodList"
import AddMethod from "../pages/Admin/MethodRelated/AddMethod"
import ErrorList from "../pages/Admin/ErrorRelated/ErrorList"
import AddError from "../pages/Admin/ErrorRelated/AddError"

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
        path: "/Admin/Group/GroupList",
        element:<GroupList/> ,
    },
    {
        path: "/Admin/Group/TypeOfTestingList",
        element:<TypeOfTestingList/> ,
    },
    {
        path: "/Admin/Group/TestsList",
        element:<TestsList/> ,
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
        path: "/Admin/User/AddUser",
        element:<AddUser/> ,
    },
    {
        path: "/Admin/User/UserList/View_More",
        element:<UserListViewMore/> ,
    },
    {
        path: "/Admin/User/DeletedUserList",
        element:<DeletedUserList/> ,
    },
    {
        path: "/Admin/Sample/AllSampleHistory",
        element:<AllSamplesHistory/> ,
    },
    {
        path: "/Admin/Sample/AllSampleHistory/View_More",
        element:<FullHistory/> ,
    },
    {
        path: "/Admin/Sample/DeletedSampleHistory",
        element:<AllDeletedSamples/> ,
    },
    {
        path: "/Admin/Sample/DeletedSampleHistory/View_More",
        element:<FullHistory/> ,
    },
    {
        path: "/Admin/Substance/MethodList",
        element:<MethodList/> ,
    },
    {
        path: "/Admin/Substance/AddMethod",
        element:<AddMethod/> ,
    },
    {
        path: "/Admin/Error/ErrorList",
        element:<ErrorList/> ,
    },
    {
        path: "/Admin/Error/AddError",
        element:<AddError/> ,
    },

])

export default router