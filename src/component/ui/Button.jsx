import React from 'react';

function Button({text,onClick}) {
    return (
            <button
                onClick={onClick}
                className='bg-brand text-white py-2 px-4 rounded-sm hover:brightness-110'
            >
                {text}
            </button>
    );
}

export default Button;