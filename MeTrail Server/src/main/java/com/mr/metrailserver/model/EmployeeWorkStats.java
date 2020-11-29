package com.mr.metrailserver.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
public class EmployeeWorkStats {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long Id;
    private LocalDateTime startWorkTime;
    private LocalDateTime endWorkTime;
    private double workTimeInHours;
    private double traveledDistance;
    private Long employeeId;

    public EmployeeWorkStats(LocalDateTime startWorkTime, LocalDateTime endWorkTime, double workTimeInHours, double traveledDistance, Long employeeId) {
        this.startWorkTime = startWorkTime;
        this.endWorkTime = endWorkTime;
        this.workTimeInHours = workTimeInHours;
        this.traveledDistance = traveledDistance;
        this.employeeId = employeeId;
    }

    public EmployeeWorkStats() {
    }

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public LocalDateTime getStartWorkTime() {
        return startWorkTime;
    }

    public void setStartWorkTime(LocalDateTime startWorkTime) {
        this.startWorkTime = startWorkTime;
    }

    public LocalDateTime getEndWorkTime() {
        return endWorkTime;
    }

    public void setEndWorkTime(LocalDateTime endWorkTime) {
        this.endWorkTime = endWorkTime;
    }

    public double getWorkTimeInHours() {
        return workTimeInHours;
    }

    public void setWorkTimeInHours(double workTimeInHours) {
        this.workTimeInHours = workTimeInHours;
    }

    public double getTraveledDistance() {
        return traveledDistance;
    }

    public void setTraveledDistance(double traveledDistance) {
        this.traveledDistance = traveledDistance;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }
}
