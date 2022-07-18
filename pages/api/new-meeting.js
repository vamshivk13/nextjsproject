import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  const method = req.method;
  if (method == "POST") {
    const data = req.body;
    const dbUrl =
      "mongodb+srv://Vamshi:vk123kar@cluster0.yglo7.mongodb.net/meetups?retryWrites=true&w=majority";
    try {
      const connection = await MongoClient.connect(dbUrl);
      const db = connection.db();
      const meetupCollection = db.collection("meetups");
      const result = await meetupCollection.insertOne(data);

      connection.close();
      res.status(201).json({ message: "meetup inserted" });
    } catch (err) {
      console.log("DBError", err);
    }
  }
}
