package com.example.login;

import com.example.login.repository.EmployeeRepository; 
import com.example.login.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean; 
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder; 
import org.junit.jupiter.api.Test;

@SpringBootTest
class LoginApplicationTests {

	@Autowired
    private EmployeeService employeeService;

	@MockBean
    private EmployeeRepository employeeRepository;

    @MockBean
    private BCryptPasswordEncoder passwordEncoder;

	@Test
	void contextLoads() {
	}

}
