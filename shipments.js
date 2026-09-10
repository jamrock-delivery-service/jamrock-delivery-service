// JAMROCK DELIVERY SERVICE
// Shipment data and management

let shipmentList = [
  {
    trackingNumber: "JAM100001",
    sender: "Jamrock Delivery Service",
    receiver: "John Customer",
    origin: "Lagos, Nigeria",
    destination: "London, United Kingdom",
    status: "In Transit",
    estimatedDelivery: "2026-09-15",
    receiverEmail: "",
    packagePhoto: "",
    receiverAddress: "",
    receiverCity: ""
  }
];

/* Find a shipment by tracking number */
function findShipment(trackingNumber) {
  const number = String(trackingNumber).trim().toUpperCase();

  return shipmentList.find(
    shipment =>
      shipment.trackingNumber.toUpperCase() === number
  );
}

/* Create a new shipment */
function createShipment(data) {
  const shipment = {
    trackingNumber: String(data.trackingNumber).trim().toUpperCase(),
    sender: data.sender || "JAMROCK DELIVERY SERVICE",
    receiver: data.receiver,
    origin: data.origin || "Not specified",
    destination: data.destination,
    status: data.status || "Shipment Created",
    estimatedDelivery: data.estimatedDelivery || "To be confirmed",
    receiverEmail: data.receiverEmail || "",
    packagePhoto: data.packagePhoto || "",
    receiverAddress: data.receiverAddress || "",
    receiverCity: data.receiverCity || ""
  };

  shipmentList.push(shipment);

  return shipment;
}

/* Update a shipment */
function updateShipment(trackingNumber, data) {
  const shipment = findShipment(trackingNumber);

  if (!shipment) {
    return null;
  }

  if (data.status) {
    shipment.status = data.status;
  }

  if (data.estimatedDelivery) {
    shipment.estimatedDelivery = data.estimatedDelivery;
  }

  if (data.receiverEmail !== undefined) {
    shipment.receiverEmail = data.receiverEmail;
  }

  if (data.packagePhoto !== undefined) {
    shipment.packagePhoto = data.packagePhoto;
  }

  if (data.receiverAddress !== undefined) {
    shipment.receiverAddress = data.receiverAddress;
  }

  if (data.receiverCity !== undefined) {
    shipment.receiverCity = data.receiverCity;
  }

  return shipment;
}

/* Get all shipments */
function getShipments() {
  return shipmentList;
}

/* Delete a shipment */
function removeShipment(trackingNumber) {
  const number = String(trackingNumber).trim().toUpperCase();

  const index = shipmentList.findIndex(
    shipment =>
      shipment.trackingNumber.toUpperCase() === number
  );

  if (index === -1) {
    return false;
  }

  shipmentList.splice(index, 1);

  return true;
}

module.exports = {
  findShipment,
  createShipment,
  updateShipment,
  getShipments,
  removeShipment
};
