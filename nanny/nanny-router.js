const express = require("express");

const Nannies = require("./nanny-model.js");
const restricted = require("../auth/restricted-middleware");
const router = express.Router();

router.get("/", restricted, (req, res) => {
  Nannies.findAllNannies()
    .then(nanny => {
      res.json(nanny);
    })
    .catch(error => {
      res.status(500).json({
        message: "failed to get nannies"
      });
    });
});

router.get("/:id", restricted, (req, res) => {
  const { id } = req.params;

  Nannies.findNannyById(id)
    .then(nanny => {
      if (nanny) {
        res.json(nanny);
      } else {
        res
          .status(404)
          .json({ message: "Could not find nanny with given id." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get nannies" });
    });
});

router.post("/", restricted, (req, res) => {
  const nannyData = req.body;

  Nannies.addNanny(nannyData)
    .then(nanny => {
      res.status(201).json(nanny);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to create new nanny" });
    });
});

router.put("/:id", restricted, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Nannies.findNannyById(id)
    .then(nanny => {
      if (nanny) {
        Nannies.updateNanny(changes, id).then(updatedNanny => {
          res.json(updatedNanny);
        });
      } else {
        res.status(404).json({ message: "Could not find nanny with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to update nanny" });
    });
});

router.delete("/:id", restricted, (req, res) => {
  const { id } = req.params;

  Nannies.removeNanny(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: "Could not find nanny with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to delete nanny" });
    });
});
module.exports = router;
