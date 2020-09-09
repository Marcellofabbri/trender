package eu.marcellofabbri.trender.repository;

import eu.marcellofabbri.trender.model.entity.Chart;
import eu.marcellofabbri.trender.model.entity.Measurement;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface ChartRepository extends CrudRepository<Chart, Long> {
  @Query("FROM #{#entityName} WHERE username=:username")
  public Iterable<Chart> findByUsername(String username);
}
