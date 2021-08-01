import React, { useState } from "react";
import { Grid, TextField } from "@material-ui/core";
import axios from "axios";
const AddCarForm = ({ setcarDataArray }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    let carObj = {
      sku,
      carName,
      carModel,
      price,
    };

    //update in frontend array
    setcarDataArray((prevState) => [...prevState, carObj]);
    //send to backend
    const sendPostRequest = async () => {
      try {
        const resp = await axios.post(
          "http://localhost:3001/add-new-car",
          carObj
        );
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    };
    sendPostRequest();

    //clear
    e.target.reset();
    setsku("");
    setcarModel("");
    setcarName("");
    setprice("");
  };
  const [sku, setsku] = useState("");
  const [carName, setcarName] = useState("");
  const [carModel, setcarModel] = useState("");
  const [price, setprice] = useState("");

  return (
    <div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <Grid container>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="SKU"
              variant="outlined"
              size="small"
              type="text"
              name={sku}
              onChange={(e) => {
                setsku(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Car Name"
              variant="outlined"
              size="small"
              type="text"
              name={carName}
              onChange={(e) => {
                setcarName(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Car Model"
              variant="outlined"
              size="small"
              type="text"
              name={carModel}
              onChange={(e) => {
                setcarModel(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Price"
              variant="outlined"
              size="small"
              type="price"
              name={price}
              onChange={(e) => {
                setprice(e.target.value);
              }}
            />
          </Grid>
        </Grid>

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AddCarForm;
