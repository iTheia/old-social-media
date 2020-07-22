import React, { useState, useRef, useCallback } from 'react';
import jwtDecode from 'jwt-decode';
import { Container, Row, Col } from 'react-bootstrap';
import useChat from '../hooks/useChatScroll';

const token = localStorage.getItem('token');

const TextChannel = (props) => {
	const { room } = props.match.params;

	const _id = jwtDecode(token)._id;
	const [page, setPage] = useState(0);
	const [loading, error, hasMore, messages, bind] = useChat(page, room, _id);
	const inputRef = useRef();
	const observer = useRef();
	const firstMessageRef = useCallback(
		(node) => {
			if (loading) return;
			if (observer.current) observer.current.disconnect();
			if (!hasMore) return;
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting) {
					console.log(messages, loading);
					setPage((page) => (page += 1));
				}
			});
			if (node) observer.current.observe(node);
		},
		[loading, hasMore]
	);

	if (loading) return <div></div>;

	const printMessages = () =>
		messages.map((message, index) => {
			let props = {};
			if (index === 0) {
				props.ref = firstMessageRef;
			}
			return (
				<Row key={index} {...props}>
					<div
						className={`message-from-${
							message.author._id === _id ? 'me' : 'other'
						}`}
					>
						{message.content}
					</div>
				</Row>
			);
		});
	return (
		<div className="message-area">
			<header className="inbox-header">
				<div className="icon"></div>
			</header>
			<Container
				className="message-container"
				onClick={() => inputRef.current.focus()}
			>
				<Col className="message-container__iner">{printMessages()}</Col>
			</Container>
			<Container>
				<input type="text" ref={inputRef} name="content" {...bind} />
			</Container>
		</div>
	);
};

export default TextChannel;
