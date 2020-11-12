package com.mr.metrailserver.utils;

public class TokenBuilder {

    private Long userId;
    private String tokenPrefix;
    private String token;
    private UserRole role;
    private String fullName;

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

    public TokenBuilder withUserId(long userId) {
        this.userId = userId;

        return this;
    }

    public TokenBuilder withFullName(String fullName) {
        this.fullName = fullName;

        return this;
    }

    public String build() {
        return "{\"token\":\""
                + this.tokenPrefix
                + this.token
                + "\","
                + "\"userId\": \""
                + this.userId
                + "\","
                + "\"fullName\": \""
                + this.fullName
                + "\","
                + "\"role\": \""
                + this.role
                + "\"}";
    }
}
