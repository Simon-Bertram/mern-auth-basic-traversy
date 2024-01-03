import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useUpdateUserMutation } from '../redux/slices/usersApiSlice'
import { setCredentials } from '../redux/slices/authSlice'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import Loader from '../components/Loader'

const UserProfilePage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.auth)

  const [updateUser, { isLoading }] = useUpdateUserMutation()

  useEffect(() => {
    setName(userInfo.name)
    setEmail(userInfo.email)
  }, [userInfo.setName, userInfo.setEmail])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    } else {
      try {
        const res = await updateUser({ name, email, password }).unwrap()
        dispatch(setCredentials({...res}))
        toast.success('User profile updated successfully')
        navigate('/')
      } catch (error) {
        toast.error(error?.data?.message || error.error)
      }
    }
  }

  return ( 
    <div className="container mx-auto mt-20">
      <div className="max-w-lg border mx-auto p-6 text-center"> {/* Update dialogue box */}
      <h1 className="text-2xl font-semibold my-7">Update your user profile</h1>
        <form onSubmit={handleSubmit} className="flex flex-col justify-center">
            <label htmlFor="name_field" className='self-start mb-2'>Username</label>
            <input 
              type="text" 
              id="name_field" 
              className="border p-3 rounded-lg mb-4"
              placeholder="Username (visible to other users)" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="email_field" className='self-start mb-2'>Email</label>
            <input 
              type="email" 
              id="email_field" 
              className="border p-3 rounded-lg mb-4"
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
  
            <input 
              type="password" 
              id="password_field" 
              className="border p-3 rounded-lg mb-4"
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input 
              type="password" 
              id="confirm_password_field" 
              className="border p-3 rounded-lg mb-8"
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