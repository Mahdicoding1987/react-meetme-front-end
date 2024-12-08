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
    <main className={styles.container}>
      <header>
        <p>{post.category.toUpperCase()}</p>
        <h1>{post.title}</h1>
        {/* <p>
          {post.author.username} posted on
          {new Date(post.createdAt).toLocaleDateString()}
        </p> */}
        {/* <AuthorInfo content={post} /> */}
        <Link to={`/profile/${user._id}`}>{user.username}</Link>
        {post.author._id === user._id && (
          <>
            <Link to={`/posts/${postId}/edit`}>
              <Icon category="Edit" />
            </Link>
            <button onClick={() => props.handleDeletePost(postId)}>
              <Icon category="Trash" />
            </button>
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
              <Link to={`/profile/${user._id}`}>{user.username}</Link>

              <AuthorInfo content={comment} />

              {comment.author._id === user.id && (
                <>
                  <Link to={`/posts/${postId}/comments/${comment._id}/edit`}>
                    <Icon category="Edit" />
                  </Link>
                  <button onClick={() => handleDeleteComment(comment._id)}>
                    <Icon category="Trash" />
                  </button>
                </>
              )}
            </header>
            <p>{comment.text}</p>
          </article>
        ))}
      </section>
    </main>
  );
};

export default PostDetails;
