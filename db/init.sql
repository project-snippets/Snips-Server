DROP TABLE IF EXISTS snippet;

CREATE TABLE snippet
(
    id SERIAL PRIMARY KEY,
    code TEXT,
    title TEXT,
    description TEXT,
    favorites INT DEFAULT 0,
    author TEXT,
    language TEXT
);

-- Seed snippet with data
INSERT INTO
    snippet
    (code, title, description, language, author)
VALUES
    (
        '4 + 4',
        'addition',
        'This Description',
        'Java',
        'Uncle Sam'
    );