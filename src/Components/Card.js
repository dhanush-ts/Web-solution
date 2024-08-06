
export const Card = ({pro}) => {
  
    const {image,price,name} = pro;
    console.log(image);

    return (
    <div className='p-2 rounded border max-w-xs text-sm my-3'>
        <div >
            <img src={image} alt={image} className="max-w-full h-[250px]" />
            <p className='mt-5'>{name}</p>
            <div className='flex justify-between my-2'>
                <p className='my-auto'>${price}</p>
                <p className='bg-blue-500 text-slate-100 p-1 rounded'>Add To Cart</p>
            </div>
        </div>
    </div>
  )
}
