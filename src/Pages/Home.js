import { Card } from "../Components/Card"

export const Home = () => {
    
  const products = [
    {"id": 1, "name": "Sony Wh-Ch510 Bluetooth Wireless", "price": 149, "image": "/asserts/1001.png"},
    {"id": 2, "name": "boAt Rockerz 450", "price": 49, "image": "/asserts/1002.png"},
    {"id": 3, "name": "JBL Tune 760NC", "price": 179, "image": "/asserts/1003.png"},
    {"id": 4, "name": "Logitech H111 Wired", "price": 39, "image": "/asserts/1004.png"},
    {"id": 5, "name": "APPLE Airpods Max Bluetooth Headset", "price": 199, "image": "/asserts/1005.png"},
    {"id": 6, "name": "ZEBRONICS Zeb-Thunder Wired", "price": 29, "image": "/asserts/1006.png"}
  ]
  return (
    <div className="max-w-5xl m-auto flex justify-between flex-wrap">
        {products.map(pro => (
            <Card key={pro.id} pro={pro} />
        ))}
    </div>
  )
}
