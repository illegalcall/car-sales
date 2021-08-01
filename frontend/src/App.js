import { useState, useEffect } from "react";
// import carDataArray from "./carData";
import CarDetailCard from "./CarDetailCard";
import "./App.css";
import { Button, Grid } from "@material-ui/core";
import AddCarForm from "./AddCarForm";
import axios from "axios";
function App() {
  let sales = [];
  const [addCarFormDisplay, setaddCarFormDisplay] = useState("none");
  const addCarEntryForm = () => {
    if (addCarFormDisplay === "none") setaddCarFormDisplay("block");
    else setaddCarFormDisplay("none");
  };
  const [carDataArray, setcarDataArray] = useState([]);
  const [saleDataArray, setsaleDataArray] = useState([]);
  useEffect(() => {
    async function getAllCars() {
      try {
        const carTempArray = await axios.get(
          "http://localhost:3001/all-cars-data"
        );
        let temp = JSON.parse(carTempArray.data);
        setcarDataArray(temp);
      } catch (error) {
        console.error(error);
      }
    }
    getAllCars();
    async function getAllSales() {
      try {
        const salesTempArray = await axios.get(
          "http://localhost:3001/all-sales-data"
        );
        let temp = JSON.parse(salesTempArray.data);
        setsaleDataArray(temp);
      } catch (error) {
        console.error(error);
      }
    }
    getAllSales();
  }, []);
  return (
    <div className="App">
      <div className="add-new-car">
        <Button color="primary" variant="contained" onClick={addCarEntryForm}>
          Add a new Car
        </Button>
        <div style={{ display: `${addCarFormDisplay}` }}>
          <AddCarForm setcarDataArray={setcarDataArray} />
        </div>
      </div>
      <Grid container>
        <Grid item container xs={6}>
          {carDataArray.map((car) => {
            return (
              <CarDetailCard
                key={car["SKU"]}
                car={car}
                saleDataArray={saleDataArray}
              />
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
