package com.mr.metrailserver.service;

import com.mr.metrailserver.model.ApplicationUser;
import com.mr.metrailserver.model.Employee;
import com.mr.metrailserver.model.Role;
import com.mr.metrailserver.repository.ApplicationUserRepository;
import com.mr.metrailserver.repository.EmployeeRepository;
import com.mr.metrailserver.repository.RoleRepository;
import com.mr.metrailserver.security.jwt.JwtUtils;
import com.mr.metrailserver.security.payload.JwtResponse;
import com.mr.metrailserver.security.payload.LoginRequest;
import com.mr.metrailserver.security.payload.SignUpRequest;
import com.mr.metrailserver.security.service.UserDetailsImpl;
import com.mr.metrailserver.utils.ERole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AuthService {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    ApplicationUserRepository userRepository;

    @Autowired
    EmployeeRepository employeeRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    public JwtResponse authenticateUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                userDetails.getFullName(),
                roles);
    }

    public ApplicationUser registerUser(SignUpRequest signUpRequest) {
        ApplicationUser user = new ApplicationUser(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()),
                signUpRequest.getFullName());

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                if ("admin".equals(role)) {
                    Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                    roles.add(adminRole);
                } else {
                    Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                    roles.add(userRole);
                }
            });
        }
        user.setRoles(roles);
        ApplicationUser applicationUser = userRepository.save(user);

        if(strRoles != null && strRoles.contains("user")) {
            Employee employee = new Employee();
            employee.setFullName(signUpRequest.getFullName());
            employee.setEmail(signUpRequest.getEmail());
            employee.setTotalTraveledDistanceInKilometers(0);
            employee.setDrivingEfficiencyFactor(5);
            employee.setApplicationUserId(applicationUser.getId());
            employeeRepository.save(employee);
        }

        return applicationUser;
    }

    public ApplicationUser editUser(ApplicationUser user) {
        ApplicationUser oldUser = this.userRepository.findById(user.getId()).orElseThrow();
        oldUser.setEmail(user.getEmail());
        oldUser.setFullName(user.getFullName());
        return this.userRepository.save(oldUser);
    }
}
