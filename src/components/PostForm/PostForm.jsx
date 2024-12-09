import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as postService from "../../services/postService";
import styles from "./PostForm.module.css";
// const { postId, commentId } = useParams();

const PostForm = (props) => {
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    imageUrl: "",
    category: "Dating",
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (postId) {
      props.handleUpdatePost(postId, formData);
    } else {
      props.handleAddPost(formData);
    }
  };

  const { postId } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      const postData = await postService.show(postId);
      setFormData(postData);
    };
    if (postId) fetchPost();
  }, [postId]);

  return (
    <main className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h1>{postId ? "Edit Post" : "New Post"}</h1>
        <label htmlFor="title">Title</label>
        <input required type="text" name="title" id="title" value={formData.title} onChange={handleChange} />
        <label htmlFor="text">Text</label>
        <textarea required type="text" name="text" id="text" value={formData.text} onChange={handleChange} />
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Enter image URL"
            className="form-control"
          />
        </div>
        <label htmlFor="category">Category</label>
        <select required name="category" id="category" value={formData.category} onChange={handleChange}>
          <option value="Dating">Dating</option>
          <option value="Games">Games</option>
          <option value="Music">Music</option>
          <option value="Movies">Movies</option>
          <option value="Sports">Sports</option>
          <option value="Television">Television</option>
        </select>
        <button type="submit">SUBMIT</button>
      </form>
    </main>
  );
};

export default PostForm;
