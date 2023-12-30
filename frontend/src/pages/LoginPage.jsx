import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../redux/slices/usersApiSlice'
import { setCredentials } from '../redux/slices/authSlice'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loader from '../components/Loader'

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [login, { isLoading }] = useLoginMutation()

  const { userInfo } = useSelector((state) => state.auth)

  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [navigate, userInfo])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await login(formData).unwrap()
      dispatch(setCredentials({...res}))
      navigate('/')
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

  return ( 
    <div className="container mx-auto mt-20">
      <div className="max-w-lg border mx-auto p-6 text-center"> {/* login dialogue box */}
        <h1 className="text-2xl font-semibold my-7">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-4">
          <input 
            onChange={handleChange}
            type="email" 
            placeholder="Email" 
            className="border p-3 rounded-lg"  
            id="email"
          />
          <input 
            onChange={handleChange}
            type="password" 
            placeholder="Password" 
            className="border p-3 rounded-lg"  
            id="password"
          />
          <button 
            disabled={loading}
            className="bg-blue-800 text-white p-3 rounded-lg uppercase hover:opacity-80 disabled:opacity-50"
          >
            {loading ? <Loader /> : 'Login'}
          </button>
        </form>
        <div className='mt-5'>
          <p>Don't have an account?</p>
          <Link to='/register' className='text-green-700 hover:underline'>
            <span>Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
   );
}
 
export default Login;


