// src/components/CommentForm/CommentForm.jsx

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import * as postService from "../../services/postService";

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

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="text-input">Your comment:</label>
      <textarea required type="text" name="text" id="text-input" value={formData.text} onChange={handleChange} />
      <button type="submit">SUBMIT COMMENT</button>
    </form>
  );
};

export default CommentForm;
