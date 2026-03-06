---
id: change_console_config
title: Configure Console
description: It introduces how to change the Console configuration. 
---

This page introduces how to change the BladePipe Console configuration. 

## Procedure

1. Change the Console configuration. 

    ```
    vi {installation directory}/bladepipe/console/conf/business-north_america.properties
    ```

2. Save the modified parameter values. 

3. Restart the Console.

    ```
    cd {installation directory}/bladepipe/console/bin/ && su bladepipe -c "./stopConsole.sh" && su bladepipe -c "
      ./startConsole.sh"
    ```

