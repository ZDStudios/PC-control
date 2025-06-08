const express = require('express');
const { exec } = require('child_process');

const app = express();
app.use(express.json());

app.post('/command', (req, res) => {
    const action = req.body.action;

    let command;
    if (action === 'shutdown') command = 'shutdown -s -t 0'; // Windows
    else if (action === 'restart') command = 'shutdown -r -t 0';
    else if (action === 'lock') command = 'rundll32.exe user32.dll,LockWorkStation';

    if (command) {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                return res.json({ message: `Error: ${stderr}` });
            }
            res.json({ message: `Executed: ${action}` });
        });
    } else {
        res.json({ message: 'Invalid command' });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
