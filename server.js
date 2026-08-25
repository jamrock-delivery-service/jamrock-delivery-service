const express = require("express");
const cors = require("cors");
require("dotenv").config();

const shipments = require("./shipments");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("."));

/* Homepage */
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

/* Server status */
app.get("/api/status", (req, res) => {
  res.json({
    success: true,
    message: "JAMROCK DELIVERY SERVICE server is running."
  });
});

/* Track shipment */
app.get("/api/track/:trackingNumber", (req, res) => {
  const shipment = shipments.findShipment(
    req.params.trackingNumber
  );

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
  try {
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
        message:
          "Tracking number, receiver and destination are required."
      });
    }

    if (shipments.findShipment(trackingNumber)) {
      return res.status(409).json({
        success: false,
        message: "Tracking number already exists."
      });
    }

    const shipment = shipments.createShipment({
      trackingNumber,
      sender,
      receiver,
      origin,
      destination,
      estimatedDelivery
    });

    res.status(201).json({
      success: true,
      message: "Shipment created successfully.",
      shipment
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to create shipment."
    });
  }
});

/* Update shipment */
app.patch("/api/shipments/:trackingNumber", (req, res) => {
  const shipment = shipments.updateShipment(
    req.params.trackingNumber,
    {
      status: req.body.status,
      estimatedDelivery: req.body.estimatedDelivery
    }
  );

  if (!shipment) {
    return res.status(404).json({
      success: false,
      message: "Tracking number not found."
    });
  }

  res.json({
    success: true,
    message: "Shipment updated successfully.",
    shipment
  });
});

/* View all shipments */
app.get("/api/shipments", (req, res) => {
  res.json({
    success: true,
    shipments: shipments.getShipments()
  });
});

/* Delete shipment */
app.delete("/api/shipments/:trackingNumber", (req, res) => {
  const deleted = shipments.removeShipment(
    req.params.trackingNumber
  );

  if (!deleted) {
    return res.status(404).json({
      success: false,
      message: "Tracking number not found."
    });
  }

  res.json({
    success: true,
    message: "Shipment deleted successfully."
  });
});

/* Start server */
app.listen(PORT, () => {
  console.log(
    `JAMROCK DELIVERY SERVICE running on port ${PORT}`
  );
});
