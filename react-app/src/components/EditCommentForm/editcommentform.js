import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateCommentThunk } from '../../store/comments';


function EditCommentForm() {

//   const dispatch = useDispatch();
//   const history = useHistory();

//   // console.log('teeeeeeeeeeeeeeeeeeeeeeest', history);

//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [imageUrl, setImageUrl] = useState('');
//   const [productTypeId, setProductTypeId] = useState('');
//   const [errors, setErrors] = useState([]);

//     // console.log('teeeeeeeeeeeeeeeeeeeeeeest', history);
//     // console.log('teeeeeeeeeeeeeeeeeeeeeeest', history.location);

//     // console.log(props.productId, '----------------------------------------------------------')

//     const {pathname} = history.location
//     // console.log('teeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', pathname)
//     // console.log('teeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', pathname.split("/")[2])

//     const singleProductId = pathname.split("/")[2]

//     // console.log(singleProductId, '99999999999999999999999999999999999999999')


//   function reloadPage(){ 
//       window.location.reload(); 
//   }

//   const handleSubmit = (e) => {
//       e.preventDefault();

//       const edittedProduct = {
//           id: props.productId?props.productId:singleProductId,
//           title: title,
//           description: description,
//           imageUrl: imageUrl,
//           productTypeId: productTypeId
//       };

//       // const newItem = await dispatch(addProduct(newProduct));


//       dispatch(editProduct(edittedProduct));
//       // history.push(pathname);

//       history.push(`/myproducts`);

//       // reloadPage()
//       // history.push(`/users/${userId}/`);
//       }
  
  return (
      <>
      <div>MODAL TEST YO</div>
      {/* <form className="edit-form" onSubmit={handleSubmit}>
    <label>
      Title
      <input
        type="title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </label>
    <label>
      Description
      <input
        type="description"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </label>
    <label>
      Image Url
      <input
        type="imageUrl"
        name="imageUrl"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
    </label>
    <label>
      Product Type
      <input
        type="productType"
        name="productType"
        value={productTypeId}
        onChange={(e) => setProductTypeId(e.target.value)}
      />
    </label>
    <button
      type="submit"
      disabled={errors.length > 0}
    >
      Edit your Product!
    </button>
  </form> */}
      </>
  );
}

export default EditCommentForm;