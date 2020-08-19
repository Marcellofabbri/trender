package eu.marcellofabbri.trender.controller;

import eu.marcellofabbri.trender.model.dto.ChartRequestCreate;
import eu.marcellofabbri.trender.model.dto.ChartResponse;
import eu.marcellofabbri.trender.model.dto.MeasurementRequestCreate;
import eu.marcellofabbri.trender.model.dto.MeasurementResponse;
import eu.marcellofabbri.trender.model.entity.Chart;
import eu.marcellofabbri.trender.model.entity.Measurement;
import eu.marcellofabbri.trender.repository.ChartRepository;
import eu.marcellofabbri.trender.repository.MeasurementRepository;
import eu.marcellofabbri.trender.service.ChartService;
import eu.marcellofabbri.trender.service.MeasurementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ChartController {

  @Autowired
  ChartRepository chartRepository;

  @Autowired
  ChartService chartService;

  @GetMapping("/charts")
  public List<Chart> getAllCharts() {

    List<Chart> list = new ArrayList<>();
    Iterable<Chart> trackers = chartRepository.findAll();
    trackers.forEach(list::add);
    return list;
  }

  @PostMapping("/charts")
  public ChartResponse createChart(@RequestBody @Valid ChartRequestCreate request) {
    return chartService.createChart(request);
  }

  @GetMapping("/charts/{id}")
  public ResponseEntity<Chart> getChart(@PathVariable("id") Long id) {

    Optional<Chart> chartData = chartRepository.findById(id);
    if (chartData.isPresent()) {
      return new ResponseEntity<>(chartData.get(), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @PutMapping("/charts/{id}")
  public ResponseEntity<Chart> updateChart(@PathVariable("id") Long id, @RequestBody Chart chart) {

    Optional<Chart> chartData = chartRepository.findById(id);
    if (chartData.isPresent()) {
      Chart savedChart = chartData.get();
      savedChart.setCreatedAt(chart.getCreatedAt());
      savedChart.setTitle(chart.getTitle());
      savedChart.setUnitName(chart.getUnitName());
      savedChart.setDescription(chart.getDescription());
      savedChart.setTarget(chart.getTarget());

      Chart updatedChart = chartRepository.save(savedChart);
      return new ResponseEntity<>(updatedChart, HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @DeleteMapping("/charts/{id}")
  public ResponseEntity<String> deleteChart(@PathVariable("id") Long id) {

    try {
      chartRepository.deleteById(id);
    } catch(Exception e) {
      return new ResponseEntity<>("Failed to delete", HttpStatus.EXPECTATION_FAILED);
    }

    return new ResponseEntity<>("Chart has been deleted", HttpStatus.OK);
  }
}
