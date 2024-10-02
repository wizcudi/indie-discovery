import React, { useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase.js';
import Card from './Card';

export default function Search() {
    const [search, setSearch] = useState('');
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!search.trim()) return;

        setLoading(true);
        setError(null);
        setHasSearched(true);

        try {
            const artistsRef = collection(db, "artists");
            const querySnapshot = await getDocs(artistsRef);
            
            const searchTerm = search.trim().toLowerCase();
            const artistsData = querySnapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .filter(artist => artist.name.toLowerCase() === searchTerm);
            
            setArtists(artistsData);
        } catch (err) {
            console.error("Error fetching artists: ", err);
            setError("An error occurred while fetching artists. Please try again.");
        } finally {
            setLoading(false);
        }
    }



    return (
        <div 
            className='
                flex
                flex-col
                items-center
                gap-y-6
                w-full
            '
        >
            <form 
                className='
                    w-full
                    border-b-2
                    border-blue-600
                '
                onSubmit={handleSubmit}
            >
                <div 
                    className='
                        w-full
                        flex 
                        items-center 
                        py-2
                    '
                >
                    <input 
                        name='talent'
                        className="
                            flex-grow 
                            text-gray-700 
                            mr-3 
                            py-1 
                            px-2 
                            outline-none
                            focus:outline-none
                            autofill:bg-slate-200
                            bg-slate-200
                            transition-all
                        " 
                        type="text"
                        placeholder='Search by Name or ID' 
                        onChange={handleChange} 
                        value={search}
                        autoComplete="off"
                    />
                    <button 
                        type='submit' 
                        className='
                            text-white 
                            py-2 
                            px-4
                            rounded
                            bg-blue-600
                            hover:bg-blue-500
                            whitespace-nowrap
                        '
                    >
                        Search
                    </button>
                </div>
            </form>

            <div>
                {artists.map(artist => (
                    <Card key={artist.id} artist={artist} />
                ))}
                {hasSearched && artists.length === 0 && !loading && !error && (
                    <p className="text-center text-gray-700">No artists found. Try a different search term.</p>
                )}
            </div>
        </div>
    )
}
