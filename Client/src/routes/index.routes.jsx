import { createBrowserRouter } from "react-router-dom"
import Register from "../components/Register"
import SearchFeature from "../components/SearchFeature"

const router = createBrowserRouter([
    {
        path: "/",
        element:<SearchFeature /> ,
    },
    {

        
        path: "/SampleRegister",
        element: <Register />,
    },
])

export default router