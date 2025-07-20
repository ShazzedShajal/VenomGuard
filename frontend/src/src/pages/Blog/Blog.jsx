import React, { useState } from "react";
import blogs from "./../../components/Blogs/blogs"; // Import blog data
import "./style.css"; // Import CSS styles
import RusselViper from './../../components/Blogs/SnakeDetails/RusselViper';
import { Col, Row } from "react-bootstrap";

const BlogThumbnail = ({ blog, onClick }) => (
  <div className="thumbnailCard" onClick={() => onClick(blog.id)}>
    <img src={blog.thumbnail} alt={blog.title} className="thumbnail" />
    <h3>{blog.title}</h3>
  </div>
);

const BlogContent = ({ blog, onBack }) => (
  <div className="contentContainer backish">
    <button className="backButton" onClick={onBack}>
      Back
    </button>
    <h2>{blog.title}</h2>
    <p>{blog.content}</p>
  </div>
);

const BlogApp = () => {
  const [selectedBlogId, setSelectedBlogId] = useState(null);

  const selectedBlog = blogs.find((blog) => blog.id === selectedBlogId);

  return (
    <div className="appContainer backgroud">
      <div className="contentContainer backish"><h1>BLOGS</h1> </div><br /><br /><br />
      <br />
      <Row className="contentContainer">
        <Col lg="14">
        {selectedBlog ? (
        <BlogContent blog={selectedBlog} onBack={() => setSelectedBlogId(null)} />
      ) : (
        <div className="thumbnailContainer">
          {blogs.map((blog) => (
            <BlogThumbnail key={blog.id} blog={blog} onClick={setSelectedBlogId} />
          ))}
        </div>
      )}
        </Col>
     
      </Row>
    </div>
  );
};

export default BlogApp;
