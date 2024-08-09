import React from 'react';
import { Link, usePage } from '@inertiajs/react';

const List = ({ announcements, auth }) => {
  const { props } = usePage();
  const { data, links, current_page } = props.announcements;

  const baseURL = 'http://localhost/storage/';

  return (
    <div className="flex justify-center bg-gray-100 min-h-screen py-10">
      <div className="w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-8 text-center">Announcements</h2>
        <div className="space-y-6 overflow-y-auto max-h-screen" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {data.map((announcement) => (
            <div key={announcement.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              {announcement.image_path ? (
                <div className="flex justify-center">
                   <img
                      src={`${baseURL}${announcement.image_path}`}
                      alt={announcement.title}
                      className="w-full h-48 object-cover"
                    />
                </div>
              ) : null}
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{announcement.title}</h3>
                <p className="text-gray-700 mb-4">{announcement.content}</p>
                <p className="text-lg font-extrabold text-gray-700 mb-4">
                  POSTED: <span className="font-normal text-gray-600">{announcement.created_at}</span>
                </p>
                <div className="flex justify-between items-center">
                  <Link
                    href={`/announcements/${announcement.id}`}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                  >
                    Show Announcement
                  </Link>
                  {auth.user.isAdmin ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(announcement.id)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(announcement.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          {links.map((link, index) => (
            <button
              key={index}
              onClick={() => window.location.href = link.url}
              className={`mx-1 px-3 py-1 rounded ${current_page === link.label ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
              dangerouslySetInnerHTML={{ __html: link.label }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const handleEdit = (id) => {
  console.log(`Edit announcement with ID: ${id}`);
};

const handleDelete = (id) => {
  console.log(`Delete announcement with ID: ${id}`);
};

export default List;
