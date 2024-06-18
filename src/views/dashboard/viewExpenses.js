import React, { useContext } from 'react'
import { AuthContext } from '../../context/authContext'
import { useNavigate } from 'react-router-dom'

const ViewExpenses = () => {
  const { user, logOut } = useContext(AuthContext)
  const navigate = useNavigate()
  const handleLogOut = async () => {
    await logOut().then(() => navigate("/auth"))
  }
  return (
    <>
      <div>Hello {user?.displayName}</div>
      <button onClick={handleLogOut}>Logout</button>
    </>
  )
}

export default ViewExpenses