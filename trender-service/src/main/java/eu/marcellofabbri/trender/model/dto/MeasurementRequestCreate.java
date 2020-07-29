package eu.marcellofabbri.trender.model.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.OffsetDateTime;

public class MeasurementRequestCreate {
    private final OffsetDateTime createdAt;
    private final long value;
    private final String unit;


    @JsonCreator
    public MeasurementRequestCreate(@JsonProperty("createdAt") OffsetDateTime createdAt,
                                      @JsonProperty("value") long value,
                                    @JsonProperty("unit") String unit) {
        this.createdAt = createdAt;
        this.value = value;
        this.unit = unit;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }

    public long getValue() {
        return value;
    }

    public String getUnit() {
        return unit;
    }
}
