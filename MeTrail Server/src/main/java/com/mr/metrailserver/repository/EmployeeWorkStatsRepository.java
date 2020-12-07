package com.mr.metrailserver.repository;

import com.mr.metrailserver.model.EmployeeWorkStats;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface EmployeeWorkStatsRepository extends JpaRepository<EmployeeWorkStats, Long> {
    EmployeeWorkStats findByEmployeeIdAndDate(Long employeeId, LocalDate date);

    List<EmployeeWorkStats> findAllByAnalyzedEquals(boolean isAnalyzed);
}
