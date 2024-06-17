import React, { useState } from "react";

interface Avatar {
  id: number;
  name: string;
  image: string;
}

interface CustomDropdownProps {
  avatars: Avatar[];
  selectedAvatar: Avatar | null;
  setSelectedAvatar: (avatar: Avatar) => void;
  title: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  avatars,
  selectedAvatar,
  setSelectedAvatar,
  title,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative md:w-3/4">
      <h1 className="font-heading text-base text-black md:text-xl mb-4">
        {title}
      </h1>
      <button
        type="button"
        onClick={toggleDropdown}
        className="w-full bg-white text-black font-body rounded-lg shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none border-2 border-black md:text-lg text-base"
      >
        {selectedAvatar ? (
          <div className="flex items-center">
            <img
              src={selectedAvatar.image}
              alt={selectedAvatar.name}
              className="w-6 h-6 rounded-full mr-3"
            />
            <span>{selectedAvatar.name}</span>
          </div>
        ) : (
          <span className="font-body text-gray-400">Select one</span>
        )}
      </button>
      {isOpen && (
        <ul className="absolute mt-1 w-full bg-white font-body text-black shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none md:text-lg">
          {avatars.map((avatar) => (
            <li
              key={avatar.id}
              onClick={() => {
                setSelectedAvatar(avatar);
                setIsOpen(false);
              }}
              className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-black hover:text-white"
            >
              <div className="flex items-center">
                <img
                  src={avatar.image}
                  alt={avatar.name}
                  className="w-6 h-6 rounded-full mr-3"
                />
                <span className="font-normal">{avatar.name}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
