package eu.marcellofabbri.trender.assemblers;

import eu.marcellofabbri.trender.model.dto.ChartRequestCreate;
import eu.marcellofabbri.trender.model.entity.Chart;

public class ChartAssembler {
  public Chart requestCreateToDomainObject(ChartRequestCreate chartRequestCreate) {
    Chart chart = new Chart(
            chartRequestCreate.getCreatedAt(),
            chartRequestCreate.getTitle(),
            chartRequestCreate.getUnitName(),
            chartRequestCreate.getDescription(),
            chartRequestCreate.getTarget()
    );
    return chart;
  }
}
