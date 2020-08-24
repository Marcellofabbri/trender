TRUNCATE TABLE measurement RESTART IDENTITY CASCADE;
TRUNCATE TABLE chart RESTART IDENTITY CASCADE;
INSERT INTO chart VALUES (2, '2020-01-01T00:00:00', 'Protein intake', 'grams', 'Daily protein intakes', 40);
INSERT INTO chart VALUES (3, '2020-01-02T00:00:00', 'Daily steps', 'steps', 'Daily steps taken', 10000);