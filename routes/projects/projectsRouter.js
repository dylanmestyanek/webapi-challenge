const router = require("express").Router();

const dbActions = require("../../data/helpers/actionModel");
const dbProjects = require("../../data/helpers/projectModel");
const { 
    validateProjectId, 
    validateProject 
} = require("./projectsMiddleware");

//  Get All Projects
router.get("/", (req, res) => {
    dbProjects.get()
    .then(projects => res.status(200).json(projects))
    .catch(err => res.status(500).json({ error: "Failed to get all projects." }))
})

// Get project by ID
router.get("/:id", validateProjectId, (req, res) => {
    dbProjects.get(req.projectId)
    .then(project => res.status(200).json(project))
    .catch(err => res.status(500).json({ error: `Failed to get project with id:${req.projectId}.` }))
})

// Get project's actions
router.get("/:id/actions", validateProjectId, (req, res) => {
    dbProjects.getProjectActions(req.projectId)
    .then(actions => {
        if (!actions.length) {
            res.status(404).json({ message: "This project does not have any actions." })
        } else res.status(200).json(actions)
    })
    .catch(err => res.status(500).json({ error: `Failed to get actions for project with id:${req.projectId}.` }))
})

// Add new project
router.post("/", validateProject, (req, res) => {
    dbProjects.insert(req.body)
    .then(project => res.status(201).json(project))
    .catch(err => res.status(500).json({ error: "Failed to create new project." }))
})

// Add new action to a project by Id
router.post("/:id/actions", (req, res) => {
    dbActions.insert({
        description: req.body.description,
        notes: req.body.notes,
        project_id: req.params.id
    })
    .then(action => res.status(201).json(action))
    .catch(err => res.status(500).json({ error: "Failed to create new action." }))
})

// Edit a project
router.put("/:id", validateProjectId, validateProject, (req, res) => {
    dbProjects.update(req.projectId, req.body)
    .then(project => res.status(201).json(project))
    .catch(err => res.status(500).json({ error: `Failed to edit project with id:${req.projectId}.` }))
})

// Remove a project
router.delete("/:id", validateProjectId, (req, res) => {
    dbProjects.remove(req.projectId)
    .then(removed => res.status(200).json(removed))
    .catch(err => res.status(500).json({ error: `Failed to remove project with id:${req.projectId}.` }))
})



module.exports = router;