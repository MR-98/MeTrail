package com.mr.metrailserver.repository;

import com.mr.metrailserver.model.LocationPoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface LocationPointRepository extends JpaRepository<LocationPoint, Long> {
    List<LocationPoint> findByEmployeeIdAndDate(Long employeeId, LocalDate date);
}
