---
id: rn-cloudcanal-2-3-1-0
title: 2.3.1.0
---

## CloudCanal-2.3.1.0

发版时间:2022年12月13日 版本号: 2.3.1.0

### 新链路
暂无
### 新特性

- 支持新License授权体系，详情见[官方文档](../license/license_use.md)
### 优化

- 接口参数校验支持国际化

### 问题修复

- 修复 MySQL->SQLServer truncate DDL同步的问题
- 修复 审计处理时吞异常的问题
- 修复 某些场景下创建校验任务报错NPE的问题
- 修复 部分链路全量处理空字符串写入报错的问题
- 修复 metaHistory sqlType记录不准确的问题
- 修复 drop table / rename table的DDL引发table meta获取不到的问题