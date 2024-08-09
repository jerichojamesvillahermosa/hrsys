// resources/js/Pages/Announcement/Show.jsx
import React from 'react';
import { Inertia } from '@inertiajs/inertia';

const Show = ({ announcement }) => {
    const { title, content, image_path } = announcement;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            <h1 className="text-2xl font-bold mb-6">Create Announcement</h1>
            <div>
                <h1>{title}</h1>
                <p>{content}</p>
                {image_path && (
                    <img src={`/storage/${image_path}`} alt={title} />
                )}
                <button onClick={() => Inertia.visit(route('announcement.edit', announcement.id))}>
                    Edit
                </button>
            </div>
        </div>
    );
};

export default Show;
