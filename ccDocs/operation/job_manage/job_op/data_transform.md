---
id: data_transform
title: 清洗转换数据
---

CloudCanal 可在特定字段上设置数据转换脚本，任务运行时自动调用脚本，并对相应的字段值进行计算，达到数据清洗和转换的目的。

当前功能适用于全量迁移、增量同步、数据校验和数据订正。

## 脚本格式
以下面的脚本为例：
```shell
e.g.,
return @fun.str.maskAfter(@params['col'],'-')
```
  - `return` 即处理完毕后返回结果。
  - `fun` 指模块，当前固定。
  - `str` 代表字符串类型的转换方法。
  - `maskAfter` 为转换方法名称。
  - `@params['col']` 代表处理名字为 `col` 的字段值。
  - `'-'` 为方法参数，可更换，在 `maskAfter` 方法中的意思是将字段 `col` 的值 `-` 字符之后的字符串都遮掩。

## 当前支持的脚本

| 脚本| 说明|
| --- | --- |
|return @fun.str.trim(@params['col'],' ') | 去掉字符串前后的空格|
|return @fun.str.trimEnd(@params['col'],' ') | 去掉字符串结尾的空格|
|return @fun.str.trimStart(@params['col'],' ') | 去掉字符串头部的空格|
|return @fun.str.upperCase(@params['col']) | 将字符串转大写|
|return @fun.str.lowerCase(@params['col']) | 将字符串转小写|
|return @fun.str.subStringAfter(@params['col'],'-') |截取'-'字符之后字符串|
|return @fun.str.subStringBefore(@params['col'],'-') | 截取'-'字符之前字符串|
|return @fun.str.maskAfter(@params['col'],'-') | 遮掩'-'字符之后的字符串，默认使用 *|
|return @fun.str.maskBefore(@params['col'],'@') | 遮掩'@'字符之前的字符串，默认使用 * |
|return @fun.str.maskBetweenIdx(@params['col'],2,8) | 遮掩 2 ~ 8 序号之间的字符串，序号从 0 开始, 开始位置包含, 结束位置排除|
|return @fun.str.stringFormat(@params['col'],'prefix_%s_suffix') | 使用指定表达式格式化列的值|
|return @fun.str.castToDateTimeWithFormat(@params['col'],'yyyy-MM-dd HH:mm:ss') | 将字符串转换为指定格式的日期时间数据|
|return @fun.str.castToDateWithFormat(@params['col'],'yyyy-MM-dd') | 将字符串转换为指定格式的日期数据|
|return @fun.str.castToTimeWithFormat(@params['col'],'HH:mm:ss') | 将字符串转换为指定格式的时间数据|

## 操作说明

用户可在 **创建任务** 时设置数据清洗。对于已创建的任务，也可通过 **修改订阅** 清洗数据。

1. 点击 **同步任务** > **创建任务**，或进入任务详情页，点击页面右上角 **功能列表** > **修改订阅**。
2. 在 **数据处理** 步骤，选择相应的表并进入数据清洗设置界面。
    - 单独设置：在页面左侧选择表，并点击 **操作** > **数据清洗**。
    - 批量设置：在列表右上方点击 **批量操作** > **数据清洗**。
3. 选择需要设置数据清洗的列。
   - 单独设置：在弹出的对话框左侧，选择列名。
   - 批量设置：在输入框内选择需要设置数据清洗的列名（可选择多个），点击 **查找有该列的表**。
4. 在对话框右侧点击 **表达式** 旁的 ![](../../../assets/transform_data/icon_1.png) 图标。在弹出的对话框中选择数据清洗脚本，点击后即自动复制脚本。
5. 将复制的脚本粘贴到 **表达式** 输入框内，并将 **@params['col']** 内的 `col` 替换为对应的列名。
6. 在 **测试值** 输入框内，可输入测试值，并点击 **测试**，查看数据清洗转换效果。
7. 点击 **确定** 完成设置。
