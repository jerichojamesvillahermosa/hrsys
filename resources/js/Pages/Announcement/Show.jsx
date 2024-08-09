import React from 'react';
const Show = ({ announcement }) => {
    const { title, content, image_path } = announcement;
    const baseURL = 'http://localhost/storage/';
    const imageUrl = image_path ? `${baseURL}${image_path}` : '';

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg border border-slate-300 mt-10">
            <h1 className="text-2xl  font-bold text-center mb-6">Announcement</h1>
            <div>
                <h1 className="text-2xl font-bold mb-2">Title</h1>
                <h1 className="mb-1">{title}</h1>
                <h1 className="text-2xl font-bold mb-2">Content</h1>
                <p className="mb-1">{content}</p>
                <h1 className="text-2xl font-bold mb-2">Image</h1>
                {imageUrl && (
                    <img className="mb-1" src={imageUrl} alt={title} />
                )}
            </div>
        </div>
    );
};

export default Show;
