// src/components/CommentForm/CommentForm.jsx

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./CommentForm.module.css";
import * as postService from "../../services/postService";
import Icon from "../Icon/Icon";

const CommentForm = (props) => {
  const [formData, setFormData] = useState({ text: "" });
  const { postId, commentId } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      const postData = await postService.show(postId);
      setFormData(postData.comments.find((comment) => comment._id === comment._id));
    };
    if (postId && commentId) fetchPost();
  }, [postId, commentId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.handleUpdateComment(formData);
    setFormData({ text: "" });
  };

  if (postId && commentId)
    return (
      <main className={styles.container}>
        <form onSubmit={handleSubmit}>
          <h1>Edit Comment</h1>
          <label htmlFor="text-input">Your comment:</label>
          <textarea required type="text" name="text" id="text-input" value={formData.text} onChange={handleChange} />
          <button type="submit">SUBMIT</button>
        </form>
      </main>
    );
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="text-input">Your comment:</label>
      <textarea required type="text" name="text" id="text-input" value={formData.text} onChange={handleChange} />
      <button type="submit">
        <Icon category="Create" />
      </button>
    </form>
  );
};

export default CommentForm;
