const express = require('express');
const Project = require('../models/Project');
const ProjectSubmission = require('../models/ProjectSubmission');
const auth = require('../middleware/auth');

const router = express.Router();

// List projects with filters
router.get('/', async (req, res) => {
  try {
    const { q, difficulty, technology, company } = req.query;
    const filter = {};
    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { 'alumni.name': { $regex: q, $options: 'i' } },
        { 'alumni.company': { $regex: q, $options: 'i' } },
      ]
    }
    if (difficulty) filter.difficulty = difficulty;
    if (technology) filter.skills = { $in: [new RegExp(technology, 'i')] };
    if (company) filter['alumni.company'] = { $regex: company, $options: 'i' };
    const projects = await Project.find(filter).sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create project (alumni or admin - for now allow any authenticated user)
router.post('/', auth, async (req, res) => {
  try {
    const project = await Project.create({ ...req.body, createdBy: req.user.id });
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update project
router.put('/:id', auth, async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete project
router.delete('/:id', auth, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Submit to a project
router.post('/:id/submissions', auth, async (req, res) => {
  try {
    const { description, technologies, files } = req.body; // files metadata after upload
    const submission = await ProjectSubmission.create({
      project: req.params.id,
      student: req.user.id,
      description,
      technologies,
      files,
      status: 'Submitted',
    });
    res.status(201).json(submission);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// List my submissions
router.get('/me/submissions', auth, async (req, res) => {
  try {
    const list = await ProjectSubmission.find({ student: req.user.id }).populate('project');
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;



