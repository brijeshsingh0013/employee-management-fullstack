package com.brijesh.employee.repository;

import com.brijesh.employee.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    List<Employee> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrDepartmentContainingIgnoreCase(
            String firstName, String lastName, String department);

    boolean existsByEmailIgnoreCase(String email);
}

