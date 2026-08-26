// JAMROCK DELIVERY SERVICE
// Authentication foundation

function isLoggedIn() {
  return sessionStorage.getItem("jamrock_admin") === "true";
}

function logout() {
  sessionStorage.removeItem("jamrock_admin");
  window.location.href = "admin-login.html";
}
