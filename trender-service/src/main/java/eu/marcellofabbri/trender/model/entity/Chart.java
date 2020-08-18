package eu.marcellofabbri.trender.model.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.time.OffsetDateTime;

@Entity
@Table(name = "chart")
public class Chart implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column (name = "createdAt")
  private OffsetDateTime createdAt;

  @Column (name = "title")
  private String title;

  @Column (name = "unitName")
  private String unitName;

  @Column (name = "description")
  private String description;

  @Column (name = "target")
  private long target;

  public Chart(OffsetDateTime createdAt, String title, String unitName, String description, long target) {
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

  public void setCreatedAt(OffsetDateTime createdAt) {
    this.createdAt = createdAt;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getUnitName() {
    return unitName;
  }

  public void setUnitName(String unitName) {
    this.unitName = unitName;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public long getTarget() {
    return target;
  }

  public void setTarget(long target) {
    this.target = target;
  }
}
