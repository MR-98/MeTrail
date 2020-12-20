package com.mr.metrailserver.controller;

import com.mr.metrailserver.model.LocationPoint;
import com.mr.metrailserver.service.LocationPointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/location")
public class LocationPointController {

    @Autowired
    private LocationPointService locationPointService;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public List<LocationPoint> getAll() {
        return locationPointService.getAll();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/forEmployeeByDate")
    public List<LocationPoint> getLocationPointsForEmployeeByDate(@RequestParam(value = "employeeId")Long employeeId, @RequestParam(value = "date")String date) {
        return locationPointService.getLocationPointsForEmployeeByDate(employeeId, date);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public LocationPoint getById(@RequestParam Long locationId) {
        return locationPointService.findById(locationId);
    }

    @PostMapping
    public LocationPoint addLocationPoint(@RequestBody LocationPoint locationPoint) {
        return locationPointService.add(locationPoint);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping
    public LocationPoint editLocationPoint(@RequestBody LocationPoint locationPoint) {
        return locationPointService.edit(locationPoint);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping
    public void deleteLocationPoint(@RequestParam(name="locationPointId") Long locationPointId) {
        locationPointService.deleteById(locationPointId);
    }
}
