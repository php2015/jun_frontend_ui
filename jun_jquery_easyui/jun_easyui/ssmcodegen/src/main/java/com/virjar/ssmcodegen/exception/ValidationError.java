package com.virjar.ssmcodegen.exception;

public class ValidationError extends RuntimeException {

    /**
     * 
     */
    private static final long serialVersionUID = -7031839017845544375L;

    public ValidationError(String message) {
        super(message);
    }
}
