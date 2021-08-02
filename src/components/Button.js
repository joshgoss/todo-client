import "./Button.scss";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

function Button({
  active,
  children,
  danger,
  disabled,
  loading,
  primary,
  onClick,
  secondary,
  type,
}) {
  const classes = classNames("button", {
    active,
    danger,
    primary,
    secondary,
  });

  return (
    <button
      className={classes}
      onClick={onClick}
      type={type}
      disabled={loading || disabled}
    >
      {loading ? <FontAwesomeIcon icon="spinner" spin /> : children}
    </button>
  );
}

export default Button;

Button.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
    PropTypes.node,
  ]),
  danger: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  type: PropTypes.string,
};

Button.defaultProps = {
  active: false,
  danger: false,
  disabled: false,
  loading: false,
  primary: false,
  secondary: false,
  type: "button",
};
