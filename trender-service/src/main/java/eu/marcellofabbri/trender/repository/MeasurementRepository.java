package eu.marcellofabbri.trender.repository;

import eu.marcellofabbri.trender.model.entity.Measurement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

public interface MeasurementRepository extends CrudRepository<Measurement, Long> {

  @Query("FROM #{#entityName} WHERE chartID=:chartID")
  public Iterable<Measurement> findByChartID(long chartID);
}
