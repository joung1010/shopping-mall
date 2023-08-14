import React from 'react';

function User({user:{photoURL,email,displayName}}) {
    return (
        <div className='flex items-center gap-2 text-m'>
            <img src={photoURL} alt={displayName} className='rounded-full w-10 h-10'/>
            <span className='hidden md:block'>{displayName}</span>
        </div>
    );
}

export default User;