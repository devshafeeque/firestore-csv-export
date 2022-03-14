const admin = require("firebase-admin");
const fs = require("fs");

const serviceAccount = require("./service-account.json");
const { Parser } = require('json2csv');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mind-next.firebaseio.com"
});
const db = admin.firestore();


const fields = ["field1", "field1"]

async function getEnquiries() {
  const snapshot = await db.collection('<COLLECTION_NAME>').get();
  const output = []

  snapshot.forEach(doc => {
    output.push(doc.data())
  });

  const parser = new Parser({
    fields,
  });

  const csv = parser.parse(output);
  fs.writeFileSync('outputFile.csv', csv);
}

getEnquiries().then(() => {
  console.log('done');
})