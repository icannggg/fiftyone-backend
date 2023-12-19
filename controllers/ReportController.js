const ReportModel = require('../models/ReportModel');

async function getReports(req, res) {
    try {
      const reports = await ReportModel.getReports();
      res.status(200).json(reports);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

module.exports = {
    getReports,
  };