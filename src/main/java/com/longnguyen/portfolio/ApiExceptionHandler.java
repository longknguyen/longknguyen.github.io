package com.longnguyen.portfolio;

import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ApiExceptionHandler {
    private static final String VALIDATION_ERROR_MESSAGE =
            "Enter a valid email address and a message of 5,000 characters or fewer.";

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleValidationError() {
        return ResponseEntity.badRequest().body(VALIDATION_ERROR_MESSAGE);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<String> handleUnreadableRequest() {
        return ResponseEntity.badRequest().body("The request body is invalid.");
    }
}
