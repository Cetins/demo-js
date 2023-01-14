import { useState, useEffect } from 'react';
const { MongoClient } = require('mongodb');

export const useMongoDBConnection = () => {
  const [clientPromise, setClientPromise] = useState(null);

  useEffect(() => {
    if (!process.env.MONGODB_URI) {
      throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
    }

    const uri = process.env.MONGODB_URI;
    const options = {};

    let client;

    if (process.env.NODE_ENV === 'development') {
      if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
      }
      setClientPromise(global._mongoClientPromise);
    } else {
      client = new MongoClient(uri, options);
      setClientPromise(client.connect());
    }
  }, []);

  return clientPromise;
};
