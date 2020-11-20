package com.mr.metrailserver.controller;

import com.mr.metrailserver.model.Vehicle;
import com.mr.metrailserver.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vehicles")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    @GetMapping("/getAll")
    public List<Vehicle> getAll() {
        return this.vehicleService.getAllVehicles();
    }

    @GetMapping
    public Vehicle getById(@RequestParam(value = "vehicleId") Long vehicleId) {
        return this.vehicleService.getVehicleById(vehicleId);
    }

    @PostMapping
    public Vehicle addVehicle(@RequestBody Vehicle vehicle) {
        return this.vehicleService.addVehicle(vehicle);
    }

    @DeleteMapping
    public void deleteById(@RequestParam(value = "vehicleId") Long vehicleId) {
        this.vehicleService.deleteVehicleByVehicleId(vehicleId);
    }

    @GetMapping("/setCurrentUser")
    public Vehicle setCurrentUser(@RequestParam(value = "vehicleId") Long vehicleId, @RequestParam(value = "currentUser") String currentUser) {
        return this.vehicleService.setCurrentUser(vehicleId, currentUser);
    }

    @PutMapping
    public Vehicle editVehicle(@RequestBody Vehicle vehicle) {
        return this.vehicleService.editVehicle(vehicle);
    }
}
