// import React from 'react';
// import { db, storage } from './Firebase/firebase';
// import { collection, addDoc } from 'firebase/firestore';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import andrachillipowder from '../assets/pic6.webp';
// import keralacoconut from '../assets/pic7.webp';
// import tamilian from '../assets/pic8.webp';
// import karnatagarlic from '../assets/pic9.webp';


// const products = [
//   {
//     name: 'Andhra Chilli Paste',
//     weight: '250g',
//     description: 'Fiery and aromatic paste capturing the essence of Andhra cuisine.',
//     price: '₹1074.62',
//     originalPrice: '₹1299.00',
//     image: andrachillipowder,
//     rating: 4.5,
//     spicyLevel: 5,
//     tag: 'Bestseller',
//     icon: 'fire'
//   },
//   {
//     name: 'Kerala Coconut Curry Paste',
//     weight: '250g',
//     description: 'Creamy paste infused with fresh coconut and Kerala spices.',
//     price: '₹1241.78',
//     image: keralacoconut,
//     rating: 4.8,
//     spicyLevel: 2,
//     tag: 'Premium',
//     icon: 'leaf'
//   },
//   {
//     name: 'Tamilian Tamarind Paste',
//     weight: '100g',
//     description: 'Tangy and savory tamarind paste, a Tamil Nadu staple.',
//     price: '₹400.00',
//     originalPrice: '₹499.00',
//     image: tamilian,
//     rating: 4.2,
//     spicyLevel: 1,
//     tag: 'New',
//     icon: 'pepper'
//   },
//   {
//     name: 'Karnataka Garlic-Ginger Paste',
//     weight: '100g',
//     description: 'Aromatic garlic and ginger blend from Karnataka.',
//     price: '₹430.00',
//     image: karnatagarlic,
//     rating: 4.3,
//     spicyLevel: 3,
//     tag: 'Organic',
//     icon: 'seedling'
//   }
// ];

// const ProductUploader = () => {
//   const handleUpload = async () => {
//     try {
//       for (const product of products) {
//         const response = await fetch(product.image);
//         const blob = await response.blob();

//         const imageRef = ref(storage, `productImages/${product.name.replace(/\s+/g, '_')}.png`);
//         await uploadBytes(imageRef, blob);

//         const downloadURL = await getDownloadURL(imageRef);

//         await addDoc(collection(db, 'products'), {
//           ...product,
//           image: downloadURL,
//           createdAt: new Date()
//         });
//       }

//       alert('All products uploaded successfully with images.');
//     } catch (error) {
//       console.error('Error uploading products:', error);
//       alert('Upload failed. Check console for details.');
//     }
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Upload Products to Firebase</h2>
//       <button onClick={handleUpload}>Save Products with Images</button>
//     </div>
//   );
// };

// export default ProductUploader;
