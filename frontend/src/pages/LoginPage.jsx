import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('TODO: form submission logic')
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
            {loading ? 'Loading' : 'Login'}
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


