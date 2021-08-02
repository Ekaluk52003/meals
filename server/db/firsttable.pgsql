DROP table meals


CREATE TABLE meals (
	id serial PRIMARY KEY,
	name VARCHAR ( 50 ) NOT NULL,
	oz INT NOT NULL CHECK (population >= 0)

	created_on TIMESTAMP NOT NULL,
    eat_at TIMESTAMP
);