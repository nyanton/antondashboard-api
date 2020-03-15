const express = require(`express`);
const financeDB = require(`./financeDatabase`);
const app = express();
const port = 3001;

app.use(express.json());

app.get(`/all`, async (req, res) => {
    let entries = await financeDB.getAllEntries();
    res.send(entries)
});

app.get(`/entry/:id`, async (req, res) => {
    let id = req.params.id;
    let entry = await financeDB.getEntry(id);
    res.send(entry);
})

app.post(`/addFinance`, async (req, res) => {
    try{
        let date = Date.now();
        await financeDB.addEntry(req.body.source, req.body.amount, req.body.income, date);
        res.sendStatus(200);
    }
    catch(error){
        console.error(error);
        res.sendStatus(500);
    }

})

app.post(`/removeEntry`, async (req, res) => {
    try{
        await financeDB.removeEntry(req.body.id);
        res.sendStatus(200);
    }
    catch(error){
        console.error(`Something has gone wrong:  ${error}`);
        res.sendStatus(500);
    }
})

app.listen(port, () => console.log(`listening on port ${port}`));