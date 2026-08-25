// database.js
// JAMROCK DELIVERY SERVICE
// Database connection placeholder

let shipments = new Map();

function createShipment(shipment) {
  shipments.set(shipment.trackingNumber, shipment);
  return shipment;
}

function getShipment(trackingNumber) {
  return shipments.get(trackingNumber);
}

function updateShipment(trackingNumber, updates) {
  const shipment = shipments.get(trackingNumber);

  if (!shipment) {
    return null;
  }

  const updatedShipment = {
    ...shipment,
    ...updates
  };

  shipments.set(trackingNumber, updatedShipment);

  return updatedShipment;
}

function getAllShipments() {
  return Array.from(shipments.values());
}

function deleteShipment(trackingNumber) {
  return shipments.delete(trackingNumber);
}

module.exports = {
  createShipment,
  getShipment,
  updateShipment,
  getAllShipments,
  deleteShipment
};
