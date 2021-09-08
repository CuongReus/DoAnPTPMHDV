package com.logsik.taman.utils;

import org.hashids.Hashids;


public class HashUtils {
    private static String ALPHABET = "ABCDEFGHIKLMNPQRSTVXYZ1234567890";
    public static String hashNumber(Long number) {
        Hashids hashids = new Hashids("tadu-user-ref-code", 5,
                "ABCDEFGHIKLMNqwertyuioplkjhgfdsazxcvbnmOPQRSTVXYZ1234567890");
        return hashids.encode(number);
    }

    private static Hashids userTokenIds = new Hashids("tadu-user-token", 10);

    public static String hashUserId(Long id) {
        return userTokenIds.encode(id);
    }

    public static Long decodeUserId(String token) {
        long[] results = userTokenIds.decode(token);
        return results[0];
    }

    public static String hashUserIdAndToken(Long userId, Long userTokenId) {
        return userTokenIds.encode(userId, userTokenId);
    }

    /**
     *
     * @param token
     * @return long[0] is userId, long[1] is userTokenId
     */
    public static long[] decodeUserTokenId(String token) {
        long[] results = userTokenIds.decode(token);
        return results;
    }

    private static Hashids billingCodeHashIds = new Hashids("tadu-billing-code", 6, ALPHABET);

    public static String genBillingCode(Long id){
        return "BILL-" + billingCodeHashIds.encode(id);
    }
}
