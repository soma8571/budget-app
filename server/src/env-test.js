import 'dotenv/config';

//console.log(process.env.MONGO_USER);

const db_conn_string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_DB}.atudqdj.mongodb.net/budget?retryWrites=true&w=majority`;

console.log(db_conn_string);