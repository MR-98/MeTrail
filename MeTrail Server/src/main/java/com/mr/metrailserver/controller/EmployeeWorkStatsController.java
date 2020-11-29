package com.mr.metrailserver.controller;

import com.mr.metrailserver.model.EmployeeWorkStats;
import com.mr.metrailserver.service.EmployeeWorkStatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/workStats")
public class EmployeeWorkStatsController {

    @Autowired
    private EmployeeWorkStatsService workStatsService;

    @PostMapping("/startWorking")
    public EmployeeWorkStats startWorking(@RequestParam(value = "employeeId") Long employeeId, @RequestParam(value = "timestamp")LocalDateTime timestamp) {
        return this.workStatsService.startWorking(employeeId, timestamp);
    }

    @PostMapping("/stopWorking")
    public EmployeeWorkStats stopWorking(@RequestParam(value = "workStatsId") Long workStatsId, @RequestParam(value = "timestamp") LocalDateTime timestamp) {
        return this.workStatsService.stopWorking(workStatsId, timestamp);
    }
}
