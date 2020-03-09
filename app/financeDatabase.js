const MongoClient = require(`mongodb`).MongoClient;
const ObjectId = require(`mongodb`).ObjectID
const dbUri = `mongodb://localhost:27017`;
// const dbName = `antondashboard`;
const dbName = `mydb`;
// const dbCollection = `finances`;
const dbCollection = `movie`;


class FinanceDatabase {

    constructor(){
        this.client;
    }
    async openConnection() {
        this.client = new MongoClient(dbUri, { useUnifiedTopology: true, useNewUrlParser: true });

        await this.client.connect();

        let collection = this.client.db(dbName).collection(dbCollection);

        return collection;
    }

    async closeConnection() {
        await this.client.close();
        console.log(`connection is closed`);
    }

    async addEntry(source, amount, income, date) {

        let collection = await this.openConnection();

        await collection.insertOne({ source: source, amount: amount, income: income, date: date });

        await this.closeConnection();
    }

    async getAllEntries(){
        try{

            let collection = await this.openConnection();
    
            let entries = await collection.find()
            let entriesArray = await entries.toArray();
    
            await this.closeConnection();
    
            return entriesArray;
        }
        catch(error){
            console.log(error);
        }
    }

    async getEntry(id){
        let collection = await this.openConnection();

        let entry = await collection.findOne({_id: ObjectId(id)});

        console.log(entry);
        await this.closeConnection();

        return entry;
    }

    async removeEntry(id){
        let collection = await this.openConnection();

        try{
            await collection.deleteOne({_id: ObjectId(id)});
        }
        catch(error){
            console.log(error);
        }

        await this.closeConnection();
    }

    async editEntry(id, entry){
        let collection = await this.openConnection();

        await collection.findOneAndUpdate({_id: ObjectId(id)}, {$set: entry});

        await this.closeConnection();
    }

}

module.exports = new FinanceDatabase();