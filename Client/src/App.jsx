import './App.css'
import {Routes,Route} from 'react-router-dom'
import TM_Home from './pages/TechnicalManager/TM_Home.jsx'
import Login from './pages/User/Login.jsx'
import UserInterface from './pages/User/UserInterface.jsx'
import ChangePassword from './pages/User/ChangePassword.jsx'
import UserSampleRegister from './pages/User/UserSampleRegister.jsx'
import Register from './components/Register.jsx'
import TM_SampleAllotment from './pages/TechnicalManager/TM_SampleAllotment.jsx'
import SampleViewMore from "./components/SampleViewMore.jsx"
import TM_ResultApproval from './pages/TechnicalManager/TM_ResultApproval.jsx'
import TM_RAResultStatus from './pages/TechnicalManager/TM_RAResultStatus.jsx'
import TM_ResultApprovalViewMore from './pages/TechnicalManager/TM_ResultApprovalViewMore.jsx'
import TM_ApprovedRes from './pages/TechnicalManager/TM_ApprovedRes.jsx'
import TM_PendingSample from './pages/TechnicalManager/TM_PendingSample.jsx'
import ParticularUserSRH from './pages/SampleRegistration/ParticularUserSRH.jsx'
import FullHistory from './pages/SampleRegistration/FullHistory.jsx'
import AN_PendingSamplesViewMore from './pages/Analyst/AN_PendingSamplesViewMore.jsx'
import AN_PendingSamples from './pages/Analyst/AN_PendingSamples.jsx'
import AN_CompletedSamples from './pages/Analyst/AN_CompletedSamples.jsx'
import AnalystHome from './pages/Analyst/AnalystHome.jsx'
import MainUI from './pages/Admin/MainUI/MainUI.jsx'
import GroupList from './pages/Admin/GroupRelated/GroupList.jsx'
import TypeOfTestingList from './pages/Admin/GroupRelated/TypeOfTestingList.jsx'
import TestsList from './pages/Admin/GroupRelated/TestsList.jsx'
import AddGroup from './pages/Admin/GroupRelated/AddGroup.jsx'
import AddTypeOfTesting from './pages/Admin/GroupRelated/AddTypeOfTesting.jsx'
import AddTests from './pages/Admin/GroupRelated/AddTests.jsx'
import UserList from './pages/Admin/UserRelated/UserList.jsx'
import AddUser from './pages/Admin/UserRelated/AddUser.jsx'
import UserListViewMore from './pages/Admin/UserRelated/UserListViewMore.jsx'
import DeletedUserList from './pages/Admin/UserRelated/DeletedUserList.jsx'
import AllSamplesHistory from './pages/Admin/Sample Related/AllSamplesHistory.jsx'
import AllDeletedSamples from './pages/Admin/Sample Related/AllDeletedSamples.jsx'
import MethodList from './pages/Admin/MethodRelated/MethodList.jsx'
import AddMethod from './pages/Admin/MethodRelated/AddMethod.jsx'
import ErrorList from './pages/Admin/ErrorRelated/ErrorList.jsx'
import AddError from './pages/Admin/ErrorRelated/AddError.jsx'
import UserTestReport from './pages/Admin/UserRelated/UserTestReport.jsx'
import Denied from './pages/Denied.jsx'
import NotFound from './pages/NotFound.jsx'
import RequireAuth from './components/Auth/RequireAuth.jsx'
import NotRequireAuth from './components/Auth/NotRequireAuth.jsx'
import Logo from './pages/Admin/ExtraDetailsRelated/Logo.jsx'
import NameOfLab from './pages/Admin/ExtraDetailsRelated/NameOfLab.jsx'
import AdministratorProfile from './pages/Admin/ExtraDetailsRelated/AdministratorProfile.jsx'
import NABLReportSelection from './pages/Admin/UserRelated/NABLReportSelection.jsx'
import ResetPassword from './pages/Admin/UserRelated/ResetPassword.jsx'
import AdminUserRegister from './pages/User/AdminUserRegister.jsx'
import AdminPermit from './components/AdminPermit.jsx'


