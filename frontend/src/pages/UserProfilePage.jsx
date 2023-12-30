import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import { set } from 'mongoose';

const UserProfilePage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.auth)

  useEffect(() => {
    setName(userInfo.name)
    setEmail(userInfo.email)
  }, [userInfo.setName, userInfo.setEmail])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('TODO: register form submission logic')
  }

  return ( 
    <div className="container mx-auto mt-20">
      <div className="max-w-lg border mx-auto p-6 text-center"> {/* Update dialogue box */}
      <h1 className="text-2xl font-semibold my-7">Update your user profile</h1>
        <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-4">
            <input 
              type="text" 
              id="name_field" 
              className="border p-3 rounded-lg"
              placeholder="Username (visible to other users)" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input 
              type="email" 
              id="email_field" 
              className="border p-3 rounded-lg"
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
  
            <input 
              type="password" 
              id="password_field" 
              className="border p-3 rounded-lg"
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input 
              type="password" 
              id="confirm_password_field" 
              className="border p-3 rounded-lg"
              placeholder="Confirm Password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

          <button 
            id="register_button" 
            type="submit" 
            className="btn bg-blue-800 text-white py-3 text-uppercase"
          >
            Update
          </button>
            <ToastContainer />
        </form>
      </div>
      
    </div>
   );
}
 
export default UserProfilePage;