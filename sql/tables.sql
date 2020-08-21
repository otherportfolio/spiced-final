-- DROP TABLE IF EXISTS users;

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

CREATE TABLE friendships( id SERIAL PRIMARY KEY,
     sender_id INT REFERENCES users(id) NOT NULL,
     recipient_id INT REFERENCES users(id) NOT NULL,
     accepted BOOLEAN DEFAULT false);

CREATE TABLE chat_messages(
    id SERIAL PRIMARY KEY,
    message VARCHAR NOT NULL CHECK (message <> ''),
    sender_id INT NOT NULL REFERENCES users(id),
    ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE feed(
    id SERIAL PRIMARY KEY,
    content VARCHAR NOT NULL CHECK (content <> ''),
    sender_id INT NOT NULL REFERENCES users(id),
    recipient_id INT REFERENCES users(id) NOT NULL,
    ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE article(
    id SERIAL PRIMARY KEY,
    author VARCHAR(255),
    title VARCHAR,
    subline VARCHAR,
    highlights VARCHAR,
    intro VARCHAR,
    chapter VARCHAR,
    endnotes VARCHAR,
    byline VARCHAR,
    main VARCHAR,
    ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE issues(
    id SERIAL PRIMARY KEY,
    issue_nr VARCHAR(255),
    issue_month VARCHAR,
    issue_title VARCHAR,
    issue_index VARCHAR,
    ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- DROP TABLE IF EXISTS media;

CREATE TABLE media(
    id SERIAL PRIMARY KEY,
    article_id INT NOT NULL REFERENCES article(id),
    word VARCHAR,
    link VARCHAR,
    ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
