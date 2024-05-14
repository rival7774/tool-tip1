import { ref as storageRef, deleteObject } from 'firebase/storage';
import { getStorage } from 'firebase/storage';

const storage = getStorage();

export const deleteImageToStorageRequest = async (nameImg) => {
  const imageRef = storageRef(storage, `images/${nameImg}`);
  try {
    await deleteObject(imageRef);
  }catch (e){
    throw new Error(e);
  }
}
