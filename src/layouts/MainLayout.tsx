import { Outlet } from "react-router-dom"
import NavBar from "../components/NavBar"

export default function MainLayout() {
  return (
    <div className="min-h-dvh bg-[#edf1f5]">
      <NavBar />
      <Outlet />
    </div>
  )
}