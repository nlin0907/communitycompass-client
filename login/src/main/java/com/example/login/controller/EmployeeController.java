package com.example.login.controller;

import com.example.login.model.Employee;
import com.example.login.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/employee")
@AllArgsConstructor
@CrossOrigin(origins = "http://192.168.56.1:3000")
public class EmployeeController {

    @Autowired
    private final EmployeeService employeeService;

    @GetMapping("/all")
    public List<Employee> getEmployees() {
        return employeeService.getEmployees();
    }

    @GetMapping("/get")
    public Employee getEmployee(@RequestParam(name = "email") String email,
                                @RequestParam(name = "password") String password) {
        return employeeService.getEmployee(email,password);
    }

    @PostMapping("/add")
    public void registerNewEmployee(@RequestBody Employee employee) {
        employeeService.addNewEmployee(employee);
    }

    @DeleteMapping("/delete")
    public void deleteEmployeeByEmail(@RequestParam(name = "email") String email) {
        employeeService.deleteEmployeeByEmail(email);
    }
}
