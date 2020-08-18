package eu.marcellofabbri.trender.controller;

import eu.marcellofabbri.trender.model.dto.MeasurementRequestCreate;
import eu.marcellofabbri.trender.model.dto.MeasurementResponse;
import eu.marcellofabbri.trender.model.entity.Measurement;
import eu.marcellofabbri.trender.repository.MeasurementRepository;
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
public class MeasurementController {

    @Autowired
    MeasurementRepository measurementRepository;

    @Autowired
    MeasurementService measurementService;

    @GetMapping("/measurement")
    public List<Measurement> getAllMeasurements() {

        List<Measurement> list = new ArrayList<>();
        Iterable<Measurement> trackers = measurementRepository.findAll();
        trackers.forEach(list::add);
        return list;
    }

    @PostMapping("/measurement")
    public MeasurementResponse createMeasurement(@RequestBody @Valid MeasurementRequestCreate request) {
        return measurementService.createMeasurement(request);
    }

    @GetMapping("/measurement/{id}")
    public ResponseEntity<Measurement> getMeasurement(@PathVariable("id") Long id) {

        Optional<Measurement> measurementData = measurementRepository.findById(id);
        if (measurementData.isPresent()) {
            return new ResponseEntity<>(measurementData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/measurement/{id}")
    public ResponseEntity<Measurement> updateMeasurement(@PathVariable("id") Long id, @RequestBody Measurement measurement) {

        Optional<Measurement> measurementData = measurementRepository.findById(id);
        if (measurementData.isPresent()) {
            Measurement savedMeasurement = measurementData.get();
            savedMeasurement.setCreatedAt(measurement.getCreatedAt());
            savedMeasurement.setValue(measurement.getValue());
            savedMeasurement.setUnit(measurement.getUnit());
            savedMeasurement.setChartID(measurement.getChartID());

            Measurement updatedMeasurement = measurementRepository.save(savedMeasurement);
            return new ResponseEntity<>(updatedMeasurement, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/measurement/{id}")
    public ResponseEntity<String> deleteMeasurement(@PathVariable("id") Long id) {

        try {
            measurementRepository.deleteById(id);
        } catch(Exception e) {
            return new ResponseEntity<>("Failed to delete", HttpStatus.EXPECTATION_FAILED);
        }

        return new ResponseEntity<>("Record has been deleted", HttpStatus.OK);
    }
}
