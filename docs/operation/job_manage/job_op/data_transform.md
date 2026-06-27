---
id: data_transform
title: Transform Data
description: This page shows a no-code data transformation way. Select one built-in script and the data can be transformed automatically before reaching the target system.
---

In BladePipe, you can transform data in an easy way. What you need to do is to configure scripts for specific fields in a visual interface. The scripts can be automatically invoked during DataJob to transform the field values.

This feature is available for Full Data migration, Incremental synchronization, Verification, and Correction.

## Script Format

Take the following script as an example:
```shell
e.g.,
return @fun.str.maskAfter(@params['col'],'-')
```

- `return` means returning the result after data processing.
- `fun` refers to the module. It can not be changed.
- `str` represents transforming data of the string type.
- `maskAfter` is the name of the transformation method.
- `@params['col']` means transforming data in the column named **col**.
- `'-'` is the method parameter, which can be changed. In the **maskAfter** method, it means to mask all characters after the **-** character in the value of the `col` column.

## Supported Scripts

### String Conversion

| Script| Description|
| --- | --- |
|return @fun.str.trim(@params['col'],' ') | Remove leading and trailing spaces from the string|
|return @fun.str.trimEnd(@params['col'],' ') | Remove trailing spaces from the string|
|return @fun.str.trimStart(@params['col'],' ') | Remove leading spaces from the string|
|return @fun.str.upperCase(@params['col']) | Convert the string to uppercase|
|return @fun.str.lowerCase(@params['col']) | Convert the string to lowercase|
|return @fun.str.subStringAfter(@params['col'],'-') |Extract the substring after the '-' character|
|return @fun.str.subStringBefore(@params['col'],'-') | Extract the substring before the '-' character|
|return @fun.str.maskAfter(@params['col'],'-') | Mask the substring after the '-' character, defaulting to *|
|return @fun.str.maskBefore(@params['col'],'@') | Mask the substring before the '@' character, defaulting to * |
|return @fun.str.maskBetweenIdx(@params['col'],2,8) | Mask the substring between indices 2 and 8, inclusive of the start and exclusive of the end, with indices starting at 0|
|return @fun.str.stringFormat(@params['col'],'prefix_%s_suffix') | Format the value with specified text expression|
|return @fun.str.join([@params['col1'],@params['col2'],...]) | Concatenate the values of multiple fields|
|return @fun.str.castToDateTimeWithFormat(@params['col'],'yyyy-MM-dd HH:mm:ss') | Convert strings to date and time in a specified format |
|return @fun.str.castToDateWithFormat(@params['col'],'yyyy-MM-dd') | Convert strings to date in a specified format |
|return @fun.str.castToTimeWithFormat(@params['col'],'HH:mm:ss') | Convert strings to time in a specified format |
| return @fun.str.regexReplaceAll(@params['col'],'regex','replacement')    | Match and replace target strings using regular expressions   |

### Data Type Conversion

| Script                                                                         | Description           |
|----------------------------------------------------------------------------|--------------|
| return @fun.type.typeCast(@params['col'],'target_type')                  | Convert data to the target type     |
:::info
**Supported target types(target_type)**: BOOLEAN / INTEGER / LONG / FLOAT / DOUBLE / DECIMAL / LOCAL_DATETIME / STRING / JSON
:::

### Condition-based Replacement

| Script                                                                        | Description                      |
|----------------------------------------------------------------------------|--------------------------|
| return @fun.rep.ifNullReplace(@params['col'],'replace_val','replace_type')                | Replace null to the target value      |
| return @fun.rep.timestampReplace(@params['col'],'ts_format','relation','compare_val','replace_val')  | Compare with the reference timestamp, and replace it with the specified value when the condition is satisfied   |
| return @fun.rep.numberReplace(@params['col'],'relation','compare_val','replace_val','replace_type')  | Compare with the reference value, and replace it with the specified value when the condition is satisfied    |
:::info
**Supported replacement value types(replace_type)**: BOOLEAN / INTEGER / LONG / FLOAT / DOUBLE / DECIMAL / LOCAL_DATETIME / STRING / JSON      
**ts_format**: The timestamp format, such as yyyy-MM-dd HH:mm:ss     
**Supported comparison operators (relation)**:EQ (equal to) / NEQ (not equal to) /GT (greater than) / LT (less than) / GTE (greater than or equal to) / LTE (less than or equal to)  
:::


## Procedure

You can configure data transformation when **creating a DataJob**. For created DataJobs, you can also transform the data by **modifying subscription**.

1. Click **DataJob** > **Create DataJob**, or go to the DataJob Details page and click **Functions** > **Modify Subscription** in the upper right corner of the page.

2. In the **Data Processing** step, select the target tables and open the data transformation configuration dialog box.
   - Configure in a single table: Select the table on the left side of the page and click **Operation** > **Data Cleaning**.
   - Configure in several tables: In the upper right corner above the list, click **Batch Operation** > **Data Cleaning**.

3. Select the columns that need data transformation.
   - Configure a single column: Select the column name on the left side of the dialog box.
   - Configure columns in batches: Click the search bar and select the column name from the drop-down list (you can select multiple columns). Then click **Find**.  

4. Click the question mark next to **Expression** on the right side of the dialog box. Select the data transformation script in the pop-up dialog box, and click it to automatically copy the script.

5. Paste the copied script into the **Expression** input box, and replace `col` in **@params['col']** of the script with the corresponding column name.

6. In the **Test Value** input box, enter a test value and click **Test**. Then you can view how the data is transformed.

7. Click **Submit**.