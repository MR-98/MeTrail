package com.mr.metrailserver.utils;

import com.mr.metrailserver.security.SecurityConstants;

public class TokenBuilder {

    private String tokenPrefix;
    private String token;
    private UserRole role;

    public TokenBuilder() {
    }

    public TokenBuilder withTokenPrefix(String tokenPrefix) {
        this.tokenPrefix = tokenPrefix;

        return this;
    }

    public TokenBuilder withToken(String token) {
        this.token = token;

        return this;
    }

    public TokenBuilder withRole(UserRole role) {
        this.role = role;

        return this;
    }

    public String build() {
        return "{\"token\":\""
                + this.tokenPrefix
                + this.token
                + "\","
                + "\"role\": \""
                + this.role
                + "\"}";
    }
}
