import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import useGet from '../hooks/useGet';
import Post from '../components/Post';
import Navbar from '../components/Navbar';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';

const URL = localStorage.getItem('URL');
export default function Home() {
	const [user, loadingUser, errorUser, cleanUpUser] = useGet(
		'users/',
		{},
		true
	);
	const [page, setpage] = useState(0);
	const [posts, setposts] = useState([]);
	const [hasMore, sethasMore] = useState(true);

	useEffect(() => {
		fetchPost();
		return () => {
			cleanUpUser();
			setposts([]);
		};
	}, []);

	const printPosts = () =>
		posts.map((post) => <Post from={'home'} key={post._id} post={post} />);
	const fetchPost = async () => {
		try {
			const response = await axios.get(`${URL}posts/`, {
				headers: { page },
			});
			setposts((posts) => posts.concat(response.data));
			setpage((page) => (page += 1));
			if (response.data.length === 0) {
				sethasMore(false);
			}
		} catch (error) {
			console.error();
		}
	};
	return (
		<div className="page home">
			<Navbar />
			<Container style={{ marginTop: '20px' }}>
				<Row>
					<Col sm={12} lg={8}>
						<InfiniteScroll
							dataLength={posts.length}
							next={fetchPost}
							hasMore={hasMore}
							loader={<h4>Loading...</h4>}
							endMessage={
								<p style={{ textAlign: 'center' }}>
									<b>Yay! You have seen it all</b>
								</p>
							}
							pullDownToRefresh={true}
							pullDownToRefresh={true}
							refreshFunction={fetchPost}
							pullDownToRefreshContent={
								<p style={{ textAlign: 'center' }}>
									<b>Yay! You have seen it all</b>
								</p>
							}
						>
							{printPosts()}
						</InfiniteScroll>
					</Col>
					<Col className="d-none d-lg-block">
						<Card style={{ padding: '5px' }}>
							<div className="flex">
								<img
									src={`/images/${user.avatar}`}
									className="icon icon-home"
									alt=""
								/>
								<span>{user.name}</span>
							</div>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
}
