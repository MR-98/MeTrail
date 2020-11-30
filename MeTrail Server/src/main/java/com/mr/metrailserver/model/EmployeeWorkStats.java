package com.mr.metrailserver.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
public class EmployeeWorkStats {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long Id;
    private LocalDate date;
    private LocalTime startWorkTime;
    private LocalTime endWorkTime;
    private double workTimeInHours;
    private double traveledDistance;
    private Long employeeId;

    public EmployeeWorkStats(LocalDate date, LocalTime startWorkTime, LocalTime endWorkTime, double workTimeInHours, double traveledDistance, Long employeeId) {
        this.date = date;
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

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getStartWorkTime() {
        return startWorkTime;
    }

    public void setStartWorkTime(LocalTime startWorkTime) {
        this.startWorkTime = startWorkTime;
    }

    public LocalTime getEndWorkTime() {
        return endWorkTime;
    }

    public void setEndWorkTime(LocalTime endWorkTime) {
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
