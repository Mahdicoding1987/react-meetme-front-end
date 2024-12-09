import { useState } from "react";
import { getUser } from "../../services/authService";
import styles from "./Settings.module.css";

function Settings() {
  const user = getUser();
  const initialFormData = {
    username: user?.username || "",
    password: "",
    newPassword: "",
    bio: user?.bio || "",
    avatar: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/profile/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedUser),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("User settings updated:", data);
        console.log("Submitting update:", updatedUser);
        // Optionally, you can update the user state or navigate to another page
      } else {
        console.error("Failed to update user settings:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating settings:", error);
    }
  };

  return (
    <div className={styles.settingsContainer}>
      <h2 className={styles.title}>User Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="age">age</label>
          <input type="text" id="age" name="age" value={formData.age} onChange={handleChange} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="gender">gender</label>
          <input type="text" id="gender" name="gender" value={formData.gender} onChange={handleChange} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="country">country</label>
          <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="bio">Bio</label>
          <textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="avatar">Avatar URL</label>
          <input type="text" id="avatar" name="avatar" value={formData.avatar} onChange={handleChange} />
        </div>

        <button type="submit" className={styles.submitButton}>
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default Settings;
