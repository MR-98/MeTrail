package com.mr.metrailserver.model;

import javax.persistence.*;

@Entity
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String fullName;
    private double drivingEfficiencyFactor;
    private String email;

    @JoinColumn(name = "application_user_id")
    @OneToOne(cascade = CascadeType.ALL)
    private ApplicationUser applicationUser;
    private double totalTraveledDistanceInKilometers;
    private String phoneNumber;

    public Employee() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public ApplicationUser getApplicationUser() {
        return applicationUser;
    }

    public void setApplicationUser(ApplicationUser applicationUser) {
        this.applicationUser = applicationUser;
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
