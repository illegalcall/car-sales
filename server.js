require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
app.use(cors());
const port = process.env.PORT || 3001;
app.use(bodyParser.json());
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
const { Schema } = mongoose;
const carSchema = new Schema({
  sku: String,
  carName: String,
  carModel: String,
  price: Number,
});
const saleSchema = new Schema({
  sku: String,
  customerName: String,
  salesman: String,
  date: String,
});
const Car = mongoose.model("Car", carSchema);
const Sale = mongoose.model("Sale", saleSchema);
const createNewCar = async ({ sku, carName, carModel, price }) => {
  await Car.create({ sku, carName, carModel, price });
};
const createNewSale = async ({ sku, customerName, salesman, date }) => {
  await Sale.create({ sku, customerName, salesman, date });
};
app.post("/add-new-car", async (req, res) => {
  console.log(req.body);
  let carCreatingSuccess = (await createNewCar(req.body)) ? true : false;
  console.log(carCreatingSuccess);
  res.status(200).send("ok");
});
app.post("/add-new-sale", async (req, res) => {
  console.log(req.body);
  let saleCreatingSuccess = (await createNewSale(req.body)) ? true : false;
  console.log(saleCreatingSuccess);
  res.status(200).send("ok");
});

//console.log(carDataJSON);
const getAllCarsFromDB = async () => {
  const allCars = await Car.find({}, function (err, cars) {
    if (err) return console.error(err);
    console.log(cars);
  });
  return allCars;
};
const getAllSalesFromDB = async () => {
  const allSales = await Sale.find({}, function (err, sales) {
    if (err) return console.error(err);
    console.log(sales);
  });
  return allSales;
};
app.get("/", (req, res) => {
  res.send("Server Started");
});
app.get("/all-cars-data", async (req, res) => {
  let carsFromDb = await getAllCarsFromDB();
  let carsFromDbJson = JSON.stringify(carsFromDb);
  console.log(carsFromDb);
  res.json(carsFromDbJson);
});
app.get("/all-sales-data", async (req, res) => {
  let salesFromDb = await getAllSalesFromDB();
  let salesFromDbJson = JSON.stringify(salesFromDb);
  console.log(salesFromDb);
  res.json(salesFromDbJson);
});
app.listen(port, (req, res) => {
  console.log(`Server running on ${port}`);
});
