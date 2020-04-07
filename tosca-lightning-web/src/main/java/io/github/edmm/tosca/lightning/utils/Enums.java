package io.github.edmm.tosca.lightning.utils;

public abstract class Enums {

    /**
     * A utility method for all enums for string to enum conversion
     *
     * @param c     the Enum type
     * @param value value as case insensitive string
     * @return The corresponding enum, or null
     */
    public static <T extends Enum<T>> T valueOf(final Class<T> c, final String value) {
        return valueOf(c, value, null);
    }

    /**
     * A utility method for all enums for string-to-enum conversion
     *
     * @param c            the Enum type
     * @param value        value as case insensitive string
     * @param defaultValue a default value
     * @return The corresponding enum, or null
     */
    public static <T extends Enum<T>> T valueOf(final Class<T> c, final String value, final T defaultValue) {
        if (c != null && value != null) {
            try {
                return Enum.valueOf(c, value.trim().toUpperCase());
            } catch (final IllegalArgumentException e) {
                return defaultValue;
            }
        }
        return defaultValue;
    }
}
