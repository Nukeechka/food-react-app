import styles from "./Card.module.css";
const Card = (props) => {
  // eslint-disable-next-line react/prop-types
  return <div className={styles.card}>{props.children}</div>;
};
export default Card;
