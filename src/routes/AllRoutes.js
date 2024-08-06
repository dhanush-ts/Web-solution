import { Routes,Route } from "react-router-dom"
import { Home } from "../Pages/Home"
import { Cart } from "../Pages/Cart"
import { SignIn } from "../Pages/SignIn"

export const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="home" element={<Home />} />
        <Route path="cart" element={<Cart />} />
    </Routes>
  )
}
