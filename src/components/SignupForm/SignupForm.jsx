import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as authService from "../../services/authService";
import SignupIcon from "../../assets/images/signup.svg";
import styles from "./SignupForm.module.css";

const SignupForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState([""]);
  const [formData, setFormData] = useState({
    username: "",
    password: "", // We use password here, it gets hashed on backend
    passwordConf: "",
    age: "",
    gender: "",
    location: "",
    bio: "",
    avatar: "https://i.pinimg.com/736x/7f/3b/b8/7f3bb8ca1c26444e3f87281bee19b42f.jpg",
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUserResponse = await authService.signup(formData);
      props.setUser(newUserResponse.user);
      navigate("/");
    } catch (err) {
      updateMessage(err.message);
    }
  };

  const { username, password, passwordConf } = formData;

  const isFormInvalid = () => {
    return !(
      (formData.username && formData.password && formData.password === formData.passwordConf && formData.gender) // Only required fields need checking
    );
  };

  return (
    <main className={styles.container}>
      <section>
        <form onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <p>{message}</p>

          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="confirm">Confirm Password:</label>
            <input
              type="password"
              id="confirm"
              name="passwordConf"
              value={formData.passwordConf}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="age">Age:</label>
            <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="gender">Gender:</label>
            <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="prefer not to say">Prefer not to say</option>
            </select>
          </div>

          <div>
            <label htmlFor="location">Location:</label>
            <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="bio">Bio:</label>
            <textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="avatar">Avatar URL:</label>
            <input type="url" id="avatar" name="avatar" value={formData.avatar} onChange={handleChange} />
          </div>

          <div>
            <button disabled={isFormInvalid()}>Sign Up</button>
            <Link to="/">
              <button>Cancel</button>
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
};

export default SignupForm;
