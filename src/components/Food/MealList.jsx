import { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import styles from "./MealList.module.css";

const MealList = () => {
	const [food, setFood] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isHttpErrorMessage, setIsHttpErrorMessage] = useState();
	useEffect(() => {
		const fetchFood = async () => {
			setIsLoading(true);
			const response = await fetch(
				"https://food-app-d5d8b-default-rtdb.asia-southeast1.firebasedatabase.app/food.json"
			);

			if (!response.ok) {
				throw new Error("Something went wrong");
			}

			const data = await response.json();

			const loadedFood = [];

			for (const key in data) {
				loadedFood.push({
					id: key,
					name: data[key].name,
					description: data[key].description,
					price: data[key].price,
				});
			}

			setFood(loadedFood);
			setIsLoading(false);
		};

		fetchFood().catch((err) => {
			setIsLoading(false);
			setIsHttpErrorMessage(err);
		});
	}, []);

	if (isLoading) {
		return (
			<section className={styles.loadingText}>
				<p>Loading..</p>
			</section>
		);
	}

	if (isHttpErrorMessage) {
		return (
			<section className={styles.loadingText}>
				<p>Error. Try again later</p>
			</section>
		);
	}
	const mealList = food.map((meal) => (
		<MealItem
			key={meal.id}
			name={meal.name}
			description={meal.description}
			price={meal.price}
			id={meal.id}
		/>
	));
	return (
		<section className={styles.meals}>
			<Card>
				<ul>{mealList}</ul>
			</Card>
		</section>
	);
};

export default MealList;
