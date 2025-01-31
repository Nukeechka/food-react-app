/* eslint-disable react/prop-types */
import styles from "./Header.module.css";
import banner from "../../assets/banner.jpg";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <>
      <header className={styles.header}>
        <h1>FoodR</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={styles["main-image"]}>
        <img src={banner} alt="Meals photo" />
      </div>
    </>
  );
};

export default Header;
