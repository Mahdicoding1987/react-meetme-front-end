import { Link } from "react-router-dom";
import styles from "./PostList.module.css";
import Icon from "../Icon/Icon";
import AuthorInfo from "../../components/AuthorInfo/AuthorInfo";

const PostList = (props) => {
  return (
    <main className={styles.feedContainer}>
      {props.posts.map((post) => (
        <Link key={post._id} to={`/posts/${post._id}`}>
          <article className={styles.postCard}>
            <header className={styles.postHeader}>
              <div>
                <h1>{post.title}</h1>
                <Icon category={post.category} />
              </div>
              {/* <p>
                {post.author.username} posted on
                {new Date(post.createdAt).toLocaleDateString()}
              </p> */}
              <AuthorInfo content={post} />
              <p>{post.category}</p>
            </header>
            <p>{post.text}</p>
          </article>
        </Link>
      ))}
    </main>
  );
};

export default PostList;
