package eu.marcellofabbri.trender.repository;

import eu.marcellofabbri.trender.model.entity.Measurement;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

public interface MeasurementRepository extends CrudRepository<Measurement, Long> {

}
