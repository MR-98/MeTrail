package com.mr.metrailserver.controller;

import com.mr.metrailserver.model.LocationPoint;
import com.mr.metrailserver.service.LocationPointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/location")
public class LocationPointController {

    @Autowired
    private LocationPointService locationPointService;

    @GetMapping("/all")
    public List<LocationPoint> getAll() {
        return locationPointService.getAll();
    }

    @GetMapping
    public LocationPoint getById(@RequestParam Long locationId) {
        return locationPointService.findById(locationId);
    }

    @PostMapping
    public LocationPoint addLocationPoint(@RequestBody LocationPoint locationPoint) {
        return locationPointService.add(locationPoint);
    }

    @PutMapping
    public LocationPoint editLocationPoint(@RequestBody LocationPoint locationPoint) {
        return locationPointService.edit(locationPoint);
    }

    @DeleteMapping
    public void deleteLocationPoint(@RequestParam(name="locationPointId") Long locationPointId) {
        locationPointService.deleteById(locationPointId);
    }
}
