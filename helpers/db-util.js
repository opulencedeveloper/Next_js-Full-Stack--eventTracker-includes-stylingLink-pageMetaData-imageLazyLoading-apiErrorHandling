import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://victorkudos:P6on5DWppsy8FBwE@cluster0.iogciqk.mongodb.net/?retryWrites=true&w=majority"
  );

  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db("events");

  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getAllDocuments(client, collection, sort, filter = {}) {
  const db = client.db("events");
  
  const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    //.sort({ _id: -1 })
    .toArray();

    return documents;
}
