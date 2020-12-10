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
    private double averageVelocity;
    private double maxVelocity;
    private Long employeeId;
    private boolean analyzed;
    private Long usedVehicleId;

    public EmployeeWorkStats(LocalDate date,
                             LocalTime startWorkTime,
                             LocalTime endWorkTime,
                             double workTimeInHours,
                             double traveledDistance,
                             Long employeeId,
                             boolean analyzed,
                             Long usedVehicleId,
                             double averageVelocity,
                             double maxVelocity) {
        this.date = date;
        this.startWorkTime = startWorkTime;
        this.endWorkTime = endWorkTime;
        this.workTimeInHours = workTimeInHours;
        this.traveledDistance = traveledDistance;
        this.employeeId = employeeId;
        this.analyzed = analyzed;
        this.usedVehicleId = usedVehicleId;
        this.averageVelocity = averageVelocity;
        this.maxVelocity = maxVelocity;
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

    public boolean isAnalyzed() {
        return analyzed;
    }

    public void setAnalyzed(boolean analyzed) {
        this.analyzed = analyzed;
    }

    public Long getUsedVehicleId() {
        return usedVehicleId;
    }

    public void setUsedVehicleId(Long usedVehicleId) {
        this.usedVehicleId = usedVehicleId;
    }

    public double getAverageVelocity() {
        return averageVelocity;
    }

    public void setAverageVelocity(double averageVelocity) {
        this.averageVelocity = averageVelocity;
    }

    public double getMaxVelocity() {
        return maxVelocity;
    }

    public void setMaxVelocity(double maxVelocity) {
        this.maxVelocity = maxVelocity;
    }
}
