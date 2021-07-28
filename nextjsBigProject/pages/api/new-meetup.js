//api/new-meetup is a api endpoint
import { MongoClient } from "mongodb";
async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    //const { title, image, address, description } = data;
    //this is use for connection with mongobd cluster
    //it return promise
    const client = await MongoClient.connect(
      "mongodb+srv://Sagar_1997:sagar123@cluster0.rblqo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    );
    const db = client.db();
    //collection is just like table and document is like single row
    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
