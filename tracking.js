async function trackPackage() {
  const input = document.querySelector(
    ".tracking input"
  );

  const trackingNumber = input.value.trim();

  if (!trackingNumber) {
    alert("Please enter a tracking number.");
    return;
  }

  try {
    const response = await fetch(
      "/api/track/" + encodeURIComponent(trackingNumber)
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Tracking number not found.");
      return;
    }

    const shipment = data.shipment;

    alert(
      "Tracking Number: " + shipment.trackingNumber +
      "\nStatus: " + shipment.status +
      "\nDestination: " + shipment.destination +
      "\nEstimated Delivery: " +
      shipment.estimatedDelivery
    );

  } catch (error) {
    alert(
      "The tracking service is currently unavailable."
    );
  }
}
