package eu.marcellofabbri.trender.service;

import eu.marcellofabbri.trender.model.dto.MeasurementRequestCreate;
import eu.marcellofabbri.trender.model.dto.MeasurementResponse;
import eu.marcellofabbri.trender.model.entity.Measurement;
import eu.marcellofabbri.trender.repository.MeasurementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class MeasurementService {

    @Autowired
    private MeasurementRepository measurementRepository;

    public MeasurementResponse createMeasurement(MeasurementRequestCreate request) {
        Measurement newMeasurement = new Measurement(request.getCreatedAt(), request.getValue(), request.getUnit());
        Measurement save = measurementRepository.save(newMeasurement);
        MeasurementResponse response = new MeasurementResponse(save.getId(), save.getCreatedAt(), save.getValue(), save.getUnit());
        return response;
    }
}

