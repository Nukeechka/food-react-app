/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import { useContext } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem/CartItem";

const Cart = (props) => {
	const cartContext = useContext(CartContext);
	const hasItems = cartContext.items.length > 0;
	const removeCartItemHandler = (id) => {
		cartContext.removeItem(id);
	};
	const addCartIteamHandler = (item) => {
		cartContext.addItem({ ...item, amount: 1 });
	};
	const cartItems = (
		<ul className={styles["cart-item"]}>
			{cartContext.items.map((item) => (
				<CartItem
					key={item.id}
					name={item.name}
					amount={item.amount}
					price={item.price}
					onRemove={removeCartItemHandler.bind(null, item.id)}
					onAdd={addCartIteamHandler.bind(null, item)}
				/>
			))}
		</ul>
	);
	const totalAmount = `$${Math.abs(cartContext.totalAmount).toFixed(2)}`;

	return (
		<Modal onHideCart={props.onShowCart}>
			{cartItems}
			<div className={styles.total}>
				<span>Total</span>
				<span>{totalAmount}</span>
			</div>
			<div className={styles.actions}>
				<button
					onClick={props.onShowCart}
					className={styles["button-alt"]}
				>
					Close
				</button>
				{hasItems && <button className={styles.button}>Buy</button>}
			</div>
		</Modal>
	);
};

export default Cart;
