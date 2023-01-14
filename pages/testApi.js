import { useMongoDBConnection } from './useMongoDBConnection';

function MyComponent() {
  const clientPromise = useMongoDBConnection();

  return clientPromise ? <div>Connected</div> : <div>Loading...</div>;
}

// you should use require instead of import when working with MongoDB driver