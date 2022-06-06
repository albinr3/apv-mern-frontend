import { Outlet } from "react-router-dom"

const Authlayout = () => {
  return (
    <>
      <main className="w-11/12 mx-auto md:grid md:grid-cols-2 mt-8">
        < Outlet />
      </main>
    </>
  )
}

export default Authlayout