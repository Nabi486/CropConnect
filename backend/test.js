const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://NABIALAM:nabiboass1234node test.js@cluster0.3jjd1mr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function run() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log("✅ Connected!");
    await client.close();
  } catch (err) {
    console.error(err);
  }
}

run();