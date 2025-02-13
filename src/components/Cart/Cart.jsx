/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem/CartItem";
import SubmitForm from "./SubmitForm";

const Cart = (props) => {
	const cartContext = useContext(CartContext);
	const hasItems = cartContext.items.length > 0;
	const removeCartItemHandler = (id) => {
		cartContext.removeItem(id);
	};
	const [isDataSubmitted, setIsDataSubmitted] = useState(false);
	const [wasDataSendingSuccesful, setWasDataSendingSuccesful] =
		useState(false);
	const [isSubmitFormShow, setIsSubmitFormShow] = useState(false);

	const onSubmitOrderHandler = async (userData) => {
		setIsDataSubmitted(true);
		const response = await fetch(
			"https://food-app-d5d8b-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
			{
				method: "POST",
				body: JSON.stringify({
					user: userData,
					orderedFood: cartContext.items,
				}),
			}
		);
		if (!response.ok) {
			return;
		}
		setIsDataSubmitted(false);
		setWasDataSendingSuccesful(true);
		cartContext.clearCart();
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

	const orderHandler = () => {
		setIsSubmitFormShow(true);
	};

	const actionButtons = (
		<div className={styles.actions}>
			<button onClick={props.onShowCart} className={styles["button-alt"]}>
				Close
			</button>
			{hasItems && (
				<button className={styles.button} onClick={orderHandler}>
					Buy
				</button>
			)}
		</div>
	);

	const cartModalContent = (
		<>
			{cartItems}
			<div className={styles.total}>
				<span>Total</span>
				<span>{totalAmount}</span>
			</div>
			{isSubmitFormShow && (
				<SubmitForm
					onSubmit={onSubmitOrderHandler}
					onCancel={props.onShowCart}
				/>
			)}
			{!isSubmitFormShow && actionButtons}
		</>
	);

	const isDataSubmittingModalContent = <p>Sending your order...</p>;

	const dataWasSubmittedModalContent = <p>Your order submitted succesful</p>;

	return (
		<Modal onHideCart={props.onShowCart}>
			{!isDataSubmitted && !wasDataSendingSuccesful && cartModalContent}
			{isDataSubmitted && isDataSubmittingModalContent}
			{wasDataSendingSuccesful && dataWasSubmittedModalContent}
		</Modal>
	);
};

export default Cart;
