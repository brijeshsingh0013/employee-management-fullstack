package com.brijesh.employee.service;

import com.brijesh.employee.exception.ResourceNotFoundException;
import com.brijesh.employee.model.Employee;
import com.brijesh.employee.model.EmployeeRequest;
import com.brijesh.employee.repository.EmployeeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class EmployeeService {
    private final EmployeeRepository repository;

    public EmployeeService(EmployeeRepository repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    public List<Employee> findAll(String query) {
        if (query == null || query.isBlank()) {
            return repository.findAll();
        }
        String keyword = query.trim();
        return repository.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrDepartmentContainingIgnoreCase(
                keyword, keyword, keyword);
    }

    @Transactional(readOnly = true)
    public Employee findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee " + id + " was not found."));
    }

    public Employee create(EmployeeRequest request) {
        Employee employee = new Employee();
        apply(request, employee);
        return repository.save(employee);
    }

    public Employee update(Long id, EmployeeRequest request) {
        Employee employee = findById(id);
        apply(request, employee);
        return repository.save(employee);
    }

    public void delete(Long id) {
        repository.delete(findById(id));
    }

    private void apply(EmployeeRequest request, Employee employee) {
        employee.setFirstName(request.firstName().trim());
        employee.setLastName(request.lastName().trim());
        employee.setEmail(request.email().trim().toLowerCase());
        employee.setDepartment(request.department().trim());
        employee.setRole(request.role().trim());
        employee.setSalary(request.salary());
        employee.setJoiningDate(request.joiningDate());
    }
}

