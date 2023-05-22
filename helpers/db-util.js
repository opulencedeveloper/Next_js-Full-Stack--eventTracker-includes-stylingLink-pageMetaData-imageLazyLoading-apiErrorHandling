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

  //find() fetches all the data from the collection
  //sort(), -1 means youre sorting in a descending manner, +1 means ascending
  //we did this to fetch the latest comment in the collection, since we are fetching it from the button
  //toArray() converts the data to an array
  //The filter = {} parameter allows us to set a filter for finding 1 document. The default (an empty object: {}) ensures that NO filter is applied (i.e. we get ALL documents).
  
  const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    //.sort({ _id: -1 })
    .toArray();

    return documents;
}
