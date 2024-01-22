const { createConnection } = require('typeorm');

const connectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432, // Default PostgreSQL port
  username: 'ogb',
  password: 'admin',
  database: 'postgres',
  synchronize: true,
  logging: true, // Set to true to see logs, can be omitted in production
  entities: [__dirname + '/path/to/entities/**/*.js'], // Adjust the path to your entity files
};

async function testConnection() {
  try {
    const connection = await createConnection(connectionOptions);
    console.log('Connection to the database successful!');
    await connection.close();
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
  }
}

// Call the function to test the connection
testConnection();
