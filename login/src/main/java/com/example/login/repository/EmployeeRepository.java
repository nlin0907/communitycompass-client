package com.example.login.repository;

import com.example.login.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    @Query("SELECT employee FROM Employee employee WHERE employee.email = ?1")
    Optional<Employee> findEmployeeByEmail(String email);


}