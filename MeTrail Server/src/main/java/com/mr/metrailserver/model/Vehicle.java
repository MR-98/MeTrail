package com.mr.metrailserver.model;

import javax.persistence.*;

@Entity
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String make;
    private String vehicleModel;
    private int yearOfManufacture;
    private String licencePlate;

    @JoinColumn(name = "current_vehicle_user_id")
    @OneToOne(cascade = CascadeType.ALL)
    private Employee currentVehicleUser;

    private double estimatedMileage;

    public Vehicle() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Employee getCurrentVehicleUser() {
        return currentVehicleUser;
    }

    public void setCurrentVehicleUser(Employee currentVehicleUser) {
        this.currentVehicleUser = currentVehicleUser;
    }

    public double getEstimatedMileage() {
        return estimatedMileage;
    }

    public void setEstimatedMileage(double estimatedMileage) {
        this.estimatedMileage = estimatedMileage;
    }
}
