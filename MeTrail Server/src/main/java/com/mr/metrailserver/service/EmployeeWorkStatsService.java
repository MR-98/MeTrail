package com.mr.metrailserver.service;

import com.mr.metrailserver.model.*;
import com.mr.metrailserver.repository.EmployeeRepository;
import com.mr.metrailserver.repository.EmployeeWorkStatsRepository;
import com.mr.metrailserver.repository.LocationPointRepository;
import com.mr.metrailserver.repository.VehicleRepository;
import com.mr.metrailserver.utils.CoordinatesDistanceCalculator;
import com.mr.metrailserver.utils.DailyWorkStatsAnalyzer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
public class EmployeeWorkStatsService {

    @Autowired
    private EmployeeWorkStatsRepository workStatsRepository;

    @Autowired
    private LocationPointRepository locationPointRepository;

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private DailyWorkStatsAnalyzer analyzer;

    public EmployeeWorkStats startWorking(Long employeeId, Long vehicleId, String date, String time) {
        EmployeeWorkStats stats = new EmployeeWorkStats();
        stats.setDate(LocalDate.parse(date));
        stats.setStartWorkTime(LocalTime.parse(time));
        Employee employee = this.employeeRepository.findById(employeeId).orElseThrow();
        Vehicle vehicle = vehicleRepository.findById(vehicleId).orElseThrow();
        stats.setEmployee(employee);
        stats.setAnalyzed(false);
        stats.setUsedVehicle(vehicle);
        this.workStatsRepository.save(stats);


        vehicle.setCurrentVehicleUser(employee);
        this.vehicleRepository.save(vehicle);
        return stats;
    }

    public EmployeeWorkStats stopWorking(Long workStatsId, String time) {
        EmployeeWorkStats stats = this.workStatsRepository.findById(workStatsId).orElseThrow();
        CoordinatesDistanceCalculator calculator = new CoordinatesDistanceCalculator();
        Vehicle vehicle = vehicleRepository.findById(stats.getUsedVehicle().getId()).orElseThrow();
        Employee employee = employeeRepository.findById(stats.getEmployee().getId()).orElseThrow();

        stats.setEndWorkTime(LocalTime.parse(time));
        stats.setWorkTimeInHours(getTotalWorkTimeInHours(stats));
        List<Point> employeePoints = getEmployeePoints(stats);

        double traveledDistance = calculator.calculateTotalDistanceInKilometers(employeePoints);
        stats.setTraveledDistance(Math.round(traveledDistance*100)/100);
        stats.setMaxVelocity(Math.round(getMaxVelocity(employeePoints)*100)/100.0);
        stats.setAverageVelocity(getAverageVelocity(employeePoints));

        vehicle.setEstimatedMileage(vehicle.getEstimatedMileage() + traveledDistance);
        vehicle.setCurrentVehicleUser(null);

        employee.setTotalTraveledDistanceInKilometers(employee.getTotalTraveledDistanceInKilometers()+traveledDistance);

        this.employeeRepository.save(employee);
        this.vehicleRepository.save(vehicle);
        this.workStatsRepository.save(stats);
        return stats;
    }

    private double getAverageVelocity(List<Point> employeePoints) {
        return employeePoints.stream().mapToDouble(Point::getVelocity).average().orElse(Double.NaN);
    }

    private double getTotalWorkTimeInHours(EmployeeWorkStats stats) {
        long totalWorkTimeInMinutes = ChronoUnit.MINUTES.between(stats.getStartWorkTime(), stats.getEndWorkTime());
        return totalWorkTimeInMinutes / (double) 60;
    }

    private List<Point> getEmployeePoints(EmployeeWorkStats stats) {
        List<LocationPoint> employeePoints = this.locationPointRepository.findByEmployeeIdAndDate(stats.getEmployee().getId(), stats.getDate());
        List<Point> points = new ArrayList<>();
        employeePoints.forEach(p -> {
            points.add(new Point(p.getLatitude(), p.getLongitude(), p.getSpeed()));
        });
        return points;
    }

    private double getMaxVelocity(List<Point> points) {
        return points.stream().mapToDouble(Point::getVelocity).reduce(Double.MIN_VALUE, Double::max);
    }

    public EmployeeWorkStats getStatsForEmployeeAndDate(Long employeeId, String date) {
        return this.workStatsRepository.findByEmployeeIdAndDate(employeeId, LocalDate.parse(date));
    }

    public void startWorkStatsEngine() {
        analyzer.analyzeWorkStats();
    }

    public List<EmployeeWorkStats> getAllStatsInLast30Days() {
        LocalDate initialDate = LocalDate.now().minus(30, ChronoUnit.DAYS);
        return this.workStatsRepository.findAllByDateGreaterThanEqual(initialDate);
    }
}
