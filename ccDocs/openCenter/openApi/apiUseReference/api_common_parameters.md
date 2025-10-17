---
id: api_common_parameters
title: 公共请求参数
description: 每一个开放 API http 请求必须带上 CloudCanal AccessKeyId、SignatureMethod、SignatureNonce、Signature , 其中 Signature** 由前 3 者参数结合 CloudCanal SecretKey 计算得出。
---

## 描述 

每一个开放 API http 请求必须带上 CloudCanal **AccessKeyId**、**SignatureMethod**、**SignatureNonce**、**Signature** , 其中
**Signature** 由前 3 者参数结合 CloudCanal **SecretKey** 计算得出。

## URL 示例

```
/cloudcanal/console/api/v1/openapi/consolejob/queryconsolejob?SignatureMethod=HmacSHA1&SignatureNonce=123fsdf&AccessKeyId=akxxxxxxxx&Signature=sfdqfsdkflksfsf
```

## 请求参数

| 参数名称         | 参数说明     |     请求类型 |  是否必须      |  数据类型   |
| ------------ | -------------------------------- |-----------|--------|----|
| AccessKeyId  | 从 CloudCanal 获取的 AccessKey,与 SecretKey 配对 |  get    |   是   |string  |     
| SignatureMethod  | 签名方式,当前只支持 HmacSHA1 |   get    |   是   |string  |    
| SignatureNonce  | 唯一随机数，用于防止网络重放攻击。在不同请求间要使用不同的随机数值 |   get    |   是    |string  |   
| Signature  | 签名结果串,请按本文相关说明计算 |   get    |   是   |string  |  

## HTTP 代码说明

|参数名称         | 参数说明                             | 
| ------------ | -------------------|
| 200     |  调用成功    | 
| 499     |   必要参数为空   |    
| 498      |  AccessKeyId 对应的用户不存在   |    
| 497     |   签名错误   |

## 计算字符串拼接逻辑(java)

- 参数构建
```
Map<String, String> paramToSign = new HashMap<>();
paramToSign.put("SignatureMethod", signatureMethod);
paramToSign.put("SignatureNonce", signatureNonce);
paramToSign.put("AccessKeyId", ak);
String paramStr = OpenApiSigner.composeStringToSign(paramToSign);
```

- 参数拼接代码
```
    /**
     * 字符串拼接方法
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

## 签名计算逻辑(java)

- 将拼接好的字符串计算签名
```
Map<String, String> paramToSign = new HashMap<>();
paramToSign.put("SignatureMethod", signatureMethod);
paramToSign.put("SignatureNonce", signatureNonce);
paramToSign.put("AccessKeyId", ak);
String paramStr = OpenApiSigner.composeStringToSign(paramToSign);

String secretKey = "从 CloudCanal 获取的 SecretKey"
String signature = OpenApiSigner.signString(paramStr, secretKey);
```

- 签名方法

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

## 附录

- java dependency
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


