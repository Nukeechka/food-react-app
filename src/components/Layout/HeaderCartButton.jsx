/* eslint-disable react/prop-types */
import CartIcon from "../Cart/CartIcon";
import styles from "./HeaderCartButton.module.css";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
	const cartContext = useContext(CartContext);
	const [buttonIsAnimated, setButtonIsAnimated] = useState(false);
	const buttonClasses = `${styles.button} ${
		buttonIsAnimated ? styles.bump : ""
	}`;
	useEffect(() => {
		if (cartContext.items.length === 0) {
			return;
		}
		setButtonIsAnimated(true);

		const timer = setTimeout(() => {
			setButtonIsAnimated(false);
		}, 300);

		return () => {
			clearTimeout(timer);
		};
	}, [cartContext.items]);
	const cartItemsNumber = cartContext.items.reduce((currentValue, item) => {
		return currentValue + item.amount;
	}, 0);
	return (
		<>
			<button onClick={props.onClick} className={buttonClasses}>
				<span className={styles.icon}>
					<CartIcon />
				</span>
				<span>Cart</span>
				<span className={styles.badge}>{cartItemsNumber}</span>
			</button>
		</>
	);
};

export default HeaderCartButton;
