import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./Profile.module.css";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    const fetchProfileAndPosts = async () => {
      try {
        // Fetch user profile
        const profileResponse = await fetch(`${import.meta.env.VITE_EXPRESS_BACKEND_URL}/users/${userId}`);
        const profileData = await profileResponse.json();
        setProfile(profileData);

        // Fetch user's posts
        const postsResponse = await fetch(`${import.meta.env.VITE_EXPRESS_BACKEND_URL}/posts/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const postsData = await postsResponse.json();
        setPosts(postsData);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchProfileAndPosts();
  }, [userId]);

  return (
    <div>
      {profile ? (
        <>
          <h1>{profile.username}'s Profile</h1>
          <img
            src={profile.avatar || "/default-avatar.png"}
            alt={`${profile.username}'s avatar`}
            className={styles.profileAvatar}
          />
          {/* Add user details section */}
          <div className="user-info">
            <p>
              <strong>Gender:</strong> {profile.age || "Not specified"}
            </p>
            <p>
              <strong>Age:</strong> {profile.age || "Not specified"}
            </p>
            <p>
              <strong>Country:</strong> {profile.country || "Not specified"}
            </p>
            <p>
              <strong>Bio:</strong> {profile.bio || "No bio provided"}
            </p>
          </div>
          <div>
            <h2>{profile.username}'s Posts</h2>
            {posts.map((post) => (
              <Link to={`/posts/${post._id}`} key={post._id}>
                <h3>{post.title}</h3>
                <p>{post.category}</p>
                <p>{post.text}</p>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Profile;
