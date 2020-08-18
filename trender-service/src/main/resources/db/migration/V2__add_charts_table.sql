CREATE TABLE chart (
    id SERIAL PRIMARY KEY,
    created_at timestamp(3) NOT NULL,
    title varchar NOT NULL,
    unit varchar NOT NULL,
    description varchar
);