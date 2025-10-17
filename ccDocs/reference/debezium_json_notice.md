---
id: debezium_json_notice
title: 源端 Kafka Debezium Json 使用说明
---
本文主要介绍源端 Kafka Debezium Json 使用的一些注意事项。
## 消息不携带 Schema：
```json
{
  ...
  "after":...,
  ...
}
```
消息不携带 Schema 的情况，CloudCanal 会将推断类型写入，需要注意以下事项：

- CloudCanal 源端 kafka 参数 **envelopSchemaInclude** 设置为 false
- Decimal 类型的字段，需要设置 Debezium 参数 **decimal.handling.mode** 为 double 或 string
- Date、DateTime、Time 类型的字段，需要使用 Debezium 的 [自定义转换器](https://debezium.io/documentation/reference/2.4/development/converters.html) 转换为标准 **ISO** 时间，其他非法时间转换为 **null**
- 不支持 Bytes 类型

## 消息携带 Schema：
```json
{
  "schema": ...,
  "payload": ...
}
```
消息携带 Schema 的情况，CloudCanal 对消息中的 Schema 进行解析后，根据 Schema 所定义的类型进行写入，需要注意以下事项：

- CloudCanal 源端 kafka 参数 **envelopSchemaInclude** 设置为 true
- 二进制类型的字段，Schema 中 type 必须是 **bytes**；
```json
{
  "type": "bytes",
  "optional": true,
  "field": "binary"
},
```

- Time 类型范围应该在 00:00:00 至 23:59:59 之间；超出此范围，将被转换为 **null**
- Date / DateTime / Timestamp 类型应该为标准 **ISO** 时间；非法时间，将被转换为 **null**
