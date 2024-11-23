import { useState } from "react";

const PostForm = (props) => {
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    category: "Dating",
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.handleAddPost(formData);
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input required type="text" name="title" id="title" value={formData.title} onChange={handleChange} />
        <label htmlFor="text">Text</label>
        <textarea required type="text" name="text" id="text" value={formData.text} onChange={handleChange} />
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
