import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { getCommentByIdThunk } from "../../store/comments";
import EditCommentModal from "../EditCommentForm";
import DeleteCommentModal from "../DeleteCommentButton";

function GetAllCommentsForSinglePhoto({ imageId }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const { pathname } = history.location;
	const singlePhotoId = pathname.split("/")[2];
	const currentUser = useSelector((state) => state.session.user);

	useEffect(() => {
		dispatch(getCommentByIdThunk(singlePhotoId));
	}, [dispatch, singlePhotoId]);

	const commentList = useSelector((state) => {
		return state.comments;
	});
	let currentComments;
	if (commentList) {
		currentComments = Object.values(commentList).filter(
			(comment) => comment.image_id === +imageId
		);

		const commentsSection = Object.values(currentComments)?.map((comment) => {
			const newDate = comment?.created_at.split(' ');

			return (
				<div key={comment.id} className="single-comment">
					<div>
						<Link to={`/users/${comment.user_id}`}>{comment.user.username}</Link>
					</div>
					<div>{comment.content}</div>
					<div>
						{newDate[2]} {newDate[1]}, {newDate[3]}
					</div>
					{currentUser && currentUser.id === comment.user_id && (
						<>
							<EditCommentModal commentId={comment.id} />
							<DeleteCommentModal commentId={comment.id} />
						</>
					)}
				</div>
			)
		});

		if (!commentList) {
			return <div>things went wrong</div>;
		} else {
			return <>{commentsSection}</>;
		}
	}
}

export default GetAllCommentsForSinglePhoto;
