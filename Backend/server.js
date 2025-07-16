const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { execFile } = require('child_process');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/simulate', (req, res) => {
  const scriptId = req.body.scriptId;
  const scriptPath = `Backend/ransomware_test_01.exe`;

  execFile(scriptPath, (error, stdout, stderr) => {
    if (error) {
      console.error(`Execution error: ${stderr}`);
      return res.status(500).json({ status: 'error', message: stderr });
    }
    console.log(`Executed ${scriptId}`);
    return res.status(200).json({ status: 'success', output: stdout });
  });
});

app.listen(PORT, () => {
  console.log(`Simulation API running on http://localhost:${PORT}`);
});
