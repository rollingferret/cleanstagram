import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getCommentByIdThunk } from '../../store/comments';
import { NavLink } from 'react-router-dom';


function GetAllCommentsForSinglePhoto() {

    const dispatch = useDispatch();
    const history = useHistory();

    // const { productId } = useParams();
    // console.log('teeeeeeeeeeeeeeeeeeeeeeest', history);
    // const product = useSelector(state => state?.product?.product)
    
    const commentList = useSelector(state => {
        return state.comments;
    });

    // console.log(commentList, '9999999999999999999999999999999999999999999')

    // const stateList = useSelector(state => {
    //     return state;
    // });

    const {pathname} = history.location
    const singlePhotoId = pathname.split("/")[2]

    // console.log(singlePhotoId, '99999999999999999999999999999999999999999')

    
    useEffect(() => {
        dispatch(getCommentByIdThunk(singlePhotoId))
    },[dispatch])
    
    // useEffect(() => {
    //     dispatch();
    // }, [dispatch]);

    // console.log(commentList.map((comment => {return comment.id})))

    // for (const property in commentList) {
    //     console.log(`${property}: ${commentList[property].id}`);
    //   }

    // console.log(Object.entries(commentList), '222222222222222222222222222222')

    const commentsSection = Object.values(commentList)?.map(comment => (
        <div key={comment.id} className='single-comment'>
        <div>{comment.id}</div>
        <div>{comment.content}</div>
        <div>{comment.updated_at}</div>
      </div>
      ))

    // console.log(stateList, "33333333333333333333333333333333333333333")



    if (!commentList) {
        return <div>things went wrong</div>;
    } else {
    return (
        <>
            {commentsSection}
        </>
    );
    }
};

export default GetAllCommentsForSinglePhoto;