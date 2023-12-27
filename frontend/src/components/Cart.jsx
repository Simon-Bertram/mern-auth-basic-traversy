import productList from '../data/productList.json'

const Cart = () => {
  return ( 
    <div className="cart container mx-auto py-10 mt-10">
      <div className="cart-product mt-12">
        <h1 className='text-3xl'>Items in cart</h1>
        <div className="">
          <h2>Items will appear here</h2>
          <div className="item-info">
            <h4>Product name</h4>
            <p>Product detail</p>
            <button className="btn bg-blue-800 text-white">Remove Item</button>
          </div>
        </div>

        <footer className='mt-20'>
          <button className="btn bg-blue-800 text-white">Checkout</button>
        </footer>
      </div>

      <div className="empty-cart">
        <p>Your cart is empty.</p>
        <p>You have not added any items to your cart yet.</p>
      </div>
    </div>
   )
}
 
export default Cart