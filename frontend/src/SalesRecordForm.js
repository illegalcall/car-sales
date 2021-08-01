import React, { useState } from "react";
import { Grid, TextField } from "@material-ui/core";
import axios from "axios";
const SalesRecordForm = ({ sku }) => {
  const handleSubmit = (e) => {
    //e.preventDefault();
    let salesObj = {
      sku,
      customerName,
      salesman,
      date,
    };

    //send to backend
    const sendPostRequest = async () => {
      try {
        const resp = await axios.post(
          "http://localhost:3001/add-new-sale",
          salesObj
        );
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    };
    sendPostRequest();

    //clear
    e.target.reset();
    setsalesman("");
    setcustomerName("");
    setdate("");
  };
  const [customerName, setcustomerName] = useState("");
  const [salesman, setsalesman] = useState("");
  const [date, setdate] = useState("");

  return (
    <div className="form-card">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <Grid container>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Customer Name"
              variant="outlined"
              size="small"
              type="text"
              name={customerName}
              onChange={(e) => {
                setcustomerName(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Salesman"
              variant="outlined"
              size="small"
              type="text"
              name={salesman}
              onChange={(e) => {
                setsalesman(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              // label="date"
              variant="outlined"
              size="small"
              type="date"
              // name={date}
              onChange={(e) => {
                setdate(e.target.value);
              }}
            />
          </Grid>
        </Grid>

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default SalesRecordForm;
