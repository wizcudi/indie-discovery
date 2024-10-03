import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from '../firebase.js';

export default function Edit() {
    const [artists, setArtists] = useState([]);
    const [selectedArtistId, setSelectedArtistId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        img: '',
        link: '',
        website: '',
        instagram: '',
        spotify: '',
        apple: '',
        youtube: '',
        spotlights: []
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const artistsCollection = collection(db, "artists");
                const artistsSnapshot = await getDocs(artistsCollection);
                const artistsList = artistsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    name: doc.data().name
                }));
                setArtists(artistsList);
                setIsLoading(false);
            } catch (err) {
                console.error("Error fetching artists: ", err);
                setError("Failed to load artists. Please try again.");
                setIsLoading(false);
            }
        };

        fetchArtists();
    }, []);

    useEffect(() => {
        if (selectedArtistId) {
            const fetchArtist = async () => {
                try {
                    const docRef = doc(db, "artists", selectedArtistId);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setFormData(docSnap.data());
                        setImagePreview(docSnap.data().img);
                    } else {
                        setError("No such artist!");
                    }
                } catch (e) {
                    console.error("Error fetching artist data: ", e);
                    setError(`Error fetching artist data: ${e.message}`);
                }
            };

            fetchArtist();
        }
    }, [selectedArtistId]);

    const handleArtistSelect = (e) => {
        setSelectedArtistId(e.target.value);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setSuccess(false);
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImageFile(e.target.files[0]);
            setImagePreview(URL.createObjectURL(e.target.files[0]));
            setSuccess(false);
        }
    };

    const handleSpotlightChange = (index, field, value) => {
        const newSpotlights = [...formData.spotlights];
        newSpotlights[index][field] = value;
        setFormData({ ...formData, spotlights: newSpotlights });
    };

    const addSpotlight = () => {
        setFormData({
            ...formData,
            spotlights: [...formData.spotlights, { type: '', value: '' }]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            let imageUrl = formData.img;

            if (imageFile) {
                const storageRef = ref(storage, `artist-images/${imageFile.name}`);
                await uploadBytes(storageRef, imageFile);
                imageUrl = await getDownloadURL(storageRef);
            }

            const artistRef = doc(db, "artists", selectedArtistId);
            await updateDoc(artistRef, {
                ...formData,
                img: imageUrl
            });

            setSuccess(true);
            setError(null);
        } catch (e) {
            console.error("Error updating artist: ", e);
            setError(`Failed to update artist. Error: ${e.message}`);
            setSuccess(false);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <div>Loading artists...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='w-full max-w-lg mx-auto'>
            <select className='border border-black w-full p-2 text-2xl rounded' onChange={handleArtistSelect} value={selectedArtistId || ''}>
                <option value="">Select an artist to edit</option>
                {artists.map(artist => (
                    <option key={artist.id} value={artist.id}>{artist.name}</option>
                ))}
            </select>

            {selectedArtistId && (
                <form onSubmit={handleSubmit} className='border border-black bg-teal-600 py-8 px-4 flex flex-col gap-4 w-full '>
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Artist Name"
                        className='px-4 py-2 border border-black'
                    />
                    <input
                        name="artistImg"
                        type='file'
                        accept='image/*'
                        onChange={handleImageChange}
                        className='px-4 py-2 border border-black'
                    />
                    {imagePreview && (
                        <img src={imagePreview} alt="Preview" style={{maxWidth: '200px'}} />
                    )}
                    <input
                        name="link"
                        value={formData.link}
                        onChange={handleChange}
                        placeholder="Artist Link"
                        className='px-4 py-2 border border-black'
                    />
                    <input
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        placeholder="Website"
                        className='px-4 py-2 border border-black'
                    />
                    <input
                        name="instagram"
                        value={formData.instagram}
                        onChange={handleChange}
                        placeholder="Instagram"
                        className='px-4 py-2 border border-black'
                    />
                    <input
                        name="spotify"
                        value={formData.spotify}
                        onChange={handleChange}
                        placeholder="Spotify"
                        className='px-4 py-2 border border-black'
                    />
                    <input
                        name="apple"
                        value={formData.apple}
                        onChange={handleChange}
                        placeholder="Apple Music"
                        className='px-4 py-2 border border-black'
                    />
                    <input
                        name="youtube"
                        value={formData.youtube}
                        onChange={handleChange}
                        placeholder="YouTube"
                        className='px-4 py-2 border border-black'
                    />

                    {formData.spotlights.map((spotlight, index) => (
                        <div key={index} className='flex flex-col gap-4'>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor={`spotlight-type-${index}`}>Spotlight Type:</label>
                                <select
                                    id={`spotlight-type-${index}`}
                                    value={spotlight.type}
                                    onChange={(e) => handleSpotlightChange(index, 'type', e.target.value)}
                                    className='p-2 border border-black'
                                >
                                    <option value="">Select type</option>
                                    <option value="music">Music</option>
                                    <option value="video">Video</option>
                                    <option value="event">Event</option>
                                </select>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor={`spotlight-value-${index}`}>Spotlight Value:</label>
                                <input
                                    id={`spotlight-value-${index}`}
                                    value={spotlight.value}
                                    onChange={(e) => handleSpotlightChange(index, 'value', e.target.value)}
                                    placeholder="Spotlight Value"
                                    className='p-2 border border-black'
                                />
                            </div>
                        </div>
                    ))}
                    <button 
                        type="button" 
                        onClick={addSpotlight}
                        className='border border-black px-4 py-2 bg-sky-500 hover:bg-sky-600'
                    >
                        Add Spotlight
                    </button>

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className='border border-black px-4 py-2 bg-orange-600 hover:bg-orange-700'
                    >
                        {isLoading ? 'Updating...' : 'Update Artist'}
                    </button>
                    
                </form>
            )}

            {error && <p style={{color: 'red'}}>{error}</p>}
            {success && <p style={{color: 'green'}}>Artist updated successfully!</p>}
        </div>
    );
}