import React from "react";

import Dropzone from "react-dropzone";

export default function ImagesDropzone({ onDrop }) {
  const handleDrop = acceptedFiles =>{
    return onDrop(acceptedFiles)
  }

  return (
      <Dropzone
        onDrop={handleDrop}
      >
        {({ getRootProps, getInputProps }) => (
          <div 
          {...getRootProps({ className: "dropzone" })}
          style={{
            textAlign: 'center',
            maxWidth: '100%',
            minWidth: '100%',
            padding: '20px',
            border: '3px',
            backgroundColor: '#fafafa',
            color: 'black',
            marginBottom: '20px'
          }}
          >
            <input {...getInputProps()} />
            <p style={{color: 'black'}}>Drag'n'drop images, or click to select files</p>
          </div>
        )}
      </Dropzone>
  );
}