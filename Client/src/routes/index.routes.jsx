import { createBrowserRouter } from "react-router-dom"
import Register from "../components/Register"

const router = createBrowserRouter([
    // {
    //     path: "/",
    //     element: ,
    // },
    {

        
        path: "/SampleRegister",
        element: <Register />,
    },
])

export default router