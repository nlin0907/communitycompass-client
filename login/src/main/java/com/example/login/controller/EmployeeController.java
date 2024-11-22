package com.example.login.controller;

import com.example.login.model.Employee;
import com.example.login.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/employee")
@CrossOrigin(origins = "*")
public class EmployeeController {

    private final EmployeeService employeeService;

    @Autowired
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }


    @GetMapping("/all")
    public ResponseEntity<List<Employee>> getEmployees() {
        List<Employee> employees = employeeService.getEmployees();
        return ResponseEntity.ok(employees);
    }

    @GetMapping("/get")
    public ResponseEntity<Employee> getEmployee(@RequestParam(name = "email") String email,
                                                @RequestParam(name = "password") String password) {
        try {
            Employee employee = employeeService.getEmployee(email, password);
            return ResponseEntity.ok(employee);
        } catch (IllegalArgumentException | IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<String> registerNewEmployee(@RequestBody Employee employee) {
        try {
            employeeService.addNewEmployee(employee);
            return ResponseEntity.status(HttpStatus.CREATED).body("Employee registered successfully");
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/delete")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<String> deleteEmployeeByEmail(@RequestParam(name = "email") String email) {
        try {
            employeeService.deleteEmployeeByEmail(email);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Employee deleted successfully");
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}

