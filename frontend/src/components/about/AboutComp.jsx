import React from 'react'

const AboutComp = () => {
    return (
        <>
            <h2 className=' w-4/5 m-auto text-4xl font-extrabold tracking-wider'>About Us</h2>
            <hr className='w-4/5 m-auto border-b-2 border-white my-6' />
            <div className='flex w-[90%] md:w-[80%] m-auto flex-col-reverse md:flex-row flex-nowrap gap-1 justify-around items-center'>
                <p className='w-[80%] md:w-[40%] m-auto text-justify text-xl '>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias quis obcaecati ducimus suscipit, sint debitis quo numquam explicabo at fugit voluptate in quibusdam, voluptates, nam aspernatur vero cum quam neque iste doloremque. Voluptas neque consequatur illum voluptates nostrum aperiam. Quidem distinctio laborum labore, explicabo fuga nihil repudiandae dolor ipsam. Minus, iste.
                </p>
                <img className='w-[80%] md:w-[50%] h-2/5 m-auto rounded-xl ' src="/images/aboutbooks.png" alt="about" />
            </div>
        </>
    )
}

export default AboutComp