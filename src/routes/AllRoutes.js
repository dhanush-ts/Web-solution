import { Routes,Route } from "react-router-dom"
import { Home } from "../Pages/Home"
import { SignIn } from "../Pages/SignIn"
import { Subject } from "../Pages/Subject"

export const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="home" element={<Home />} />
        <Route path="home/:id" element={<Subject />} />
    </Routes>
  )
}
