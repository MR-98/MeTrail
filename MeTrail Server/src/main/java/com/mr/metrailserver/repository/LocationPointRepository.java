package com.mr.metrailserver.repository;

import com.mr.metrailserver.model.LocationPoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationPointRepository extends JpaRepository<LocationPoint, Long> {
}
