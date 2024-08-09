import axios from 'axios';
import React, { useState } from 'react'

function Create() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await axios.post('/announcement', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSuccessMessage(response.data.message);
            setErrors({});
            setTitle('');
            setContent('');
            setImage(null);
            setImagePreview(null);
        } catch (error) {
            if (error.response && error.response.data.errors){
                setErrors(error.response.data.errors);
            } else {
                console.error('Error creating announcement:', error);
            }
        }
    };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            <h1 className="text-2xl font-bold mb-6">Create Announcement</h1>
            {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Title</label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Enter title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-40 p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    {errors.title && <p className="text-red-600 mt-2">{errors.title[0]}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="image-upload" className="block text-gray-700 font-medium mb-2">Upload Image</label>
                    <input
                        type="file"
                        id="image-upload"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                    />
                    <label htmlFor="image-upload" className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white font-semibold text-sm rounded-md cursor-pointer">
                        Upload Image
                    </label>
                    {image && (
                        <div className="mt-2">
                            <p className="text-gray-700">Selected file: {image.name}</p>
                            <img src={imagePreview} alt="Preview" className="mt-2 w-full max-h-64 object-cover rounded-md shadow-sm" />
                        </div>
                    )}
                    {errors.image && <p className="text-red-600 mt-2">{errors.image[0]}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="content" className="block text-gray-700 font-medium mb-2">Content</label>
                    <textarea
                        id="content"
                        placeholder="Enter content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows="4"
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    {errors.content && <p className="text-red-600 mt-2">{errors.content[0]}</p>}
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Create Announcement
                </button>
            </form>
    </div>
  );
}

export default Create
