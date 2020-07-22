import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PostContainer from "../containers/Post";
import { Container, Row, Col } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

const URL = localStorage.getItem("URL");

export default function Explore() {
  const [page, setpage] = useState(0);
  const [posts, setposts] = useState([]);
  const [hasMore, sethasMore] = useState(true);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    fetchPost();
    setloading(false);
  }, []);
  const fetchPost = async () => {
    try {
      const response = await axios.get(`${URL}posts/explore`, {
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
    <div className="page">
      <Navbar />
      <Container style={{ marginTop: "20px" }}>
        <Row>
          <Col>
            <InfiniteScroll
              dataLength={posts.length}
              next={fetchPost}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
              pullDownToRefresh={true}
              pullDownToRefresh={true}
              refreshFunction={fetchPost}
              pullDownToRefreshContent={
                <p style={{ textAlign: "center" }}>
                  <b>pullDownToRefreshContent</b>
                </p>
              }
            >
              <PostContainer post={posts} loading={loading} />
            </InfiniteScroll>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
