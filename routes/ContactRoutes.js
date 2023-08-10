const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateMiddlewaretoken");

const {
  getcontact,
  createContact,
  updateContact,
  deleteContact,
  getConatctbyId,
} = require("../controllers/contactControllers.js");

// router.get('/', getcontact)
// router.get('/:id', getConatctbyId);
// router.post('/', createContact);
// router.put('/:id', updateContact);
// router.delete('/:id', deleteContact);


router.use(validateToken);
router.route("/").get(getcontact).post(createContact);

router
  .route("/:id")
  .get(getConatctbyId)
  .put(updateContact)
  .delete(deleteContact);

module.exports = router;
