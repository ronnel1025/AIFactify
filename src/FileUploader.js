// FileUploader.js
import React, { useState } from 'react';

const FileUploader = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'audio/mpeg', 'audio/wav', 'video/mp4'];
  const maxSize = 5 * 1024 * 1024; // 5MB max size

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];

    if (uploadedFile) {
      if (!allowedTypes.includes(uploadedFile.type)) {
        setError('Invalid file type. Please upload an image, audio, or video file.');
        return;
      }

      if (uploadedFile.size > maxSize) {
        setError('File is too large. Max size is 5MB.');
        return;
      }

      setError('');
      setFile(uploadedFile);
      onFileUpload(uploadedFile);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {error && <div className="error">{error}</div>}
      {file && <div>File selected: {file.name}</div>}
    </div>
  );
};

export default FileUploader;
