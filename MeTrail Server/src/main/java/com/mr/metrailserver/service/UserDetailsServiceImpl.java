package com.mr.metrailserver.service;

import com.mr.metrailserver.model.ApplicationUser;
import com.mr.metrailserver.model.Employee;
import com.mr.metrailserver.repository.ApplicationUserRepository;
import com.mr.metrailserver.utils.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import static java.util.Collections.emptyList;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private ApplicationUserRepository applicationUserRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private EmployeeService employeeService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        ApplicationUser applicationUser = this.applicationUserRepository.findByEmail(username);
        if (applicationUser == null) {
            throw new UsernameNotFoundException(username);
        }
        return new User(applicationUser.getEmail(), applicationUser.getPassword(), emptyList());
    }

    public ApplicationUser signUp(ApplicationUser user) {
        user.setPassword(this.bCryptPasswordEncoder.encode(user.getPassword()));

        if(user.getRole()== UserRole.EMPLOYEE) {
            Employee employee = new Employee();
            employee.setDrivingEfficiencyFactor(5);
            employee.setEmail(user.getEmail());
            employee.setFullName(user.getFullName());
            ApplicationUser employeeUser = this.applicationUserRepository.save(user);
            employee.setApplicationUserId(employeeUser.getId());
            this.employeeService.add(employee);
            return employeeUser;
        } else {
            return this.applicationUserRepository.save(user);
        }
    }
}
