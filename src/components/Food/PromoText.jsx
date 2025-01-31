import styles from "./PromoText.module.css";

const PromoText = () => {
  return (
    <section className={styles["promo-text"]}>
      <h2>Online Restaraunt FoodR</h2>
      <p>
        FoodR is an online restaurant where your favourite dishes are made by a
        team of professional chefs.
      </p>
      <p>
        Fast work and quality products, as well as the most authentic
        ingredients give good flavour to the dishes, give pleasure from the
        meal.
      </p>
    </section>
  );
};

export default PromoText;
