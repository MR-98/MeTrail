package com.mr.metrailserver.controller;

import com.mr.metrailserver.model.EmployeeWorkStats;
import com.mr.metrailserver.service.EmployeeWorkStatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/workStats")
public class EmployeeWorkStatsController {

    @Autowired
    private EmployeeWorkStatsService workStatsService;

    @PostMapping("/startWorking")
    public EmployeeWorkStats startWorking(@RequestParam(value = "employeeId") Long employeeId,
                                          @RequestParam(value = "vehicleId") Long vehicleId,
                                          @RequestParam(value = "date") String date, @RequestParam(value = "time") String time) {
        return this.workStatsService.startWorking(employeeId, vehicleId, date, time);
    }

    @PostMapping("/stopWorking")
    public EmployeeWorkStats stopWorking(@RequestParam(value = "workStatsId") Long workStatsId, @RequestParam(value = "time") String time) {
        return this.workStatsService.stopWorking(workStatsId, time);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/getByEmployeeIdAndDate")
    public EmployeeWorkStats getStatsForEmployeeIdAndDate(@RequestParam(value = "employeeId") Long employeeId, @RequestParam(value = "date") String date) {
        return this.workStatsService.getStatsForEmployeeAndDate(employeeId, date);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/getWorkStatsInLast30Days")
    public List<EmployeeWorkStats> getAllStatsInLast30Days() {
        return this.workStatsService.getAllStatsInLast30Days();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/runEmployeeStatisticsEngine")
    public void startWorkStatsEngine() {
        this.workStatsService.startWorkStatsEngine();
    }
}
