package com.mr.metrailserver.controller;

import com.mr.metrailserver.model.Employee;
import com.mr.metrailserver.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping
    public Employee addEmployee(@RequestBody Employee employee) {
        return employeeService.add(employee);
    }

    @GetMapping("/all")
    public List<Employee> getAll() {
        return employeeService.getAll();
    }

    @GetMapping
    public Employee getById(@RequestParam(name="employeeId") Long employeeId) {
        return employeeService.findById(employeeId);
    }

    @PutMapping
    public Employee editEmployee(@RequestBody Employee employee) {
        return employeeService.editEmployee(employee);
    }

    @DeleteMapping
    public void deleteById(@RequestParam(name="employeeId") Long employeeId) {
        employeeService.deleteEmployee(employeeId);
    }
}
