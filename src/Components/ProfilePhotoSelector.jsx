import { HardDriveUpload, Trash2, User } from "lucide-react";
import { useRef, useState } from "react";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);

      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImages = (e) => {
    e.preventDefault();
    setImage(null);
    setPreviewUrl(null);
  };

  //   to open file explorer to browse the image from device
  const onChooseFile = (e) => {
    e.preventDefault();
    inputRef.current?.click();
  };
  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="images/**"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />
      {!image ? (
        <div className="w-20 h-20 flex items-center justify-center bg-slate-500/10 rounded-full relative">
          <User className="text-black" size={35} />
          <button
            onClick={onChooseFile}
            className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1"
          >
            <HardDriveUpload size={15} className="text-black cursor-pointer" />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={previewUrl}
            alt="profile Photo"
            className="w-20 h-20 rounded-full object-cover"
          />
          <button className="w-8 h-8 flex items-center justify-center bg-red-700/30 text-white rounded-full absolute -bottom-1 -right-1">
            <Trash2
              size={15}
              onClick={handleRemoveImages}
              className="text-black cursor-pointer"
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
