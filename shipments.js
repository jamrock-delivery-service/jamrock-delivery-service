// shipments.js
// JAMROCK DELIVERY SERVICE

const database = require("./database");

function createShipment(data) {
  const shipment = {
    trackingNumber: data.trackingNumber.toUpperCase(),
    sender: data.sender || "",
    receiver: data.receiver || "",
    origin: data.origin || "",
    destination: data.destination || "",
    status: "Shipment Created",
    estimatedDelivery: data.estimatedDelivery || "Pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  return database.createShipment(shipment);
}

function findShipment(trackingNumber) {
  return database.getShipment(
    trackingNumber.toUpperCase()
  );
}

function updateShipment(trackingNumber, updates) {
  return database.updateShipment(
    trackingNumber.toUpperCase(),
    {
      ...updates,
      updatedAt: new Date().toISOString()
    }
  );
}

function getShipments() {
  return database.getAllShipments();
}

function removeShipment(trackingNumber) {
  return database.deleteShipment(
    trackingNumber.toUpperCase()
  );
}

module.exports = {
  createShipment,
  findShipment,
  updateShipment,
  getShipments,
  removeShipment
};
