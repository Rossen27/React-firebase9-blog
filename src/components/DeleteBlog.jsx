import { deleteDoc, doc } from 'firebase/firestore';
import React from 'react';
import { db, storage } from '../firebaseConfig'
import { toast } from "react-toastify";
import { deleteObject,ref } from 'firebase/storage';

export default function DeleteBlog({id, imageUrl}) {
  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "Blogs", id))
      toast('Blog delete successful!', { type: 'success' })
      const storageRef = ref(storage, imageUrl)
      await deleteObject(storageRef)

    } catch (error) {
      toast('Error deleting blog', { type: 'error' })
      console.log(error)
    }

  }
  return (
    <div>
      <button className='btnb btn-danger' onClick={handleDelete}>
        Delete
      </button>
    </div>
  )
}