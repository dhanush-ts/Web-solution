import { CartCard } from "../Components/CartCard"

export const Cart = () => {
  return (
    <div className='max-w-5xl mx-auto'>
      <div className="flex">
        <strong className='my-8 m-auto'>Cart Items : 2</strong>
      </div>
      <div >
        <CartCard />
      </div>
    </div>
  )
}
