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

    @Autowired
    private final BCryptPasswordEncoder passwordEncoder;

    // Manual constructor for dependency injection
    public EmployeeService(EmployeeRepository employeeRepository, BCryptPasswordEncoder passwordEncoder) {
        this.employeeRepository = employeeRepository;
        this.passwordEncoder = passwordEncoder;
    }


    public List<Employee> getEmployees() {
        return employeeRepository.findAll();
    }

    public Employee getEmployee(String email, String password) {
        Optional<Employee> employeeOptional = employeeRepository.findEmployeeByEmail(email);
        if (employeeOptional.isPresent()) {
            Employee foundEmployee = employeeOptional.get();
            if (passwordEncoder.matches(password, foundEmployee.getPassword())) {
                return foundEmployee;
            } else {
                throw new IllegalArgumentException("Invalid password");
            }
        } else {
            throw new IllegalStateException("email: " + email + " is not present");
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
