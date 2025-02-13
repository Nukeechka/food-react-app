/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
	items: [],
	totalAmount: 0,
};

const cartReducer = (prevState, action) => {
	if (action.type === "ADD_ITEM") {
		const updatedTotalAmount =
			prevState.totalAmount + action.item.price * action.item.amount;
		const existingCartItemIndex = prevState.items.findIndex((item) => {
			return item.id === action.item.id;
		});
		const existingCartItem = prevState.items[existingCartItemIndex];
		let updatedItem;
		let updatedItems;
		if (existingCartItem) {
			updatedItem = {
				...existingCartItem,
				amount: existingCartItem.amount + action.item.amount,
			};
			updatedItems = [...prevState.items];
			updatedItems[existingCartItemIndex] = updatedItem;
		} else {
			updatedItem = {
				...action.item,
			};
			updatedItems = prevState.items.concat(updatedItem);
		}
		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}
	if (action.type === "REMOVE_ITEM") {
		const existingCartItemIndex = prevState.items.findIndex((item) => {
			return item.id === action.id;
		});
		const existingCartItem = prevState.items[existingCartItemIndex];
		const updatedTotalAmount =
			prevState.totalAmount - existingCartItem.price;
		let updatedItems;
		if (existingCartItem.amount === 1) {
			updatedItems = [...prevState.items];
			updatedItems.splice(existingCartItemIndex, 1);
		} else {
			let updatedItem = {
				...existingCartItem,
				amount: existingCartItem.amount - 1,
			};
			updatedItems = [...prevState.items];
			updatedItems[existingCartItemIndex] = updatedItem;
		}

		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}

	if (action.type === "CLEAR_CART") {
		return defaultCartState;
	}
	return defaultCartState;
};

const CartContextProvider = (props) => {
	const [cartState, dispatchCartAction] = useReducer(
		cartReducer,
		defaultCartState
	);

	const addItemHandler = (item) => {
		dispatchCartAction({
			type: "ADD_ITEM",
			item: item,
		});
	};

	const removeItemHandler = (id) => {
		dispatchCartAction({
			type: "REMOVE_ITEM",
			id: id,
		});
	};

	const clearCartHandler = () => {
		dispatchCartAction({
			type: "CLEAR_CART",
		});
	};

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemHandler,
		removeItem: removeItemHandler,
		clearCart: clearCartHandler,
	};
	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartContextProvider;
