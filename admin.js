async function createShipment() {
  const data = {
    trackingNumber: document.getElementById("trackingNumber").value.trim(),
    sender: document.getElementById("sender").value.trim(),
    receiver: document.getElementById("receiver").value.trim(),
    origin: document.getElementById("origin").value.trim(),
    destination: document.getElementById("destination").value.trim(),
    estimatedDelivery: document.getElementById("estimatedDelivery").value.trim()
  };

  if (!data.trackingNumber || !data.receiver || !data.destination) {
    showResult("result", "Please enter the tracking number, receiver and destination.");
    return;
  }

  try {
    const response = await fetch("/api/shipments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (!response.ok) {
      showResult("result", result.message || "Unable to create shipment.");
      return;
    }

    showResult(
      "result",
      "Shipment created successfully. Tracking number: " +
      result.shipment.trackingNumber
    );

  } catch (error) {
    showResult("result", "The server could not be reached.");
  }
}


async function updateShipment() {
  const trackingNumber =
    document.getElementById("updateTracking").value.trim();

  const status =
    document.getElementById("status").value;

  const estimatedDelivery =
    document.getElementById("updateDelivery").value.trim();

  if (!trackingNumber) {
    showResult("updateResult", "Enter a tracking number.");
    return;
  }

  try {
    const response = await fetch(
      "/api/shipments/" + encodeURIComponent(trackingNumber),
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          status,
          estimatedDelivery
        })
      }
    );

    const result = await response.json();

    if (!response.ok) {
      showResult(
        "updateResult",
        result.message || "Unable to update shipment."
      );
      return;
    }

    showResult(
      "updateResult",
      "Shipment updated successfully. New status: " +
      result.shipment.status
    );

  } catch (error) {
    showResult(
      "updateResult",
      "The server could not be reached."
    );
  }
}


function showResult(elementId, message) {
  const element = document.getElementById(elementId);

  if (!element) return;

  element.style.display = "block";
  element.textContent = message;
          }
