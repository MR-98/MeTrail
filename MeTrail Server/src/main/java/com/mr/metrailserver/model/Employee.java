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
    private String firstName;
    private String surname;
    private double drivingEfficiencyFactor;

    public Employee() {
    }

    public Long getID() {
        return ID;
    }

    public void setID(Long ID) {
        this.ID = ID;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public double getDrivingEfficiencyFactor() {
        return drivingEfficiencyFactor;
    }

    public void setDrivingEfficiencyFactor(double drivingEfficiencyFactor) {
        this.drivingEfficiencyFactor = drivingEfficiencyFactor;
    }
}
