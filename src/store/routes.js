const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get("/", controller.getStores);
router.post("/", controller.addStore);
router.get("/:id", controller.getStoreById);
router.put("/:id", controller.updateStore);
router.delete("/:id", controller.removeStore);
router.get("/email/:email", controller.getEmail);

module.exports = router;
