import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import * as postService from "../../services/postService";
import CommentForm from "../CommentForm/CommentForm";
import { AuthedUserContext } from "../../App";
import { Link } from "react-router-dom";
import styles from "./PostDetails.module.css";
import Loading from "../Loading/Loading";
import Icon from "../Icon/Icon";
import AuthorInfo from "../../components/AuthorInfo/AuthorInfo";
import { useNavigate } from "react-router-dom";

const PostDetails = (props) => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const user = useContext(AuthedUserContext);
  console.log("postId", postId);

  const navigate = useNavigate();

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

  const handleDeleteComment = async (commentId) => {
    await postService.deleteComment(postId, commentId);
    setPost({
      ...post,
      comments: post.comments.filter((comment) => comment._id !== commentId),
    });
  };

  const handleUpdateComment = async (commentFormData) => {
    const updatedComment = await postService.updateComment(postId, commentId, commentFormData);
    setPost({
      ...post,
      comments: post.comments.map((comment) => (comment._id === commentId ? updatedComment : comment)),
    });
  };

  if (!post) {
    return <main>Loading...</main>;
  }

  console.log("post state:", post);
  if (!post) return <main>Loading...</main>;

  ///////////////////////////////////////////////////////////////////////////

  return (
    <main className={styles.postDetailsContainer}>
      <header>
        <p>{post.category.toUpperCase()}</p>
        <h1 className={styles.postTitle}>{post.title}</h1>
        <Link to={`/profile/${post.author._id}`}>
          Posted By: <AuthorInfo content={post} />
        </Link>
      </header>
      <p className={styles.postContent}>{post.text}</p>
      {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="post-image" />}{" "}
      {post.author._id === user._id && (
        <>
          <button onClick={() => navigate(`/posts/${postId}/edit`)} className={styles.actionButton}>
            Edit
          </button>

          <button onClick={() => props.handleDeletePost(postId)} className={styles.actionButton}>
            Delete
          </button>
        </>
      )}
      <section className={styles.comments}>
        <h2>Comments</h2>
        <CommentForm handleAddComment={handleAddComment} />

        {!post.comments.length && <p>There are no comments.</p>}

        {post.comments.map((comment) => (
          <article key={comment._id}>
            <header>
              <Link to={`/profile/${user._id}`}>{user.username}</Link>

              <AuthorInfo content={comment} />
            </header>
            <p>{comment.text}</p>
            {comment.author._id === user.id && (
              <div className={styles.actionButtons}>
                <Link to={`/posts/${postId}/comments/${comment._id}/edit`} className={styles.iconButton}>
                  <button className={styles.actionButton}>Edit</button>
                </Link>

                <button onClick={() => handleDeleteComment(comment._id)} className={styles.actionButton}>
                  Delete
                </button>
              </div>
            )}
          </article>
        ))}
      </section>
    </main>
  );
};

export default PostDetails;
