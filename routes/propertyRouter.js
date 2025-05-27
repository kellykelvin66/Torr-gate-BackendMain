const router = require("express").Router();
const {
  createProperty,
  getLandlordsProperties,
  updatePropertyAvaliability,
  getAllproperties,
  getAproperty,
} = require("../controllers/propertycontroller");
const {
  isLoggedIn,
  requirePermission,
  requirePermissions,
} = require("../middleware/auth");

router.post("/", isLoggedIn, requirePermissions("landlord"), createProperty);

router.get(
  "/lanlord",
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
// tenants
router.get("/", isLoggedIn, getAllproperties);
router.get("/:propertyId", isLoggedIn, getAproperty);

module.exports = router;
