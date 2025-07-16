const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { execFile } = require('child_process');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/simulate', (req, res) => {
  const scriptId = req.body.scriptId;
  
  if (!scriptId) {
    return res.status(400).json({
      status: 'error',
      message: 'scriptId is required'
    });
  }

  const scriptPath = path.join(__dirname, 'ransomware_sim.bat');

  execFile(scriptPath, (error, stdout, stderr) => {
    if (error) {
      console.error('Execution error:', error);
      return res.status(500).json({
        status: 'error',
        message: error.message || 'Internal server error',
        details: stderr
      });
    }

    console.log(`Executed ${scriptId}`);
    console.log('Output:', stdout);

    return res.status(200).json({
      status: 'success',
      output: stdout,
      scriptId: scriptId
    });
  });
});

app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    details: err.message
  });
});

app.listen(PORT, () => {
  console.log(`Simulation API running on http://localhost:${PORT}`);
});
