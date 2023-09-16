import { MongoClient } from 'mongodb'

async function handler(req, res) {

    const client = await MongoClient.connect('mongodb+srv://Masilo1977:Masilo1977@cluster0.kldad7d.mongodb.net/events?retryWrites=true&w=majority')
    
    const eventId = req.query.eventId
    if (req.method === 'POST') {
        const { email, name, text } = req.body

        if (!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
            res.status(422).json({ message: 'Invalid input' });
            return;
        }
        
        const newComment = {
            
            email,
            name,
            text,
            eventId
        }

        const db = client.db()
        const result = await db.collection('comments').insertOne(newComment)

        console.log(result);
        res.status(201).json({ message: 'Added comment', comment: newComment })
    }

    if (req.method === 'GET') {
        
        const db = client.db();
       const documents = await db.collection('comments').find().toArray();

        res.status(200).json({ comments: documents })
    }
    client.close()
}
export default handler