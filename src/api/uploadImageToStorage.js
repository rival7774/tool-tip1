import { getStorage, ref as storageRef, uploadBytes } from 'firebase/storage';

const storage = getStorage();
export const uploadImageToStorage = async (nameImg, fileImg) => {
  try {
    const storageReference = storageRef(storage, `images/${nameImg}`);
    const snapshot = await uploadBytes(storageReference, fileImg);

    return `https://firebasestorage.googleapis.com/v0/b/${snapshot.metadata.bucket}/o/${encodeURIComponent(snapshot.metadata.fullPath)}?alt=media`;
  } catch (e) {
    throw new Error(e);
  }
};
