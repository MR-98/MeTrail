package com.mr.metrailserver.service;

import com.mr.metrailserver.model.EmployeeWorkStats;
import com.mr.metrailserver.model.LocationPoint;
import com.mr.metrailserver.model.Point;
import com.mr.metrailserver.repository.EmployeeWorkStatsRepository;
import com.mr.metrailserver.repository.LocationPointRepository;
import com.mr.metrailserver.utils.CoordinatesDistanceCalculator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
public class EmployeeWorkStatsService {

    @Autowired
    private EmployeeWorkStatsRepository workStatsRepository;

    @Autowired
    private LocationPointRepository locationPointRepository;

    public EmployeeWorkStats startWorking(Long employeeId, LocalDateTime timestamp) {
        EmployeeWorkStats stats = new EmployeeWorkStats();
        stats.setStartWorkTime(timestamp);
        stats.setEmployeeId(employeeId);
        this.workStatsRepository.save(stats);

        return stats;
    }

    public EmployeeWorkStats stopWorking(Long workStatsId, LocalDateTime timestamp) {
        EmployeeWorkStats stats = this.workStatsRepository.findById(workStatsId).orElseThrow();
        CoordinatesDistanceCalculator calculator = new CoordinatesDistanceCalculator();

        stats.setEndWorkTime(timestamp);
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
        List<LocationPoint> employeePoints = this.locationPointRepository.findByEmployeeIdAndDate(stats.getEmployeeId(), stats.getStartWorkTime().toLocalDate());
        List<Point> points = new ArrayList<>();
        employeePoints.forEach(p -> {
            points.add(new Point(p.getLatitude(), p.getLongitude()));
        });
        return points;
    }
}
