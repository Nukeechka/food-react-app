/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import Input from "./Input";
import styles from "./MealItemForm.module.css";

const MealItemForm = (props) => {
	const [amountIsValid, setAmountIsValid] = useState(true);
	const submitHandler = (event) => {
		event.preventDefault();

		const inputAmount = +inputAmountRef.current.value;
		if (inputAmount > 10) {
			setAmountIsValid(false);
			return;
		}

		props.onAddToCart(inputAmount);
	};

	const inputAmountRef = useRef();

	return (
		<form onSubmit={submitHandler} className={styles.form}>
			<Input
				ref={inputAmountRef}
				label="Amount"
				input={{
					id: props.id,
					min: 1,
					type: "number",
					step: 1,
					defaultValue: 1,
				}}
			/>
			<button>Add</button>
			<p>{!amountIsValid && "Incorrect value, try again"}</p>
		</form>
	);
};

export default MealItemForm;
