ALTER TABLE measurement
ADD CONSTRAINT measurement_fk_chart
FOREIGN KEY (chartID)
REFERENCES chart (id)