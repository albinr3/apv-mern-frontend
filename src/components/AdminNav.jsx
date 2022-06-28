import { Link } from "react-router-dom"

function AdminNav() {
  return (
    <nav className="flex gap-5">
        <Link className="font-bold uppercase text-gray-500" to="/admin/profile">Profile</Link>
        <Link className="font-bold uppercase text-gray-500" to="/admin/change-password">Change your Password</Link>
    </nav>
  )
}

export default AdminNav