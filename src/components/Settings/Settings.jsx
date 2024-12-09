import { useState, useEffect } from "react";
import { getUser } from "../../services/authService";
import styles from "./Settings.module.css";

function Settings() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    newPassword: "",
    bio: "",
    avatar: "",
  });

  useEffect(() => {
    const user = getUser();
    if (user) {
      setFormData((prevState) => ({
        ...prevState,
        username: user.username || "",
        email: user.email || "",
        bio: user.bio || "",
      }));
    }
  }, []);

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
      // Add your API call here to update user settings
      console.log("Form submitted:", formData);
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
          <label htmlFor="currentPassword">Current Password</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
          />
        </div>

        <button className={styles.submitButton}>Save Changes</button>
      </form>
    </div>
  );
}

export default Settings;
