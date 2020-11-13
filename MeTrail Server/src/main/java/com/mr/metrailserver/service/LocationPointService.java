package com.mr.metrailserver.service;

import com.mr.metrailserver.model.LocationPoint;
import com.mr.metrailserver.repository.LocationPointRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;

@Service
public class LocationPointService {

    @Autowired
    private LocationPointRepository locationPointRepository;

    public List<LocationPoint> getAll() {
        return locationPointRepository.findAll();
    }

    public LocationPoint findById(Long locationId) {
        return locationPointRepository.findById(locationId).orElseThrow();
    }

    public LocationPoint add(LocationPoint locationPoint) {
        return locationPointRepository.save(locationPoint);
    }

    public LocationPoint edit(LocationPoint locationPoint) {
        return locationPointRepository.save(locationPoint);
    }

    public void deleteById(Long locationPointId) {
        locationPointRepository.deleteById(locationPointId);
    }

    public List<LocationPoint> getLocationPointsForEmployeeByDate(Long employeeId, String date) {
        return locationPointRepository.findByEmployeeIdAndDate(employeeId, LocalDate.parse(date));
    }
}
