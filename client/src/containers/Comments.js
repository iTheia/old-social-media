import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import Comment from '../components/Comment';
import CommentForm from '../components/CommentForm';

const Comments = (props) => {
	const { from, post_id } = props;
	const [comments, setComments] = useState([]);

	const addComment = (comment) =>
		setComments((comments) => [...comments, comment]);
	const deleteComment = (deleted_id) =>
		setComments((comments) =>
			comments.filter((comment) => comment._id !== deleted_id)
		);
	const printComments = () =>
		comments.map((comment) => (
			<Comment
				deleteC={deleteComment}
				post_id={post_id}
				comment={comment}
				key={comment._id}
			/>
		));

	const fetchComments = async () => {
		if (from === 'home') {
			setComments(props.comments);
		} else {
			try {
				const response = await axios.get(
					`${localStorage.getItem('URL')}posts/${post_id}/comments/`
				);
				setComments(response.data.comments);
			} catch (error) {
				alert(error);
			}
		}
	};

	useEffect(() => {
		fetchComments();
	}, []);

	return (
		<div className="comments-container">
			<Container>{printComments()}</Container>
			<CommentForm
				from={from}
				addComment={addComment}
				post_id={post_id}
			></CommentForm>
		</div>
	);
};

export default Comments;
