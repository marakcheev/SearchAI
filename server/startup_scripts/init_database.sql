CREATE TABLE IF NOT EXISTS UserAccount 
(
    UserId          SERIAL          PRIMARY KEY,
    UserEmail       VARCHAR (255)   NOT NULL,
    AuthToken       VARCHAR (255),
    PremiumStatus   BOOLEAN         DEFAULT FALSE
);
