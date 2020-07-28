package eu.marcellofabbri.trender.model.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.OffsetDateTime;

public class MeasurementResponse {
    private final long id;
    private final OffsetDateTime createdAt;
    private final long value;
    private final String unit;

    @JsonCreator
    public MeasurementResponse(@JsonProperty("id") long id,
                               @JsonProperty("createdAt") OffsetDateTime createdAt,
                               @JsonProperty("value")long value,
                               @JsonProperty("unit") String unit) {
        this.id = id;
        this.createdAt = createdAt;
        this.value = value;
        this.unit = unit;
    }

    public long getId() {
        return id;
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
