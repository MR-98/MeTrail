package com.mr.metrailserver.controller;

import com.mr.metrailserver.repository.ApplicationUserRepository;
import com.mr.metrailserver.security.payload.LoginRequest;
import com.mr.metrailserver.security.payload.MessageResponse;
import com.mr.metrailserver.security.payload.SignUpRequest;
import com.mr.metrailserver.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    ApplicationUserRepository userRepository;

    @Autowired
    AuthService authService;

    @PostMapping("/signIn")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(this.authService.authenticateUser(loginRequest));
    }

    @PostMapping("/signUp")
    public ResponseEntity<?> registerUser(@RequestBody SignUpRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        if(this.authService.registerUser(signUpRequest) == null ){
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: User not created"));
        }

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
}
