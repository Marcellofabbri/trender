package eu.marcellofabbri.trender.model.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.OffsetDateTime;

public class ChartResponse {
  private final long id;
  private final OffsetDateTime createdAt;
  private final String title;
  private final String unitName;
  private final String description;
  private final long target;

  @JsonCreator
  public ChartResponse(@JsonProperty("id") long id,
                       @JsonProperty("createdAt") OffsetDateTime createdAt,
                       @JsonProperty("title") String title,
                       @JsonProperty("unitName") String unitName,
                       @JsonProperty("description") String description,
                       @JsonProperty("target") long target) {
    this.id = id;
    this.createdAt = createdAt;
    this.title = title;
    this.unitName = unitName;
    this.description = description;
    this.target = target;
  }

  public long getId() {
    return id;
  }

  public OffsetDateTime getCreatedAt() {
    return createdAt;
  }

  public String getTitle() {
    return title;
  }

  public String getUnitName() {
    return unitName;
  }

  public String getDescription() { return description; }

  public long getTarget() { return target; }
}
