package com.mr.metrailserver.repository;

import com.mr.metrailserver.model.Role;
import com.mr.metrailserver.utils.ERole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
