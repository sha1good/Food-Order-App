import React, { useEffect, useState } from "react";
import MealsItem from "./MealItems/MealsItem";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://my-react-https-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      const loadedData = [];
      for (const key in responseData) {
        loadedData.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedData);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      console.log("This is the error " + error.message);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    <section className={classes.mealIsLoading}>
      <p> Loading ...</p>
    </section>;
  }
  if (httpError) {
    <section className={classes.MealsError}>
      <p>{httpError}</p>
    </section>;
  }

  const mealList = meals.map((meal) => {
    return (
      <MealsItem
       id={meal.id}
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    );
  });

  return (
    <section className={classes.meals}>
      <ul>
        <Card>{mealList}</Card>
      </ul>
    </section>
  );
};

export default AvailableMeals;
