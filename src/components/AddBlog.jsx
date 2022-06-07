import React, { useState } from 'react'
import { Timestamp, collection, addDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage, db } from './../firebaseConfig';
import { toast } from "react-toastify";

export default function AddBlog() {
  const [fromDate, setFromDate] = useState({
    title: '',
    description: '',
    image: '',
    createdAt: Timestamp.now().toDate(),
  });

  const [progress, setPrgress] = useState(0);

  const handleChange = (e) => {
    setFromDate({ ...fromDate, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFromDate({ ...fromDate, image: e.target.files[0] });
  };

  const handlePublish = () => {
    if (!fromDate.title || !fromDate.description || !fromDate.image) {
      alert('Please fill all the fields');
      return;
    }
    const storageRef = ref(storage, `/images/${Date.now()}${fromDate.image.name}`);

    const uploadImage = uploadBytesResumable(storageRef, fromDate.image)

    uploadImage.on("state_changed", (snapshot) => {
      const progressPercent = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setPrgress(progressPercent);
    },
      (err) => {
        console.log(err);
      },
      () => {
        setFromDate({
          title: '',
          description: '',
          image: '',
        });

        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          const blogRef = collection(db, 'Blogs');
          addDoc(blogRef, {
            title: fromDate.title,
            description: fromDate.description,
            imageUrl: url,
            createdAt: Timestamp.now().toDate(),
          })
            .then(() => {
              toast('Article added successfully', { type: 'success' });
              setPrgress(0);
            })
            .catch(err => {
              toast('Error adding blog', { type: 'Error' });
            });
        });
      }
    );
  };

  return (
    <div className='border p-3 mt-3 bg-light' style={{ position: "fixed" }}>
      <h2>Create a new blog</h2>
      <div className="form-group">
        <label htmlFor="">Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={fromDate.title}
          onChange={(e) => handleChange(e)}
        />
      </div>

      {/*description*/}
      <label htmlFor="">Description</label>
      <textarea
        name='description'
        className='form-control'
        value={fromDate.description}
        onChange={(e) => handleChange(e)}
      />

      {/* image */}
      <label htmlFor="">Image</label>
      <input
        type="file"
        name="image"
        className="form-control"
        accept="image/*"
        onChange={(e) => handleImageChange(e)}
      />

      {progress === 0 ? null : (
        <div className="progress">
          <div className="progress-bar progress-bar-striped mt-2" style={{ width: `${progress}%` }}>
            {`uploing image ${progress}%`}
          </div>
        </div>
      )}

      <button className='form-control btn-primary mt-2' onClick={handlePublish}>Publish</button>
    </div>
  )
}
