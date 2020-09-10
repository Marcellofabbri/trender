package eu.marcellofabbri.trender.model.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.OffsetDateTime;

public class ChartRequestCreate {
  @NotNull
  private final OffsetDateTime createdAt;
  private final String title;
  @NotBlank
  private final String unitName;
  private final String description;
  @Min(value=0)
  private final long target;
  @NotNull
  private final long userID;

  @JsonCreator
  public ChartRequestCreate(@JsonProperty("createdAt") OffsetDateTime createdAt,
                            @JsonProperty("title") String title,
                            @JsonProperty("unitName") String unitName,
                            @JsonProperty("description") String description,
                            @JsonProperty("target") long target,
                            @JsonProperty("userID") long userID) {
    this.createdAt = createdAt;
    this.title = title;
    this.unitName = unitName;
    this.description = description;
    this.target = target;
    this.userID = userID;
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

  public long getUserID() { return userID; }
}
