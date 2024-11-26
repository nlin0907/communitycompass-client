package com.example.login.service;


import com.example.login.model.Employee;
import com.example.login.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private final EmployeeRepository employeeRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }


    public List<Employee> getEmployees() {
        return employeeRepository.findAll();
    }

    public Employee getEmployee(String email, String password, Optional<String> role) {
        Optional<Employee> employeeOptional = employeeRepository.findEmployeeByEmail(email);

        if (employeeOptional.isPresent()) {
            Employee foundEmployee = employeeOptional.get();
            
            // Check password
            if (!passwordEncoder.matches(password, foundEmployee.getPassword())) {
                throw new IllegalArgumentException("Invalid password");
            }

            // Validate role if provided
            if (role.isPresent()) {
                try {
                    // Convert role string to enum for validation
                    Employee.Role roleEnum = Employee.Role.valueOf(role.get().toUpperCase());

                    // Compare with the found employee's role
                    if (roleEnum != foundEmployee.getRole()) {
                        throw new IllegalArgumentException("Invalid role: " + role.get());
                    }
                } catch (IllegalArgumentException e) {
                    throw new IllegalArgumentException("Invalid role: " + role.get());
                }
            }

            return foundEmployee;
        } else {
            throw new IllegalStateException("Email: " + email + " is not present");
        }
    }


    public void addNewEmployee(Employee employee) {
        Optional<Employee> employeeOptional = employeeRepository
                .findEmployeeByEmail(employee.getEmail());
        if(employeeOptional.isPresent()) {
            throw new IllegalStateException("email already taken");
        }
        String encodedPassword = passwordEncoder.encode(employee.getPassword());
        employee.setPassword(encodedPassword);

        employeeRepository.save(employee);
    }

    public void deleteEmployeeByEmail(String email) {
        Optional<Employee> employeeOptional = employeeRepository
                .findEmployeeByEmail(email);
        if(employeeOptional.isEmpty()) {
            throw new IllegalStateException("Employee with email: " + email + " doesn't exist");
        }
        employeeRepository.deleteById(employeeOptional.get().getId());
    }

}
