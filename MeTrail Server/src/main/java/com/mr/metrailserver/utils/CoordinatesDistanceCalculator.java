package com.mr.metrailserver.utils;

import com.mr.metrailserver.model.Point;

import java.util.List;

public class CoordinatesDistanceCalculator {
    public final static double AVERAGE_RADIUS_OF_EARTH_KM = 6371;


    public int calculateTotalDistanceInKilometers(List<Point> points) {
        int totalDistance = 0;

        for(int i = 0; i< points.size()-1; i++) {
            totalDistance += calculateDistanceInKilometersBetweenTwoPoints(points.get(i), points.get(i+1));
        }
        return totalDistance;
    }

    public int calculateDistanceInKilometersBetweenTwoPoints(Point pointA, Point pointB) {
        double latDistance = Math.toRadians(pointA.getLatitude() - pointB.getLatitude());
        double lngDistance = Math.toRadians(pointA.getLongitude() - pointB.getLongitude());

        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(pointA.getLatitude())) * Math.cos(Math.toRadians(pointB.getLatitude()))
                * Math.sin(lngDistance / 2) * Math.sin(lngDistance / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return (int) (Math.round(AVERAGE_RADIUS_OF_EARTH_KM * c));
    }
}
