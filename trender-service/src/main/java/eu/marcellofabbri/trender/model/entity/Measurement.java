package eu.marcellofabbri.trender.model.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.time.OffsetDateTime;

@Entity
@Table(name = "measurement")
public class Measurement implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column (name = "createdAt")
    private OffsetDateTime createdAt;

    @Column (name = "value")
    private long value;

    @Column (name = "unit")
    private String unit;

    @Column (name = "chartID")
    private long chartID;

    public Measurement() {
    }

    public Measurement(OffsetDateTime createdAt, long value, String unit, long chartID) {
        this.createdAt = createdAt;
        this.value = value;
        this.unit = unit;
        this.chartID = chartID;
    }

    public long getValue() {
        return value;
    }

    public void setValue(long value) {
        this.value = value;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(OffsetDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setChartID(Long chartID) { this.chartID = chartID; }

    public long getChartID() { return chartID; }
}
