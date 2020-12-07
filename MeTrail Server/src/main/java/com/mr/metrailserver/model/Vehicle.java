package com.mr.metrailserver.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long ID;

    private String make;
    private String vehicleModel;
    private int yearOfManufacture;
    private String licencePlate;
    private String currentVehicleUser;
    private double estimatedMileage;

    public Vehicle() {
    }

    public Long getID() {
        return ID;
    }

    public void setID(Long ID) {
        this.ID = ID;
    }

    public String getMake() {
        return make;
    }

    public void setMake(String make) {
        this.make = make;
    }

    public String getVehicleModel() {
        return vehicleModel;
    }

    public void setVehicleModel(String vehicleModel) {
        this.vehicleModel = vehicleModel;
    }

    public int getYearOfManufacture() {
        return yearOfManufacture;
    }

    public void setYearOfManufacture(int yearOfManufacture) {
        this.yearOfManufacture = yearOfManufacture;
    }

    public String getLicencePlate() {
        return licencePlate;
    }

    public void setLicencePlate(String licencePlate) {
        this.licencePlate = licencePlate;
    }

    public String getCurrentVehicleUser() {
        return currentVehicleUser;
    }

    public void setCurrentVehicleUser(String currentVehicleUser) {
        this.currentVehicleUser = currentVehicleUser;
    }

    public double getEstimatedMileage() {
        return estimatedMileage;
    }

    public void setEstimatedMileage(double estimatedMileage) {
        this.estimatedMileage = estimatedMileage;
    }
}
