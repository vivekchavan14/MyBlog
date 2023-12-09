import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function Post({ _id, title, summary, cover, content, createdAt, author }) {
  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={`http://localhost:5000/${cover}`} alt="" />
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          {author && ( // Conditional rendering for author existence
            <>
              <a className="author">{author.username}</a>
              <time>{formatISO9075(new Date(createdAt))}</time>
            </>
          )}
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
}

Post.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  author: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }),
};

// Make author prop optional
Post.defaultProps = {
  author: null,
};