function App() {

  return (
    <>
       <Routes>

          <Route element={<RequireAuth allowedRoles={["Sample Registration","Analyst","Technical Manager"]} />}>
            <Route path="/" element={<UserInterface/>} />
          </Route>

          <Route element={<RequireAuth allowedRoles={["Analyst"]} />}>
            <Route path="/AN_PendingSample/ViewMore" element={<AN_PendingSamplesViewMore/>} />
            <Route path="/AN_PendingSamples" element={<AN_PendingSamples/>} />
            <Route path="/AN_CompletedSamples" element={<AN_CompletedSamples/>} />
            <Route path="/AN_CompletedSamples/View_More" element={<FullHistory/>} />
            <Route path="/Analyst/Home" element={<AnalystHome/>} />
          </Route>

          <Route element={<RequireAuth allowedRoles={["Technical Manager"]} />}>
            <Route path="/Technical Manager/Home" element={<TM_Home/>} />
            <Route path="/SampleAllotment" element={<TM_SampleAllotment/>} />
            <Route path="/SampleAllotment/View_More" element={<SampleViewMore/>} />
            <Route path="/ResultApproval" element={<TM_ResultApproval/>} />
            <Route path="/ResultApproval/Result_Status" element={<TM_RAResultStatus/>} />
            <Route path="/ResultApproval/Result_Status/View_More" element={<TM_ResultApprovalViewMore/>} />
            <Route path="/ResultApproved" element={<TM_ApprovedRes/>} />
            <Route path="/ResultApproved/View_More" element={<FullHistory/>} />
            <Route path="/TM_PendingSamples" element={<TM_PendingSample/>} />
          </Route>

          <Route element={<RequireAuth allowedRoles={["Sample Registration"]} />}>
            <Route path="/Sample Registration/Home" element={<UserSampleRegister/>} />
            <Route path="/SampleRegister" element={<Register/>} />
            <Route path="/SampleRegistrationUser/SampleHistory" element={<ParticularUserSRH/>} />
            <Route path="/SampleRegistrationUser/SampleHistory/View_More" element={<FullHistory/>} />
          </Route>

          <Route element={<RequireAuth allowedRoles={["Sample Registration","Admin"]} />}>
            <Route path="/UserTestReport" element={<UserTestReport/>} />
          </Route>

          <Route element={<RequireAuth allowedRoles={["Admin"]} />}>
            <Route path="/Admin/Home" element={<MainUI/>} />
            <Route path="/Admin/Group/GroupList" element={<GroupList/>} />
            <Route path="/Admin/Group/TypeOfTestingList" element={<TypeOfTestingList/>} />
            <Route path="/Admin/Group/TestsList" element={<TestsList/>} />
            <Route path="/Admin/Group/AddGroup" element={<AddGroup/>} />
            <Route path="/Admin/Group/AddTypeOfTesting" element={<AddTypeOfTesting/>} />
            <Route path="/Admin/Group/AddTests" element={<AddTests/>} />
            <Route path="/Admin/User/UserList" element={<UserList/>} />
            <Route path="/Admin/User/AddUser" element={<AddUser/>} />
            <Route path="/Admin/User/UserList/View_More" element={<UserListViewMore/>} />
            <Route path="/Admin/User/reset-password" element={<ResetPassword />} />
            <Route path="/Admin/Sample/AllSampleHistory" element={<AllSamplesHistory/>} />
            <Route path="/Admin/Sample/AllSampleHistory/View_More" element={<FullHistory/>} />
            <Route path="/Admin/Sample/DeletedSampleHistory/View_More" element={<FullHistory/>} />
            <Route path="/Admin/Substance/MethodList" element={<MethodList/>} />
            <Route path="/Admin/Substance/AddMethod" element={<AddMethod/>} />
            <Route path="/Admin/Error/ErrorList" element={<ErrorList/>} />
            <Route path="/Admin/Error/AddError" element={<AddError/>} />

            <Route  element={<AdminPermit/>} >
              <Route path="/Admin/Administration/Logo" element={<Logo/>} />
              <Route path="/Admin/Administration/NameOfLab" element={<NameOfLab/>} />
              <Route path="/Admin/User/DeletedUserList" element={<DeletedUserList/>} />
              <Route path="/Admin/Administration/AdminProfile" element={<AdministratorProfile/>} />
              <Route path="/Admin/Sample/DeletedSampleHistory" element={<AllDeletedSamples/>} />
            </Route>
            
            <Route path="/UserNABLTestReport" element={<NABLReportSelection/>} />
          </Route>
          
          <Route element={<NotRequireAuth />}>
            <Route path="/Login" element={<Login />} /> 
            <Route path="/AdminRegister" element={<AdminUserRegister />} /> 
          </Route>

          <Route element={<RequireAuth allowedRoles={["Sample Registration","Analyst","Technical Manager","Admin"]} />}>
            <Route path="/User/Change-Password" element={<ChangePassword />} />
          </Route>
          
          
          <Route path="*" element={<NotFound/>} />
          <Route path="/denied" element={<Denied/>} />
        </Routes> 
    </>
  )
}

export default App
