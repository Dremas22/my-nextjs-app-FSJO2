import { MongoClient } from 'mongodb'

export async function connectToDatabase() {
    const client = await MongoClient.connect(
        'mongodb+srv://Masilo1977:Masilo1977@cluster0.kldad7d.mongodb.net/events?retryWrites=true&w=majority')
    return client;
}
export async function insertDocument(client, collection, document) {
    const db = client.db();
    const result = await db.collection(collection).insertOne(document)
    return result;
}

export async function getAllDocuments(client, collection, sort) {
    const db = client.db();
    const documents = await db
        .collection(collection)
        .find()
        .sort(sort)
        .toArray();

    return documents;
}
