import React, { useState } from "react";
import { Button, Grid } from "@material-ui/core";
import SalesRecordForm from "./SalesRecordForm";
const CarDetailCard = ({ car, saleDataArray }) => {
  const [salesFormOpenDisplay, setsalesFormOpenDisplay] = useState("none");
  const openSalesEntryForm = () => {
    if (salesFormOpenDisplay === "none") setsalesFormOpenDisplay("block");
    else setsalesFormOpenDisplay("none");
  };
  let saleObj = {};
  saleDataArray.forEach((s) => {
    if (s.sku === car["sku"]) {
      saleObj = s;
    }
  });
  return (
    <Grid className="car-card" container item direction="column">
      <Grid container item direction="column" xs={6}>
        <Grid item>Car Details:</Grid>
        <Grid item>{car["carName"]}</Grid>
        <Grid item>{car["carModel"]}</Grid>
        <Grid item>{car["sku"]}</Grid>
        <Grid item>{car["price"]}</Grid>
      </Grid>

      <Grid container item direction="column" xs={6}>
        <Grid item>Sales Details:</Grid>
        <Grid item>{saleObj["customerName"]}</Grid>
        <Grid item>{saleObj["salesman"]}</Grid>
        <Grid item>{saleObj["date"]}</Grid>
      </Grid>
      <Grid item xs={12} style={{ marginTop: "-10px" }}>
        <Button
          className="add-sales-btn"
          color="primary"
          variant="contained"
          onClick={openSalesEntryForm}
        >
          Add sales record
        </Button>
        <div style={{ display: `${salesFormOpenDisplay}` }}>
          <SalesRecordForm sku={car["sku"]} />
        </div>
      </Grid>
    </Grid>
  );
};

export default CarDetailCard;
