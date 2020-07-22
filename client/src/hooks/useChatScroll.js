import { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import useGet from './useGet';

let socket;
const URL = localStorage.getItem('URL');
const ENDPOINT = 'http://localhost:5000/';
function scrollBot() {
	let elem = document.querySelector('.message-container__iner');
	elem.scrollTop = elem.scrollHeight;
}
const useChatScroll = (page, room, _id) => {
	const headers = {
		page,
	};

	const [messages, loading, error, cleanUp, setMessages, hasMore] = useGet(
		`messages/${room}/message`,
		[],
		true,
		[page, room],
		{
			headers,
		},
		true,
		scrollBot
	);
	const [message, setMessage] = useState('');

	useEffect(() => {
		socket = io(ENDPOINT);
		socket.emit('join', { room }, () => {});
	}, [room, ENDPOINT]);

	useEffect(() => {
		socket.on('message', ({ content, author }) => {
			setMessages((messages) => [...messages, { content, author }]);
			scrollBot();
		});
	}, []);

	const sendMessage = (e) => {
		e.preventDefault();
		if (message.trim() === '') {
			return;
		}
		axios.post(
			`${URL}messages/${room}/message`,
			{
				content: message,
			},
			{ headers }
		);
		socket.emit(
			'sendMessage',
			{
				content: message,
				author: {
					_id,
				},
			},
			() => setMessage('')
		);
	};

	const bind = {
		value: message,
		onChange: (e) => setMessage(e.target.value),
		onKeyPress: (e) => (e.key === 'Enter' ? sendMessage(e) : null),
	};
	return [loading, error, hasMore, messages, bind];
};

export default useChatScroll;
