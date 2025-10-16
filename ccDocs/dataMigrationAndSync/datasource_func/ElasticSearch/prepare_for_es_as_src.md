---
id: prepare_for_es_as_src
title: Elasticsearch 源端同步准备
description: CloudCanal 同步 Elasticsearch 源端数据需要做的准备动作。
---
CloudCanal 使用 [cloudcanal-es-trigger](https://github.com/ClouGence/cloudcanal-es-trigger) 插件实现 Elasticsearch 源端增量数据同步。

本文介绍在做该项工作之前的准备工作，涉及 **插件代码编译** 和 **插件安装** 两项工作。

## 插件代码编译

cloudcanal-es-trigger 插件遵循 [Elasticsearch 插件实现标准](https://www.elastic.co/guide/en/elasticsearch/plugins/current/plugin-authors.html)，并在 [github](https://github.com/ClouGence/cloudcanal-es-trigger) 上开源，目前支持 7.x 和 8.x 版本的 Elasticsearch。

该插件主要作用是 **捕获 Elasticsearch 的数据变更并写入独立索引中**，方便下游工具对该索引进行检索订阅。

因插件需要被 Elasticsearch server 节点加载，所以需要提前获得 Elasticsearch 具体版本并编译出对应的插件包。

### 确认 Elasticsearch 版本

执行 `curl -XGET es_node_host:es_node_port` 命令获取信息，其中 **version** 文本段落中的 **number** 字段值即版本号。

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

### 准备 Java SDK

编译机器安装 JDK，Elasticsearch 7.x 版本请安装 JDK 8，Elasticsearch 8.x 版本请安装 JDK 17 及以上。

:::info
OpenJDK 安装可参考 `https://openjdk.org/install/` 官方文档。

可选第三方 Azul Zulu OpenJDK `https://docs.azul.com/core/install/macos` 。
:::

### 准备插件代码

1. 从 [cloudcanal-es-trigger 项目主页](https://github.com/ClouGence/cloudcanal-es-trigger) 克隆或者下载代码到本地。

2. 进入代码文件夹目录，编辑 `gradle.properties` 文件，修改 `cc.es7.version` 或 `cc.es8.version` 的值 ，对应值即之前拿到的 Elasticsearch 版本号。
   
```shell
e.g.,

cc.es7.version=7.10.1
cc.es8.version=8.15.0
```

### 编译并打包插件

根据 Elasticsearch 版本执行 `sh ./all_build.sh es-trigger-es7(8)` 命令进行编译和打包。

```shell
e.g.,
  
cloudcanal-es-trigger(main): echo $JAVA_HOME
/Users/xxxxx/Library/Java/JavaVirtualMachines/azul-1.8.0_312/Contents/Home
cloudcanal-es-trigger(main): sh ./all_build.sh es-trigger-es7
```

:::info
建议执行本动作之前，可以通过 `echo $JAVA_HOME` 确认 JDK 版本。

如打包机器上装有多个版本 JDK ，可修改 **JAVA_HOME** 环境变量进行切换。
:::

## 插件安装

### 上传并安装插件包

1. 进入 `es-trigger-es7(8)/build/dist` 目录。
2. 上传 **es-trigger-es7(8).zip** 到各个 Elasticsearch 节点插件目录。
```shell
e.g.,
   
dist(main): scp es-trigger-es7.zip root@xx.xx.xx.xx:/home/es/elasticsearch/plugins
```

3. 解压缩并清理压缩包。
```shell
e.g.,
   
[es@es_host plugins]$ unzip es-trigger-es7(8).zip -d ./es-trigger-es7(8)
[es@es_host plugins]$ rm -f es-trigger-es7(8).zip
```

### 重启 Elasticsearch

执行命令逐个重启 Elasticsearch 节点。
  
```shell
e.g.,
   
[root@es_host ~]# systemctl restart elasticsearch.service
```

## 确认插件生效

查看 Elasticsearch 主日志，确认出现以下日志，则插件加载成功。

```shell
Component CcEs7IdxOpListener start successfully.
```