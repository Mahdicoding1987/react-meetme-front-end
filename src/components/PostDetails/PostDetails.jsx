import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import * as postService from "../../services/postService";
import CommentForm from "../CommentForm/CommentForm";
import { AuthedUserContext } from "../../App";

const PostDetails = (props) => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const user = useContext(AuthedUserContext);
  console.log("postId", postId);

  const handleAddComment = async (commentFormData) => {
    const newComment = await postService.createComment(postId, commentFormData);
    setPost({ ...post, comments: [...post.comments, newComment] });
  };

  useEffect(() => {
    const fetchPost = async () => {
      const postData = await postService.show(postId);
      console.log("postData", postData);
      setPost(postData);
    };
    fetchPost();
  }, [postId]);

  console.log("post state:", post);
  if (!post) return <main>Loading...</main>;

  return (
    <main>
      <header>
        <p>{post.category.toUpperCase()}</p>
        <h1>{post.title}</h1>
        <p>
          {post.author.username} posted on
          {new Date(post.createdAt).toLocaleDateString()}
        </p>
        {post.author._id === user._id && (
          <>
            <button onClick={() => props.handleDeletePost(postId)}>Delete</button>
          </>
        )}
      </header>
      <p>{post.text}</p>
      <section>
        <h2>Comments</h2>
        <CommentForm handleAddComment={handleAddComment} />

        {!post.comments.length && <p>There are no comments.</p>}

        {post.comments.map((comment) => (
          <article key={comment._id}>
            <header>
              <p>
                {comment.author.username} posted on
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </header>
            <p>{comment.text}</p>
          </article>
        ))}
      </section>
    </main>
  );
};

export default PostDetails;
