const getStores = "SELECT * FROM stores";
const getStoreById = "SELECT * FROM stores WHERE id = $1";
const checkEmailExists = "SELECT s FROM stores s WHERE s.email = $1"
const addStore = "INSERT INTO stores (name, location, email, date, password, type) VALUES ($1, $2, $3, $4, $5, $6)";
const removeStore = "DELETE FROM stores WHERE id = $1";
const updateStore = "UPDATE stores SET name = $1 WHERE id = $2";
const getEmail = "SELECT * FROM stores WHERE email = $1";

module.exports = {
getStores,
getStoreById,
checkEmailExists,
addStore,
removeStore,
updateStore,
getEmail,
};