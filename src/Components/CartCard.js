import img from "../asserts/go.png"

export const CartCard = () => {
  return (
    <div className="max-w-6-xl">
        <div className="m-auto border w-full flex justify-between">
            <img src={img} className="ml-4 w-20 p-2" alt="" />
            <p className="my-auto text-sm">Sony Wh-Ch510 Bluetooth Wireless</p>
            <p className="my-auto text-sm">$149</p>
            <p className="w-fit h-fit text-xs mr-4 my-auto bg-red-400 text-slate-100 rounded p-2">Remove</p>
        </div>
    </div>
  )
}
