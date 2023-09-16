import { MongoClient } from 'mongodb'

async function handler(req, res) {

  // if (req.method = 'POST') {
  //   const userEmail = req.body.email;
  //   if (!userEmail || !userEmail.includes('@')) {
  //     res.status(422).json({ message: 'Invalid email addrress' });
  //     return;
  //   }

  //   const client = await MongoClient.connect('mongodb+srv://Masilo1977:Masilo1977@cluster0.kldad7d.mongodb.net/newsletter?retryWrites=true&w=majority')

  //   const db = client.db();
  //   await db.collection('emails').insertOne({ email: userEmail })

  //   client.close();

  //   res.status(201).json({ message: 'Signed up!' })
  // }

  const userEmail = req.body.email;

  const client = await MongoClient.connect('mongodb+srv://Masilo1977:Masilo1977@cluster0.kldad7d.mongodb.net/events?retryWrites=true&w=majority')
  const db = client.db();

  await db.collection('emails').insertOne({ email: userEmail })

  client.close();

  res.status(201).json({ message: 'Signed up!' })



}

export default handler;