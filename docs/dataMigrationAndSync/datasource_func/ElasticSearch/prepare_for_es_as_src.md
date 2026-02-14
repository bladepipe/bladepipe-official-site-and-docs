---
id: prepare_for_es_as_src
title:  Required Privileges for ElasticSearch CDC
description: To replicate data from ElasticSearch via Change Data Capture(CDC) using BladePipe, a ElasticSearch user needs to have certain privileges.
---

BladePipe uses the [cloudcanal-es-trigger](https://github.com/ClouGence/cloudcanal-es-trigger) plugin to sync incremental data from ElasticSearch. This article describes the preparation required before sync, which include **compiling the plugin** and **installing the plugin**.

## Compile the Plugin

The plugin adheres to the [ElasticSearch plugin standards](https://www.elastic.co/guide/en/elasticsearch/plugins/current/plugin-authors.html). It is a open-source plugin on [GitHub](https://github.com/ClouGence/cloudcanal-es-trigger), compatible with ElasticSearch 7.x and 8.x.

The primary function of this plugin is to **capture data changes in ElasticSearch** and **write them to a separate index**, making it easier for downstream tools to search and track this index.

Since the plugin needs to be loaded by the ElasticSearch server nodes, it is necessary to obtain the specific version of ElasticSearch in advance, compile and package the plugin.

### Obtain the ElasticSearch Version

Run the command `curl -XGET es_node_host:es_node_port` to obtain the ElasticSearch version number. The value of the **number** field within the **version** section in the result represents the version number.

```shell
e.g.,
   
[es@es_host bin]$ curl -XGET localhost:9200
{
   ...
   "version" : {
      "number" : "7.10.1",
      ...
   },
   ...
   }
```

### Install the Java SDK

Install JDK on the machine to be used to compile the plugin.
   
- **For ElasticSearch 7.x**: Install JDK 8.
- **For ElasticSearch 8.x**: Install JDK 17 or above.

:::info
For OpenJDK installation, see [How to download and install prebuilt OpenJDK packages](https://openjdk.org/install/).

Alternatively, you can use the third-party Azul Zulu OpenJDK. For installation instructions, see [Install Azul Zulu on macOS](https://docs.azul.com/core/install/macos).
:::

### Prepare the Plugin Code

1. Clone or download the [cloudcanal-es-trigger project code](https://github.com/ClouGence/cloudcanal-es-trigger) to the machine to be used to compile the plugin.

2. Enter the code directory and edit the **gradle.properties** file. Modify the values of **cc.es7.version** or **cc.es8.version** to match the ElasticSearch version number obtained earlier.
   
```shell
e.g.,

cc.es7.version=7.10.1
cc.es8.version=8.15.0
```

### Compile and Package the Plugin

Based on the ElasticSearch version, run the command `sh ./all_build.sh es-trigger-es7(8)` to compile and package the plugin.

```shell
e.g.,
  
cloudcanal-es-trigger(main): echo $JAVA_HOME
/Users/xxxxx/Library/Java/JavaVirtualMachines/azul-1.8.0_312/Contents/Home
cloudcanal-es-trigger(main): sh ./all_build.sh es-trigger-es7
```

:::info
It is recommended to check the JDK version before this step by running `echo $JAVA_HOME` command.

If the machine has multiple JDK versions installed, you can switch between them by modifying the **JAVA_HOME** environment variable.
:::

## Install the Plugin

### Upload and Install the Plugin

1. Enter the `es-trigger-es7(8)/build/dist` directory.
2. Upload the **es-trigger-es7(8).zip** file to the plugin directory on each ElasticSearch node.
   
```shell
e.g.,
   
dist(main): scp es-trigger-es7.zip root@xx.xx.xx.xx:/home/es/elasticsearch/plugins
```

3. Unzip and then clean up the package.
   
```shell
e.g.,
   
[es@es_host plugins]$ unzip es-trigger-es7(8).zip -d ./es-trigger-es7(8)
[es@es_host plugins]$ rm -f es-trigger-es7(8).zip
```

### Restart ElasticSearch

To ensure a smooth restart process without downtime, restart each ElasticSearch node one by one.
  
```shell
e.g.,
   
[root@es_host ~]# systemctl restart elasticsearch.service
```

## Confirm Plugin Activation

To verify that the ElasticSearch plugin has successfully loaded, check the main log for the following entries.

```shell
Component CcEs7IdxOpListener start successfully.
```