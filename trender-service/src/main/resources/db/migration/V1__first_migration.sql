CREATE TABLE measurement (
    id SERIAL PRIMARY KEY,
    created_at timestamp(3) NOT NULL,
    value bigint NOT NULL,
    unit varchar NOT NULL
);