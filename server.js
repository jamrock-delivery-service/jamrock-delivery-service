const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("."));

/*
  Temporary shipment data.
  Later we will replace this with a real database.
*/
const shipments = {
  "JAM100001": {
    trackingNumber: "JAM100001",
    status: "In Transit",
    sender: "JAMROCK DELIVERY SERVICE",
    receiver: "Customer",
    origin: "United Kingdom",
    destination: "Indonesia",
    estimatedDelivery: "Pending"
  }
};

/* Home */
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

/* Test server */
app.get("/api/status", (req, res) => {
  res.json({
    success: true,
    message: "JAMROCK DELIVERY SERVICE server is running."
  });
});

/* Track package */
app.get("/api/track/:trackingNumber", (req, res) => {
  const trackingNumber = req.params.trackingNumber.toUpperCase();

  const shipment = shipments[trackingNumber];

  if (!shipment) {
    return res.status(404).json({
      success: false,
      message: "Tracking number not found."
    });
  }

  res.json({
    success: true,
    shipment
  });
});

/* Create shipment */
app.post("/api/shipments", (req, res) => {
  const {
    trackingNumber,
    sender,
    receiver,
    origin,
    destination,
    estimatedDelivery
  } = req.body;

  if (!trackingNumber || !receiver || !destination) {
    return res.status(400).json({
      success: false,
      message: "Tracking number, receiver and destination are required."
    });
  }

  const number = trackingNumber.toUpperCase();

  shipments[number] = {
    trackingNumber: number,
    status: "Shipment Created",
    sender: sender || "JAMROCK DELIVERY SERVICE",
    receiver,
    origin: origin || "Not specified",
    destination,
    estimatedDelivery: estimatedDelivery || "Pending"
  };

  res.status(201).json({
    success: true,
    message: "Shipment created successfully.",
    shipment: shipments[number]
  });
});

/* Update shipment status */
app.patch("/api/shipments/:trackingNumber", (req, res) => {
  const trackingNumber = req.params.trackingNumber.toUpperCase();
  const shipment = shipments[trackingNumber];

  if (!shipment) {
    return res.status(404).json({
      success: false,
      message: "Tracking number not found."
    });
  }

  if (req.body.status) {
    shipment.status = req.body.status;
  }

  if (req.body.estimatedDelivery) {
    shipment.estimatedDelivery = req.body.estimatedDelivery;
  }

  res.json({
    success: true,
    message: "Shipment updated successfully.",
    shipment
  });
});

app.listen(PORT, () => {
  console.log(`JAMROCK server running on port ${PORT}`);
});
