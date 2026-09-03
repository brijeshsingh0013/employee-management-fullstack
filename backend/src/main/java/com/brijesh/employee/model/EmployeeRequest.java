package com.brijesh.employee.model;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDate;

public record EmployeeRequest(
        @NotBlank @Size(max = 60) String firstName,
        @NotBlank @Size(max = 60) String lastName,
        @NotBlank @Email @Size(max = 120) String email,
        @NotBlank @Size(max = 80) String department,
        @NotBlank @Size(max = 80) String role,
        @NotNull @DecimalMin("0.0") BigDecimal salary,
        @NotNull LocalDate joiningDate
) {}

