import React from 'react'
import Search from './Search'

export default function Home() {
    return (
        <div className='
            flex
            flex-col
            items-center
            gap-y-6
            p-6
            max-xs:px-2
        '>
            <h1 className="
                 
                font-bold
                text-center

                max-[500px]:text-5xl
                text-6xl
            ">
                Indie Discovery
            </h1>
            <p className='
                max-[500px]:text-2xl
                text-4xl
                text-center
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
