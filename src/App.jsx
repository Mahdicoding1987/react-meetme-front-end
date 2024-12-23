import { useState, createContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
import SignupForm from "./components/SignupForm/SignupForm";
import SigninForm from "./components/SigninForm/SigninForm";
import * as authService from "../src/services/authService"; // import the authservice
import PostList from "./components/PostList/PostList";
import * as postService from "./services/postService";
import PostDetails from "./components/PostDetails/PostDetails";
import PostForm from "./components/PostForm/PostForm";
import CommentForm from "./components/CommentForm/CommentForm";
import Profile from "./components/Profile/Profile";
import Settings from "./components/Settings/Settings";

export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser()); // using the method from authservice
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllPosts = async () => {
      const postsData = await postService.index();
      setPosts(postsData);
    };
    if (user) fetchAllPosts();
  }, [user]);

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  const handleAddPost = async (postFormData) => {
    const newPost = await postService.create(postFormData);
    setPosts([newPost, ...posts]);
    navigate("/posts");
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.handleAddPost(formData);
  };

  const handleDeletePost = async (postId) => {
    const deletedPost = await postService.deletePost(postId);
    setPosts(posts.filter((post) => post._id !== deletedPost._id));
    navigate("/posts");
  };

  const handleUpdatePost = async (postId, postFormData) => {
    const updatedPost = await postService.update(postId, postFormData);

    setPosts(posts.map((post) => (postId === post._id ? updatedPost : post)));

    navigate(`/posts/${postId}`);
  };

  const handleUpdateComment = async (postId, commentId, commentFormData) => {
    const updatedComment = await postService.update(commentId, commentFormData);

    setComments(comments.map((comment) => (commentId === comment._id ? updatedComment : comment)));

    navigate(`/posts/${postId}`);
  };

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? (
            // Protected Routes:
            <>
              <Route path="/" element={<Landing />} />
              {/* <Route path="/" element={<Dashboard user={user} />} /> */}
              <Route path="/posts" element={<PostList posts={posts} />} />
              <Route path="/posts/new" element={<PostForm handleAddPost={handleAddPost} />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/posts/:postId" element={<PostDetails handleDeletePost={handleDeletePost} />} />
              <Route path="/posts/:postId/edit" element={<PostForm handleUpdatePost={handleUpdatePost} />} />
              <Route
                path="/posts/:postId/comments/:commentId/edit"
                element={<CommentForm handleUpdateComment={handleUpdateComment} />}
              />
              <Route path="/profile/:userId" element={<Profile />} />
            </>
          ) : (
            // Public Route:
            <Route path="/" element={<Landing />} />
          )}
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />
        </Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;
