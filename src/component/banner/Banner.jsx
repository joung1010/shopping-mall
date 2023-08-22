import React from 'react';

function Banner(props) {
    return (
        <section className='h-96 bg-yellow-900 relative'>
            <div className='w-full h-full bg-cover bg-center bg-banner opacity-80'>

            </div>
            <div className='absolute w-full top-32 text-center text-gray-50 drop-shadow-2xl'>
                <h2 className='text-6xl'>Always New</h2>
                <h2 className='text-2xl mt-2'>Best Quality, Best Choice</h2>
            </div>
        </section>
    );
}

export default Banner;