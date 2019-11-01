const router = require("express").Router();

const db = require("../../data/helpers/projectModel");
const { 
    validateProjectId, 
    validateProject 
} = require("./projectsMiddleware");

//  Get All Projects
router.get("/", (req, res) => {
    db.get()
    .then(projects => res.status(200).json(projects))
    .catch(err => res.status(500).json({ error: "Failed to get all projects." }))
})

// Get project by ID
router.get("/:id", validateProjectId, (req, res) => {
    db.get(req.user)
    .then(project => res.status(200).json(project))
    .catch(err => res.status(500).json({ error: `Failed to get project with id:${id}.` }))
})

// Add new project
router.post("/", validateProject, (req, res) => {
    db.insert(req.body)
    .then(project => res.status(201).json(project))
    .catch(err => res.status(500).json({ error: "Failed to create new project." }))
})

// Edit a project
router.put("/:id", validateProjectId, validateProject, (req, res) => {
    const updatedInfo = req.body;

    db.update(req.user, updatedInfo)
    .then(project => res.status(201).json(project))
    .catch(err => res.status(500).json({ error: `Failed to edit project with id:${req.user}.` }))
})

// Remove a project
router.delete("/:id", validateProjectId, (req, res) => {
    db.remove(req.user)
    .then(removed => res.status(200).json(removed))
    .catch(err => res.status(500).json({ error: `Failed to remove project with id:${req.user}.` }))
})



module.exports = router;