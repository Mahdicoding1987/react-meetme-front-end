import { Link } from "react-router-dom";
import styles from "./PostList.module.css";
import Icon from "../Icon/Icon";
import AuthorInfo from "../../components/AuthorInfo/AuthorInfo";

const PostList = (props) => {
  return (
    <main className={styles.container}>
      {props.posts.map((post) => (
        <Link key={post._id} to={`/posts/${post._id}`}>
          <article>
            <header>
              <div>
                <h2>{post.title}</h2>
                <Icon category={post.category} />
              </div>
              <p>
                {post.author.username} posted on
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <AuthorInfo content={post} />
            </header>
            <p>{post.text}</p>
          </article>
        </Link>
      ))}
    </main>
  );
};

export default PostList;
