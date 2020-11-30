package com.mr.metrailserver.service;

import com.mr.metrailserver.model.EmployeeWorkStats;
import com.mr.metrailserver.model.LocationPoint;
import com.mr.metrailserver.model.Point;
import com.mr.metrailserver.repository.EmployeeWorkStatsRepository;
import com.mr.metrailserver.repository.LocationPointRepository;
import com.mr.metrailserver.utils.CoordinatesDistanceCalculator;
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

    public EmployeeWorkStats startWorking(Long employeeId, String date, String time) {
        EmployeeWorkStats stats = new EmployeeWorkStats();
        stats.setDate(LocalDate.parse(date));
        stats.setStartWorkTime(LocalTime.parse(time));
        stats.setEmployeeId(employeeId);
        this.workStatsRepository.save(stats);

        return stats;
    }

    public EmployeeWorkStats stopWorking(Long workStatsId, String time) {
        EmployeeWorkStats stats = this.workStatsRepository.findById(workStatsId).orElseThrow();
        CoordinatesDistanceCalculator calculator = new CoordinatesDistanceCalculator();

        stats.setEndWorkTime(LocalTime.parse(time));
        stats.setWorkTimeInHours(getTotalWorkTimeInHours(stats));
        stats.setTraveledDistance(calculator.calculateTotalDistanceInKilometers(getEmployeePoints(stats)));
        this.workStatsRepository.save(stats);
        return stats;
    }

    private double getTotalWorkTimeInHours(EmployeeWorkStats stats) {
        long totalWorkTimeInMinutes = ChronoUnit.MINUTES.between(stats.getStartWorkTime(), stats.getEndWorkTime());
        return totalWorkTimeInMinutes / (double)60;
    }

    private List<Point> getEmployeePoints(EmployeeWorkStats stats) {
        List<LocationPoint> employeePoints = this.locationPointRepository.findByEmployeeIdAndDate(stats.getEmployeeId(), stats.getDate());
        List<Point> points = new ArrayList<>();
        employeePoints.forEach(p -> {
            points.add(new Point(p.getLatitude(), p.getLongitude()));
        });
        return points;
    }

    public EmployeeWorkStats getStatsForEmployeeAndDate(Long employeeId, String date) {
        return this.workStatsRepository.findByEmployeeIdAndDate(employeeId, LocalDate.parse(date));
    }
}
