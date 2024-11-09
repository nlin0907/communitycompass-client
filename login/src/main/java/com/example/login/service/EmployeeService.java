package com.example.login.service;


import com.example.login.model.Employee;
import com.example.login.repository.EmployeeRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class EmployeeService {

    @Autowired
    private final EmployeeRepository employeeRepository;

    public List<Employee> getEmployees() {
        return employeeRepository.findAll();
    }

    public Employee getEmployee(String email, String password) {
        Optional<Employee> employeeOptional = employeeRepository.findEmployeeByEmail(email);
        if (employeeOptional.isPresent()) {
            if (!employeeOptional.get().getPassword().equals(password)) {
                throw new IllegalStateException("password is not correct for email: "+ email);
            }
        }else {
            throw new IllegalStateException("email: " + email + " is not present");
        }
        return employeeOptional.get();
    }

    public void addNewEmployee(Employee employee) {
        Optional<Employee> employeeOptional = employeeRepository
                .findEmployeeByEmail(employee.getEmail());
        if(employeeOptional.isPresent()) {
            throw new IllegalStateException("email already taken");
        }
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
