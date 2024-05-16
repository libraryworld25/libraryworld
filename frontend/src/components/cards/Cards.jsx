import React from 'react'

const Cards = ({title1, title2, title3}) => {
    return (
        <>
            <div className='md:w-[90%] *:text-black flex flex-col md:flex-row flex-nowrap justify-evenly items-center *:text-justify m-auto text-xl rounded-3xl p-3 gap-5 mb-8'>
                <div className='rounded-2xl w-5/6 md:w-1/4 flex flex-col gap-5 bg-gray-200 p-5 '>
                    <img className='w-4/6 md:w-2/6 m-auto' src="/images/book.png" alt="book" />
                    <h3 className='text-xl md:text-3xl font-bold '>{title1}</h3>
                    <p className='text-sm md:text-md font-semibold text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid delectus saepe obcaecati, rem necessitatibus quasi at dignissimos hic doloribus fugit quae facere eveniet molestias quia quibusdam accusamus nihil porro qui.</p>
                    <button className='bg-gray-400 font-bold text-lg p-3 shadow-md hover:bg-black hover:shadow-xl transition-all text-white'>Check out</button>
                </div>
                <div className='rounded-xl w-5/6 md:w-1/4 flex flex-col gap-5 bg-gray-200 p-5 '>
                    <img className='w-4/6 md:w-2/6 m-auto' src="/images/book.png" alt="book" />
                    <h3 className='text-xl md:text-3xl font-bold '>{title2}</h3>
                    <p className='text-sm md:text-md font-semibold text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid delectus saepe obcaecati, rem necessitatibus quasi at dignissimos hic doloribus fugit quae facere eveniet molestias quia quibusdam accusamus nihil porro qui.</p>
                    <button className='bg-gray-400 font-bold text-lg p-3 shadow-md hover:bg-black hover:shadow-xl transition-all  text-white'>Check out</button>
                </div>
                <div className='rounded-xl w-5/6 md:w-1/4 flex flex-col gap-5 bg-gray-200 p-5 '>
                    <img className='w-4/6 md:w-2/6 m-auto' src="/images/book.png" alt="book" />
                    <h3 className='text-xl md:text-3xl font-bold '>{title3}</h3>
                    <p className='text-sm md:text-md font-semibold text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid delectus saepe obcaecati, rem necessitatibus quasi at dignissimos hic doloribus fugit quae facere eveniet molestias quia quibusdam accusamus nihil porro qui.</p>
                    <button className='bg-gray-400 font-bold text-lg p-3 shadow-md hover:bg-black hover:shadow-xl transition-all  text-white'>Check out</button>
                </div>
            </div>
        </>
    )
}

export default Cards