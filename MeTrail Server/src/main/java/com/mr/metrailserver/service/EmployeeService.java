package com.mr.metrailserver.service;


import com.mr.metrailserver.model.ApplicationUser;
import com.mr.metrailserver.model.Employee;
import com.mr.metrailserver.repository.ApplicationUserRepository;
import com.mr.metrailserver.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private ApplicationUserRepository applicationUserRepository;

    public List<Employee> getAll() {
        return employeeRepository.findAll();
    }

    public Employee add(Employee employee) {
        return employeeRepository.save(employee);
    }

    public Employee findById(Long employeeId) {
        return employeeRepository.findById(employeeId).orElseThrow();
    }

    public Employee editEmployee(Employee employee) {
        ApplicationUser applicationUser = this.applicationUserRepository.findById(employee.getApplicationUser().getId()).orElseThrow();
        applicationUser.setEmail(employee.getEmail());
        applicationUser.setFullName(employee.getFullName());
        this.applicationUserRepository.save(applicationUser);

        return employeeRepository.save(employee);
    }

    public void deleteEmployee(Long employeeId) {
        Employee employee = this.employeeRepository.findById(employeeId).orElseThrow();
        this.applicationUserRepository.deleteById(employee.getApplicationUser().getId());
        employeeRepository.deleteById(employeeId);
    }

    public Employee findByEmail(String email) {
        return employeeRepository.findByEmail(email);
    }
}
