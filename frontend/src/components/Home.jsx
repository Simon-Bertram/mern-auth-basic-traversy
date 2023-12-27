import productList from '../data/productList.json'

const Home = () => {
  return ( 
    <div className="container mx-auto">
      <div className='grid grid-cols-3 gap-8'>
        {productList.products.map((product) => (
          <div key={product.id} className="card h-96 border-4 mb-8">
            <div className='card h-60 flex flex-col gap-12 py-10'>
              <div className='mx-auto'>
                <img src={product.imageUrl} alt="" className='h-40 w-40 object-scale-down' />
              </div>
              <div className='text-center'>
                <h5>{product.name}</h5>
                <p>£{product.price}</p>
                <button className='btn bg-blue-800 text-white mt-4'>Add to cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
   );
}
 
export default Home;