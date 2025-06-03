const router = require("express").Router();
const {
  createProperty,
  getLandlordsProperties,
  updatePropertyAvaliability,
  getAllproperties,
  getAproperty,
  deleteProperty
} = require("../controllers/propertycontroller");
const {
  isLoggedIn,
  requirePermissions,
} = require("../middleware/auth");

router.post("/", isLoggedIn, requirePermissions("landlord"), createProperty);

router.get(
  "/landlord",
  isLoggedIn,
  requirePermissions("landlord"),
  getLandlordsProperties
);

router.patch(
  "/landlord/:propertyId",
  isLoggedIn,
  requirePermissions("landlord"),
  updatePropertyAvaliability
);
router.delete("/landlord/:propertyId", isLoggedIn, requirePermissions("landlord"),deleteProperty)
// tenants
router.get("/", isLoggedIn, getAllproperties);
router.get("/:propertyId", isLoggedIn, getAproperty);

module.exports = router;
