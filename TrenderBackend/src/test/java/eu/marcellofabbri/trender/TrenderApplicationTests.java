package eu.marcellofabbri.trender;

import eu.marcellofabbri.trender.model.dto.MeasurementResponse;
import eu.marcellofabbri.trender.model.entity.Measurement;
import eu.marcellofabbri.trender.repository.MeasurementRepository;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.client.RestTemplate;

import java.time.OffsetDateTime;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;

@RunWith(SpringRunner.class)
@ActiveProfiles("test")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@Sql(executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD, scripts = "classpath:/truncate.sql")
public class TrenderApplicationTests {

    OffsetDateTime TIMESTAMP = OffsetDateTime.now();

    @Test
    public void contextLoads() {
    }

    @Autowired
    private MeasurementRepository measurementRepository;

    private RestTemplate restTemplate = new RestTemplate();

    @org.junit.Test
    public void testGetMeasurementById() {
        measurementRepository.save(new Measurement(TIMESTAMP, 20, "grams"));

        ResponseEntity<MeasurementResponse> response = restTemplate.getForEntity("http://localhost:8082/measurements/1", MeasurementResponse.class);
        assertThat(response.getStatusCode().is2xxSuccessful());

        MeasurementResponse body = response.getBody();

        assertThat(body.getId()).isNotNull();
        assertThat(body.getCreatedAt()).isEqualTo(TIMESTAMP);
        assertThat(body.getValue()).isEqualTo(20);
        assertThat(body.getUnit()).isEqualTo("grams");
    }

    @org.junit.Test
    public void testPostMeasurement() {
        Measurement measurement = new Measurement(TIMESTAMP, 30, "milliliters");
        HttpEntity<Measurement> request = new HttpEntity<>(measurement);
        ResponseEntity<Measurement> response = restTemplate.exchange(
                "http://localhost:8082/measurements",
                HttpMethod.POST,
                request,
                Measurement.class);

        assertThat(response.getStatusCode().is2xxSuccessful());

        Measurement responseBody = response.getBody();
        assertThat(responseBody.getCreatedAt()).isEqualTo(TIMESTAMP);
        assertThat(responseBody.getValue()).isEqualTo(30);
        assertThat(responseBody.getUnit()).isEqualTo("milliliters");
    }
}
