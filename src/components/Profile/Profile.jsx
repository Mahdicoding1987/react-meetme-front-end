import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./Profile.module.css";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const { userId } = useParams();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpdateAvatar = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("avatar", selectedFile);

    try {
      const response = await fetch(`${import.meta.env.VITE_EXPRESS_BACKEND_URL}/api/users/${userId}/avatar`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
      const data = await response.json();
      setProfile({ ...profile, avatar: data.avatar });
    } catch (error) {
      console.error("Error updating avatar:", error);
    }
  };

  // Add this near the avatar image in your JSX:
  <div className={styles.avatarUpload}>
    <input type="file" onChange={handleFileChange} accept="image/*" />
    <button onClick={handleUpdateAvatar}>Update Avatar</button>
  </div>;

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
    <div className={styles.pageContainer}>
      {profile ? (
        <>
          <div className={styles.leftSidebar}>
            <div className={styles.profileInfo}>
              <h1>{profile.username}'s Profile</h1>
              <img
                src={profile.avatar || "https://via.placeholder.com/150"}
                alt={`${profile.username}'s avatar`}
                className={styles.profileAvatar}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/150";
                }}
              />
              <div className={styles.userInfo}>
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
            </div>
          </div>
          <div className={styles.mainContent}>
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
