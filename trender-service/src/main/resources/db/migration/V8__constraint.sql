ALTER TABLE chart
ADD CONSTRAINT users_fk_chart
FOREIGN KEY (userID)
REFERENCES users (id)