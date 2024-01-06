const PassportLoginPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('submit')
  }

  return ( 
    <div className="container mx-auto mt-20">
      <div className="max-w-lg border mx-auto p-6 text-center">
        <h1 className="text-2xl font-semibold my-7">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-4">
          <button className="bg-blue-800 text-white p-3 rounded-lg uppercase hover:opacity-80 disabled:opacity-50">
            Email and Password
          </button>
          <button className="bg-blue-800 text-white p-3 rounded-lg uppercase hover:opacity-80 disabled:opacity-50">
            Google
          </button>
          <button> 
           <div 
            class="fb-login-button" 
            data-width="200px" 
            data-size="" 
            data-button-type="" 
            data-layout="" 
            data-auto-logout-link="false" 
            data-use-continue-as="false">
           </div>
          </button>
        </form>
      </div>
    </div>
   );
}
 
export default PassportLoginPage;