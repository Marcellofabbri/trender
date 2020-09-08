package eu.marcellofabbri.trender.service;

import eu.marcellofabbri.trender.model.dto.ChartRequestCreate;
import eu.marcellofabbri.trender.model.dto.ChartResponse;
import eu.marcellofabbri.trender.model.entity.Chart;
import eu.marcellofabbri.trender.repository.ChartRepository;
import eu.marcellofabbri.trender.repository.ChartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChartService {

  @Autowired
  private ChartRepository chartRepository;

  public ChartResponse createChart(ChartRequestCreate request) {
    Chart newChart = new Chart(request.getCreatedAt(), request.getTitle(), request.getUnitName(), request.getDescription(), request.getTarget(), request.getUserID());
    Chart save = chartRepository.save(newChart);
    ChartResponse response = new ChartResponse(save.getId(), save.getCreatedAt(), save.getTitle(), save.getUnitName(), save.getDescription(), save.getTarget(), save.getUserID());
    return response;
  }
}
