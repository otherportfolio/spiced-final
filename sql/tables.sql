DROP TABLE IF EXISTS users;

CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      first VARCHAR(255) NOT NULL,
      last VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      url VARCHAR,
      bio VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE password_reset_codes(
    id SERIAL PRIMARY KEY,
    email VARCHAR,
    code VARCHAR(6),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);