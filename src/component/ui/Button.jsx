import React from 'react';

function Button({text,onClick,isLoading}) {
    return (
        <div className='bg-brand text-white p-2 rounded-sm hover:brightness-110 w-32 text-center'>
            {isLoading && <div className='fixed opacity-75 animate-spin mx-1 w-6 h-6 border-[3px] border-current border-t-transparent text-gray-800 rounded-full dark:text-white'/>}
            <button onClick={onClick} className='w-full h-full'>{text}</button>
        </div>

    );
}

export default Button;