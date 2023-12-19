const express = require('express');
const ReportController = require('../controllers/ReportController');

const router = express.Router();

router.get('/', ReportController.getReports);

module.exports = router;
