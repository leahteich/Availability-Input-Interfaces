import { MongoClient } from "mongodb";
import { DB_URI } from '../../$env';

const client = new MongoClient(DB_URI)
await client.connect()
export default client.db('times') // select database
