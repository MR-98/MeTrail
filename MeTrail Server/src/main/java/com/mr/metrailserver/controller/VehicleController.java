package com.mr.metrailserver.controller;

import com.mr.metrailserver.model.Vehicle;
import com.mr.metrailserver.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
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

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public Vehicle getById(@RequestParam(value = "vehicleId") Long vehicleId) {
        return this.vehicleService.getVehicleById(vehicleId);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Vehicle addVehicle(@RequestBody Vehicle vehicle) {
        return this.vehicleService.addVehicle(vehicle);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping
    public void deleteById(@RequestParam(value = "vehicleId") Long vehicleId) {
        this.vehicleService.deleteVehicleByVehicleId(vehicleId);
    }

    @PostMapping("/setCurrentUser")
    public Vehicle setCurrentUser(@RequestParam(value = "vehicleId") Long vehicleId, @RequestParam(value = "employeeId") Long employeeId) {
        return this.vehicleService.setCurrentUser(vehicleId, employeeId);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping
    public Vehicle editVehicle(@RequestBody Vehicle vehicle) {
        return this.vehicleService.editVehicle(vehicle);
    }
}
