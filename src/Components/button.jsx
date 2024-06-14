import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Button = ({ children, className, to, ...props }) => {
  const btnClass =
    props.color === "blue"
      ? "bg-[#4268fb] text-white text-sm px-8 py-2 rounded cursor-pointer outline-none border-none"
      : "bg-blue-100 text-blue text-sm px-8 py-2 rounded cursor-pointer outline-none border-none";

  return (
    <div className={className}>
      {to ? (
        <Link to={to}>
          <button className={`${btnClass} ${className}`}>
            {children}
          </button>
        </Link>
      ) : (
        <button className={`${btnClass} ${className}`} onClick={props.btnClicked}>
          {children}
        </button>
      )}
    </div>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  btnClicked: PropTypes.func,
  color: PropTypes.string,
  to: PropTypes.string,
};

export default Button;
