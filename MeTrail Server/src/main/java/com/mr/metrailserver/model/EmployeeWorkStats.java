package com.mr.metrailserver.model;

import javax.persistence.*;
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

    @JoinColumn(name = "employee_id")
    @OneToOne(cascade = CascadeType.ALL)
    private Employee employee;
    private boolean analyzed;

    @JoinColumn(name = "vehicle_id")
    @OneToOne(cascade = CascadeType.ALL)
    private Vehicle usedVehicle;

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

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public boolean isAnalyzed() {
        return analyzed;
    }

    public void setAnalyzed(boolean analyzed) {
        this.analyzed = analyzed;
    }

    public Vehicle getUsedVehicle() {
        return usedVehicle;
    }

    public void setUsedVehicle(Vehicle usedVehicle) {
        this.usedVehicle = usedVehicle;
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
