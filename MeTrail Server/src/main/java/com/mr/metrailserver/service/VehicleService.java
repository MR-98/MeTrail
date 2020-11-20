package com.mr.metrailserver.service;

import com.mr.metrailserver.model.Vehicle;
import com.mr.metrailserver.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    public Vehicle addVehicle(Vehicle vehicle) {
        return this.vehicleRepository.save(vehicle);
    }

    public Vehicle getVehicleById(Long vehicleId) {
        return this.vehicleRepository.findById(vehicleId).orElseThrow();
    }

    public List<Vehicle> getAllVehicles() {
        return this.vehicleRepository.findAll();
    }

    public void deleteVehicleByVehicleId(Long vehicleId) {
        this.vehicleRepository.deleteById(vehicleId);
    }

    public Vehicle editVehicle(Vehicle vehicle) {
        return this.vehicleRepository.save(vehicle);
    }

    public Vehicle setCurrentUser(Long vehicleId, String currentUserName) {
        Vehicle vehicle = this.vehicleRepository.findById(vehicleId).orElseThrow();
        vehicle.setCurrentVehicleUser(currentUserName);
        return this.vehicleRepository.save(vehicle);
    }
}
