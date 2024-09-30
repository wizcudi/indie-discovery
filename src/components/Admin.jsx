import React, { useState } from 'react'
import ContentMGMT from './ContentMGMT'
import Edit from './Edit'

export default function Admin() {
    const [add, setAdd] = useState(false)
    const [edit, setEdit] = useState(false)


    const handleAdd = (artistId) => {
        setAdd(!add)

    }

    const handleEdit = () => {
        setEdit(!edit)
    }

    return (
        <div 
            className='
                flex
                flex-col
                items-center
                justify-center
                gap-4
            '
        >
            <h1
                className='
                    text-3xl
                '
            >
                Welcome Back
            </h1>

            <div
                className='
                    flex
                    flex-col
                    gap-4
                '
            >
                <button 
                    onClick={handleAdd}
                    className='
                    border-2 
                    border-black 
                    px-12 py-2 
                    rounded 
                    bg-green-500
                    text-xl
                    hover:bg-green-700
                    hover:text-white
                    '
                    
                >Add</button>
                <button
                    onClick={handleEdit}
                    className='
                    border-2 
                    border-black 
                    px-12 py-2 
                    rounded 
                    bg-green-500
                    text-xl
                    hover:bg-green-700
                    hover:text-white
                    '
                >Edit</button>
            </div>
            
            {add && <ContentMGMT />} 
            {edit && <Edit />}

        </div>
    )
}







