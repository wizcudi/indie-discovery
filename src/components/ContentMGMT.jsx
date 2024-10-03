import React, { useState, useEffect } from 'react'
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from '../firebase.js';


export default function ContentMGMT() {
    const [formData, setFormData] = useState({
        name: '',
        img: '',
        link: '',
        website: '',
        instagram: '',
        spotify: '',
        apple: '',
        youtube: '',
        spotlights: [{ type: '', value: '' }]
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        setSuccess(false);  // Clear success message when user starts typing
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
          setImageFile(e.target.files[0]);
          setImagePreview(URL.createObjectURL(e.target.files[0]));
          setSuccess(false);  // Clear success message when user selects a new image
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

        if (!formData.name.trim()) {
            setError("Artist name is required");
            return;
        }

        if (!imageFile) {
            console.error("No image file selected");
            return;
        }

        setIsLoading(true)
        try {

            // Upload image to Firebase Storage
            const storageRef = ref(storage, `artist-images/${imageFile.name}`);
            await uploadBytes(storageRef, imageFile);
            
            // Get the download URL
            const imageUrl = await getDownloadURL(storageRef);

            const docRef = await addDoc(collection(db, "artists"), {
                ...formData,
                img: imageUrl,
                id: Date.now() // Using timestamp as a simple unique ID
            });

            console.log("Document written with ID: ", docRef.id);
            // Reset form or show success message
            setSuccess(true);
            setError(null);
            resetForm();
        } catch (e) {
            console.error("Error adding document: ", e);
            // Show error message
            setError(`Failed to add artist. Error: ${e.message}`);
            setSuccess(false);
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            img: '',
            link: '',
            website: '',
            instagram: '',
            spotify: '',
            apple: '',
            youtube: '',
            spotlights: [{ type: '', value: '' }]
        });
        setImageFile(null);
        setImagePreview(null);
    }
    
    return (
        <div className='w-full'>
            <form
                onSubmit={handleSubmit}
                className='
                    border
                    border-black
                    bg-teal-600
                    py-8
                    px-4
                    flex
                    flex-col
                    gap-4
                    w-full
                    max-w-lg
                    mx-auto
                '
            >
                <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Artist Name"
                    className='
                        px-4
                        py-2
                        border
                        border-black
                    '
                />
                <input
                    name="artistImg"
                    type='file'
                    accept='image/*'
                    onChange={handleImageChange}
                    className='
                        px-4
                        py-2
                        border
                        border-black
                    '
                />
                <input
                    name="link"
                    value={formData.link}
                    onChange={handleChange}
                    placeholder="Artist Link"
                    className='
                        px-4
                        py-2
                        border
                        border-black
                    '
                />
                <input
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="Website"
                    className='
                        px-4
                        py-2
                        border
                        border-black
                    '
                />
                <input
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    placeholder="Instagram"
                    className='
                        px-4
                        py-2
                        border
                        border-black
                    '
                />
                <input
                    name="spotify"
                    value={formData.spotify}
                    onChange={handleChange}
                    placeholder="Spotify"
                    className='
                        px-4
                        py-2
                        border
                        border-black
                    '
                />
                <input
                    name="apple"
                    value={formData.apple}
                    onChange={handleChange}
                    placeholder="Apple Music"
                    className='
                        px-4
                        py-2
                        border
                        border-black
                    '
                />
                <input
                    name="youtube"
                    value={formData.youtube}
                    onChange={handleChange}
                    placeholder="YouTube"
                    className='
                        px-4
                        py-2
                        border
                        border-black
                    '
                />

                {formData.spotlights.map((spotlight, index) => (
                    <div 
                        key={index}
                        className='
                            flex
                            flex-col
                            gap-4
                        '
                    >

                        <div
                            className='
                                flex
                                flex-col
                                gap-2
                            '
                        >
                            <label htmlFor={`spotlight-type-${index}`}>Spotlight Type:</label>
                            <select
                                id={`spotlight-type-${index}`}
                                value={spotlight.type}
                                onChange={(e) => handleSpotlightChange(index, 'type', e.target.value)}
                                className='
                                    p-2
                                    border
                                    border-black
                                '
                            >
                                <option value="">Select type</option>
                                <option value="music">Music</option>
                                <option value="video">Video</option>
                                <option value="event">Event</option>
                            </select>
                        </div>

                        <div
                            className='
                                flex
                                flex-col
                                gap-2
                            '
                        >
                            <label htmlFor={`spotlight-value-${index}`}>Spotlight Value:</label>
                            <input
                                id={`spotlight-value-${index}`}
                                value={spotlight.value}
                                onChange={(e) => handleSpotlightChange(index, 'value', e.target.value)}
                                placeholder="Spotlight Value"
                                className='
                                    p-2
                                    border
                                    border-black
                                '
                            />
                        </div>


                    </div>
                ))}
                <button 
                    type="button" 
                    onClick={addSpotlight}
                    className='
                        border
                        border-black
                        px-4
                        py-2
                        bg-sky-500
                        hover:bg-sky-600
                    '
                >
                    Add Spotlight
                </button>

                <button 
                    type="submit" 
                    disabled={isLoading}
                    className='
                        border
                        border-black
                        px-4
                        py-2
                        bg-orange-600
                        hover:bg-orange-700
                    '
                >
                    {isLoading ? 'Submitting...' : 'Submit'}
                </button>
            </form>

            {imagePreview && (
                <img src={imagePreview} alt="Preview" style={{maxWidth: '200px'}} />
            )}

            {error && <p style={{color: 'red'}}>{error}</p>}
            {success && <p style={{color: 'green'}}>Artist added successfully!</p>}

        </div>
    )
}
