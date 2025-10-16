---
id: api_common_parameters
title: Public Request Parameters
description: Each open API http request must include the BladePipe AccessKeyId, SignatureMethod, SignatureNonce, and Signature, wherein the Signature is derived by computing the preceding 3 parameters in conjunction with the BladePipe SecretKey.
---

## Summary 

Each open API http request must include the BladePipe **AccessKeyId**, **SignatureMethod**, **SignatureNonce**, and **Signature**, wherein
the **Signature** is derived by computing the preceding 3 parameters in conjunction with the BladePipe SecretKey.

## URL Example

```
/cloudcanal/console/api/v1/openapi/consolejob/queryconsolejob?SignatureMethod=HmacSHA1&SignatureNonce=123fsdf&AccessKeyId=akxxxxxxxx&Signature=sfdqfsdkflksfsf
```

## Request Parameters

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ | -------------------------------- |-----------|--------|----|
| AccessKeyId  | The AccessKey obtained from CloudCanal, paired with the SecretKey |   Get    |   True   |String  |     
| SignatureMethod  | The signature method, currently only supports HmacSHA1 |    Get    |   True   |String  |    
| SignatureNonce  | A unique random number used to prevent replay attacks on the network. Different random number values should be used for different requests |    Get    |   True    |String  |   
| Signature  | The resultant signature string; please calculate according to relevant instructions in this document |   Get    |   True   |String  |  

## HTTP Code Commentary

|ParameterName         | Parameter Description          | 
| ------------ | -------------------|
| 200     |  Successful invocation    | 
| 499     |  Compulsory parameters absent   |    
| 498      | The AccessKeyId corresponding to the user does not exist   |    
| 497     |  Invalid signature   |

## Logic For String Concatenation In Computation(Java)

- Parameter Construction
```
Map<String, String> paramToSign = new HashMap<>();
paramToSign.put("SignatureMethod", signatureMethod);
paramToSign.put("SignatureNonce", signatureNonce);
paramToSign.put("AccessKeyId", ak);
String paramStr = OpenApiSigner.composeStringToSign(paramToSign);
```

- Parameter Concatenation Code
```
    /**
     * String concatenation procedure
     */
    public static String composeStringToSign(Map<String, String> queries) {
        String[] sortedKeys = queries.keySet().toArray(new String[] {});
        Arrays.sort(sortedKeys);
        StringBuilder queryString = new StringBuilder();
        try {
            boolean first = true;
            for (String key : sortedKeys) {
                if (first) {
                    first = false;
                } else {
                    queryString.append("&");
                }

                queryString.append(percentEncode(key)).append("=").append(percentEncode(queries.get(key)));
            }

            return percentEncode(queryString.toString());
        } catch (UnsupportedEncodingException exp) {
            throw new RuntimeException("UTF-8 encoding is not supported.");
        }
    }

    private static String percentEncode(String value) throws UnsupportedEncodingException {
        return value != null ? URLEncoder.encode(value, ENCODING).replace("+", "%20").replace("*", "%2A").replace("%7E", "~") : null;
    }
```

## Signature Calculation Logic(Java)

- Deriving the signature from the concatenated string
```
Map<String, String> paramToSign = new HashMap<>();
paramToSign.put("SignatureMethod", signatureMethod);
paramToSign.put("SignatureNonce", signatureNonce);
paramToSign.put("AccessKeyId", ak);
String paramStr = OpenApiSigner.composeStringToSign(paramToSign);

String secretKey = "The SecretKey obtained from CloudCanal"
String signature = OpenApiSigner.signString(paramStr, secretKey);
```

- Signature Method

```
public static final String  ENCODING       = "UTF-8";

private static final String ALGORITHM_NAME = "HmacSHA1";

public static String signString(String stringToSign, String accessKeySecret) {
    try {
        Mac mac = Mac.getInstance(ALGORITHM_NAME);
        mac.init(new SecretKeySpec(accessKeySecret.getBytes(ENCODING), ALGORITHM_NAME));
        byte[] signData = mac.doFinal(stringToSign.getBytes(ENCODING));
        return DatatypeConverter.printBase64Binary(signData);
    } catch (NoSuchAlgorithmException | UnsupportedEncodingException | InvalidKeyException e) {
        throw new IllegalArgumentException(e.toString());
    }
}
```

## Appendix

- Java Dependency
```
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.Map;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
```


