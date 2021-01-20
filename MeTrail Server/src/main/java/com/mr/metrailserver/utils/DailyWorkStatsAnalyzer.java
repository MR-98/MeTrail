package com.mr.metrailserver.utils;

import com.mr.metrailserver.model.Employee;
import com.mr.metrailserver.model.EmployeeWorkStats;
import com.mr.metrailserver.model.LocationPoint;
import com.mr.metrailserver.repository.EmployeeRepository;
import com.mr.metrailserver.repository.EmployeeWorkStatsRepository;
import com.mr.metrailserver.repository.LocationPointRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DailyWorkStatsAnalyzer {

    private static final double DRIVING_EFFICIENCY_FACTOR_MODERATOR = 0.2;
    private static final double MINIMAL_DRIVING_EFFICIENCY_FACTOR = 0.0;
    private static final double MAXIMUM_DRIVING_EFFICIENCY_FACTOR = 10.0;
    private static final int INITIAL_SCORE = 100;
    private static final int SCORE_LOW_THRESHOLD = 0;
    private static final int SCORE_HIGH_THRESHOLD = 50;
    private static final int MAXIMUM_VELOCITY_CHANGE = 20;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EmployeeWorkStatsRepository employeeWorkStatsRepository;

    @Autowired
    private LocationPointRepository locationPointRepository;

    public void analyzeWorkStats() {
        List<EmployeeWorkStats> workStats = employeeWorkStatsRepository.findAllByAnalyzedEquals(false);

        workStats.forEach(this::analyzeSingleWorkStats);
    }

    private void analyzeSingleWorkStats(EmployeeWorkStats workStat) {
        Employee employee = employeeRepository.findById(workStat.getEmployee().getId()).orElseThrow();
        List<LocationPoint> locationPoints = locationPointRepository.findByEmployeeIdAndDate(employee.getId(), workStat.getDate());

        int score = INITIAL_SCORE;
        score = analyzeVelocityChanges(locationPoints, score);
        score = analyzeVelocityInTermsOfSpeedLimits(locationPoints, score);

        if (score <= SCORE_LOW_THRESHOLD && employee.getDrivingEfficiencyFactor() > MINIMAL_DRIVING_EFFICIENCY_FACTOR) {
            employee.setDrivingEfficiencyFactor(employee.getDrivingEfficiencyFactor() - DRIVING_EFFICIENCY_FACTOR_MODERATOR);
        } else if (score > SCORE_HIGH_THRESHOLD && employee.getDrivingEfficiencyFactor() < MAXIMUM_DRIVING_EFFICIENCY_FACTOR) {
            employee.setDrivingEfficiencyFactor(employee.getDrivingEfficiencyFactor() + DRIVING_EFFICIENCY_FACTOR_MODERATOR);
        }

        workStat.setAnalyzed(true);
        employeeWorkStatsRepository.save(workStat);
        employeeRepository.save(employee);
    }

    private int analyzeVelocityChanges(List<LocationPoint> locationPoints, int score) {
        for (int i = 0; i < locationPoints.size() - 1; i++) {
            LocationPoint pointA = locationPoints.get(i);
            LocationPoint pointB = locationPoints.get(i + 1);
            double velocityChange = Math.abs(pointA.getSpeed() - pointB.getSpeed());

            if (velocityChange >= MAXIMUM_VELOCITY_CHANGE) {
                score -= 5;
            }
        }
        return score;
    }

    private int analyzeVelocityInTermsOfSpeedLimits(List<LocationPoint> locationPoints, int score) {
        for (LocationPoint locationPoint : locationPoints) {
            if (locationPoint.getSpeed() >= 160) {
                score -= 2;
            } else if (locationPoint.getSpeed() >= 140) {
                score -= 1;
            }
        }
        return score;
    }
}
