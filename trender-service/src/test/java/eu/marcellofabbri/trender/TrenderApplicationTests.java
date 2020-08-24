package eu.marcellofabbri.trender;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jayway.jsonpath.internal.filter.ValueNode;
import eu.marcellofabbri.trender.TrenderApplication;
import eu.marcellofabbri.trender.controller.MeasurementController;
import eu.marcellofabbri.trender.model.dto.MeasurementResponse;
import eu.marcellofabbri.trender.model.entity.Chart;
import eu.marcellofabbri.trender.model.entity.Measurement;
import eu.marcellofabbri.trender.repository.ChartRepository;
import eu.marcellofabbri.trender.repository.MeasurementRepository;
import io.zonky.test.db.AutoConfigureEmbeddedDatabase;
import org.assertj.core.api.Assertions;
import org.json.JSONString;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.client.RestTemplate;

import java.io.DataInput;
import java.io.IOException;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import static org.assertj.core.api.Assertions.*;

@RunWith(SpringRunner.class)
@ActiveProfiles("test")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@Sql(executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD, scripts = "classpath:/truncate.sql")
@AutoConfigureEmbeddedDatabase
public class TrenderApplicationTests {

    OffsetDateTime TIMESTAMP = OffsetDateTime.now();

    @Test
    public void contextLoads() {
    }

    @Autowired
    private MeasurementRepository measurementRepository;

    @Autowired
    private ChartRepository chartRepository;

    private RestTemplate restTemplate = new RestTemplate();

    @org.junit.Test
    public void testGetMeasurementById() {
        measurementRepository.save(new Measurement(TIMESTAMP, 20, "grams", 2));

        ResponseEntity<MeasurementResponse> response = restTemplate.getForEntity("http://localhost:8082/measurements/1", MeasurementResponse.class);
        Assertions.assertThat(response.getStatusCode().is2xxSuccessful());

        MeasurementResponse body = response.getBody();

        Assertions.assertThat(body.getId()).isNotNull();
        Assertions.assertThat(body.getCreatedAt()).isEqualTo(TIMESTAMP);
        Assertions.assertThat(body.getValue()).isEqualTo(20);
        Assertions.assertThat(body.getUnit()).isEqualTo("grams");
    }

    @org.junit.Test
    public void testPostMeasurement() {
        Measurement measurement = new Measurement(TIMESTAMP, 30, "milliliters", 2);
        HttpEntity<Measurement> request = new HttpEntity<>(measurement);
        ResponseEntity<Measurement> response = restTemplate.exchange(
                "http://localhost:8082/measurements",
                HttpMethod.POST,
                request,
                Measurement.class);

        Assertions.assertThat(response.getStatusCode().is2xxSuccessful());

        Measurement responseBody = response.getBody();
        Assertions.assertThat(responseBody.getCreatedAt()).isEqualTo(TIMESTAMP);
        Assertions.assertThat(responseBody.getValue()).isEqualTo(30);
        Assertions.assertThat(responseBody.getUnit()).isEqualTo("milliliters");
    }

    @org.junit.Test
    public void testGetMeasurementsWhereChartIDisChartID() throws JsonProcessingException {
        //create two measurements for chart "Steps taken (id=3)" and one for chart "Daily protein intakes (id=2)"
        Measurement measurement1 = new Measurement(TIMESTAMP, 5000, "steps", 3);
        Measurement measurement2 = new Measurement(TIMESTAMP.plusDays(1), 6000, "steps", 3);
        Measurement measurement3 = new Measurement(TIMESTAMP.plusDays(2), 50, "grams", 2);
        measurementRepository.save(measurement1);
        measurementRepository.save(measurement2);
        measurementRepository.save(measurement3);
        //assert the method retrieves only the ones from chart "Steps taken" (id=3)

        ResponseEntity<MeasurementResponse[]> response = restTemplate.getForEntity("http://localhost:8082/api/measurement?chartID=3", MeasurementResponse[].class);
        Assertions.assertThat(response.getStatusCode().is2xxSuccessful());

        MeasurementResponse[] body = response.getBody();

        Assertions.assertThat(body[0].getChartID()).isEqualTo(3);
        Assertions.assertThat(body[1].getChartID()).isEqualTo(3);
        Assertions.assertThat(body.length).isEqualTo(2);
    }
}
