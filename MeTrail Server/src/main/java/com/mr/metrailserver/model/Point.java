package com.mr.metrailserver.model;

public class Point {

    private double latitude;
    private double longitude;
    private double velocity;

    public Point(double latitude, double longitude, double velocity) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.velocity = velocity;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public double getVelocity() {
        return velocity;
    }

    public void setVelocity(double velocity) {
        this.velocity = velocity;
    }
}
