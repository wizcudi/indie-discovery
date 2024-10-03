import React from 'react'
import Search from './Search'

export default function Home() {
    return (
        <div className='
            mt-16
            flex
            flex-col
            items-center
            gap-y-6
        '>
            <h1 className="
                font-bold
                text-6xl
                text-center
            ">
                Indie Discovery
            </h1>
            <p className='
                text-3xl
                text-center
                max-xs:text-2xl
            '>
                Feels like the 
                <span className='
                    ml-2
                    text-blue-600 
                    italic 
                    font-bold
                    uppercase
                '>
                    Blog Era
                </span>
            </p>

            <Search />

        </div>
    )
}
