const express = require(`express`);
const financeDB = require(`./financeDatabase`);
const app = express();
const port = 3000;

app.get(`/`, async (req, res) => {
    console.log(`Someone came here!`);
    let entries = await financeDB.getAllEntries();
    res.send(entries)
});

app.listen(port, () => console.log(`listening on port ${port}`));