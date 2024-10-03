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
            // className='
            //     flex
            //     flex-col
            //     items-center
            //     justify-center
            //     gap-4
            //     border-2
            //     border-red-500
            // '
            className='
                w-full
                flex
                flex-col
                gap-4
            '
        >
            <h1
                className='
                    text-3xl
                    text-center
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
                    w-full
                    max-w-lg
                    mx-auto
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
                    w-full
                    max-w-lg
                    mx-auto
                    mb-6
                    '
                >Edit</button>
            </div>
            
            {add && <ContentMGMT />} 
            {edit && <Edit />}

        </div>
    )
}







