package eu.marcellofabbri.trender.model.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.OffsetDateTime;

public class UserResponse {
  private final long id;
  private final String username;
  private final String password;

  @JsonCreator
  public UserResponse(@JsonProperty("id") long id,
                       @JsonProperty("username") String username,
                       @JsonProperty("password") String password) {
    this.id = id;
    this.username = username;
    this.password = password;
  }

  public long getId() { return id; }

  public String getTitle() {
    return username;
  }

  public String getUnitName() {
    return password;
  }

}
