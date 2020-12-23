package com.mr.metrailserver.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long ID;
    private String fullName;
    private double drivingEfficiencyFactor;
    private String email;
    private Long applicationUserId;
    private double totalTraveledDistanceInKilometers;
    private String phoneNumber;

    public Employee() {
    }

    public Long getID() {
        return ID;
    }

    public void setID(Long ID) {
        this.ID = ID;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public double getDrivingEfficiencyFactor() {
        return drivingEfficiencyFactor;
    }

    public void setDrivingEfficiencyFactor(double drivingEfficiencyFactor) {
        this.drivingEfficiencyFactor = drivingEfficiencyFactor;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getApplicationUserId() {
        return applicationUserId;
    }

    public void setApplicationUserId(Long applicationUserId) {
        this.applicationUserId = applicationUserId;
    }

    public double getTotalTraveledDistanceInKilometers() {
        return totalTraveledDistanceInKilometers;
    }

    public void setTotalTraveledDistanceInKilometers(double totalTraveledDistanceInKilometers) {
        this.totalTraveledDistanceInKilometers = totalTraveledDistanceInKilometers;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}
