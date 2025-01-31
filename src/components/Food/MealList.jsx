import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import styles from "./MealList.module.css";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Caesar Salad with Chicken",
    description:
      "Romaine lettuce, chicken, parmesan, croutons, Caesar dressing",
    price: 9.99,
  },
  {
    id: "m2",
    name: "Margherita Pizza",
    description: "Tomato sauce, mozzarella, basil",
    price: 12.99,
  },
  {
    id: "m3",
    name: "Carbonara",
    description: "Spaghetti, egg, parmesan, bacon, creamy sauce",
    price: 10.99,
  },
  {
    id: "m4",
    name: "Niçoise Salad",
    description: "Tuna, eggs, potatoes, green beans, anchovies, olive oil",
    price: 8.99,
  },
];

const MealList = () => {
  const mealList = DUMMY_MEALS.map((meal) => (
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
