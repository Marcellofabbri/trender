package eu.marcellofabbri.trender.repository;

import eu.marcellofabbri.trender.model.entity.Chart;
import eu.marcellofabbri.trender.model.entity.Measurement;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface ChartRepository extends CrudRepository<Chart, Long> {
  @Query("FROM #{#entityName} WHERE userID=:userID")
  public Iterable<Chart> findByUserID(long userID);
}
