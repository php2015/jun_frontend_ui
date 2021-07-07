package com.virjar.ssmcodegen.exception;

/**
 *
 * Created by virjar on 16/7/30.
 */
public class FeatureUnsupportException extends CodegenException {
    public FeatureUnsupportException() {
    }

    public FeatureUnsupportException(Throwable cause) {
        super(cause);
    }

    public FeatureUnsupportException(String message) {
        super(message);
    }

    public FeatureUnsupportException(String message, Throwable cause) {
        super(message, cause);
    }

    public FeatureUnsupportException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
