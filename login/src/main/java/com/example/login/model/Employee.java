package com.example.login.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.Period;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
@Entity
@Table(
        name = "employee",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "employee_email_unique", columnNames = "email"
                )
        }
)
public class Employee {

    @Id
    @SequenceGenerator(
            name = "employee_sequence",
            sequenceName = "employee_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "employee_sequence"
    )
    @Column(
            name = "id",
            updatable = false
    )
    private Long id;

    public Long getId() {
        return id;
    }


    @Column(
            name = "firstname",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String firstname;

    @Column(
            name = "lastname",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String lastname;

    @Column(
            name = "email",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String email;

    public String getEmail() {
        return email;
    }

    @Transient
    private Integer age;

    @Column(
            name = "dob",
            updatable = true
    )
    private LocalDate dob;

    @Column(
            name = "password",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String password;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public Integer getAge() {
        return Period.between(this.dob, LocalDate.now()).getYears();
    }
}