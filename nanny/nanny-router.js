const express = require("express");

const Nannies = require("./nanny-model.js");
// const db = require("../database/db-config");

const router = express.Router();

router.get("/", (req, res) => {
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

router.get("/:id", (req, res) => {
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

router.post("/", (req, res) => {
  const nannyData = req.body;

  Nannies.addNanny(nannyData)
    .then(nanny => {
      res.status(201).json(nanny);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to create new nanny" });
    });
});

router.put("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
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
