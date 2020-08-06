package eu.marcellofabbri.trender.model.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.OffsetDateTime;

public class MeasurementRequestCreate {
    @NotNull
    private final OffsetDateTime createdAt;
    @Min(value=0)
    private final long value;
    @NotBlank
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
