// JAMROCK DELIVERY SERVICE
// Database configuration

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.warn(
    "DATABASE_URL is not configured. " +
    "The application is currently using temporary storage."
  );
}

module.exports = {
  DATABASE_URL
};
