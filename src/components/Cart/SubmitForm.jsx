import { useState } from "react";
import styles from "./SubmitForm.module.css";

const SubmitForm = (props) => {
	const [nameInput, setNameInput] = useState("");
	const [addressInput, setAddressInput] = useState("");
	const [formValidity, setFormValidity] = useState({
		name: true,
		address: true,
	});

	const isInputValidate = (inputValue) => {
		return inputValue.trim() !== "";
	};

	const confirmOrderHandler = (event) => {
		event.preventDefault();
		const isNameInputValid = isInputValidate(nameInput);
		const isAddressInputValid = isInputValidate(addressInput);
		const isFormValid = isNameInputValid && isAddressInputValid;

		setFormValidity({
			name: isNameInputValid,
			address: isAddressInputValid,
		});

		if (!isFormValid) {
			return;
		}

		props.onSubmit({
			name: nameInput,
			address: addressInput,
		});
	};

	const nameInputHandler = (event) => {
		setNameInput(event.target.value);
	};

	const addressInputHandler = (event) => {
		setAddressInput(event.target.value);
	};

	const nameInputClasses = `${styles.control} ${
		formValidity.name ? "" : styles.invalid
	}`;
	const addressInputClasses = `${styles.control} ${
		formValidity.address ? "" : styles.invalid
	}`;

	return (
		<form className={styles.form} onSubmit={confirmOrderHandler}>
			<div className={nameInputClasses}>
				<label htmlFor="name">Name</label>
				<input
					type="text"
					id="name"
					value={nameInput}
					onChange={nameInputHandler}
				/>
				{!formValidity.name && <p>Please enter a correct name</p>}
			</div>
			<div className={addressInputClasses}>
				<label htmlFor="address">Address</label>
				<input
					type="text"
					id="address"
					value={addressInput}
					onChange={addressInputHandler}
				/>
				{!formValidity.address && <p>Please enter a correct address</p>}
			</div>
			<div className={styles.actions}>
				<button className={styles.submit}>Submit</button>
				<button type="button" onClick={props.onCancel}>
					Cancel
				</button>
			</div>
		</form>
	);
};

export default SubmitForm;
