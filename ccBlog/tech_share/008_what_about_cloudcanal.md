---
id: what_about_cloudcanal
description: CloudCanal是一款由ClouGence公司发行的集结构迁移、数据全量迁移/校验/订正、增量实时同步为一体的数据迁移同步平台。产品包含完整的产品化能力，助力企业打破数据孤岛、完成数据互融互通，从而更好的使用数据。
title: CloudCanal 产品化之道
date: 2021-09-10
authors: juantu
tags:
  - tech_share
image: https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/ccBlog/tech_share/what_about_cloudcanal.png
slug: /data_insights/what_about_cloudcanal
---

## 前言
[CloudCanal](https://www.clougence.com?src=cc-doc-blog-what-about-cloudcanal) 是一款由[ClouGence公司](https://www.clougence.com?src=cc-doc)发行的集结构迁移、数据全量迁移/校验/订正、增量实时同步为一体的数据迁移同步平台。产品包含完整的产品化能力，助力企业打破数据孤岛、完成数据互融互通，从而更好的使用数据。CloudCanal社区版为免费版本，我们会持续地对其维护，请大家放心下载使用。如有兴趣使用请参考文章底部相关资料。


## 数据同步产品的透明化、可视化运维
数据同步产品是企业的基础设施产品，其透明化、可视化程度与产品的运维、使用效率息息相关。


### 透明化
透明化指产品内部本身对于用户来说不完全是一个黑盒子，产品内部核心构件以产品化的形式向用户透明，使得用户可以介入内部构件的管理，提供更加精细化的产品控制。

对于数据同步这类基础设施产品，透明化会显得更为重要。数据同步产品由于用户的数据源、数据负载、数据处理需求、机器环境等差异，用户在实际使用、运维中往往需要有对产品更强的干预能力，从而更好的满足自身的场景需求。在数据同步领域，这类干预诉求主要体现在如下几个方面：

- **源、目标核心组件透明化**：用户能够对源端的读取器和对端的写入器有更加精细的控制。例如对于源端可以配置限流、批大小、解析线程数等。
- **内部组件异常透明化**：在私有部署的情况下，数据同步产品的数据源、机器等等都是用户添加的。场景本身的复杂性，不可避免的导致一些由于使用、配置不当而产生的异常。内部组件异常透明化，可以使得用户更加准确、及时的发现问题、解决问题。例如数据同步过程中，数据源突然下线，通过透明化的日志即可看到数据源Connection refused异常，这样，可以快速将问题原因锁定在数据源无法访问这点上。
- **运行时信息透明化**：丰富的运行时信息能够使得出现问题时，提供更多诊断信息，快速定为问题原因。

### 可视化运维
可视化运维主要体现在产品功能各个维度的可视化成熟度。更高的可视化程度，会带来更好的易用性和产品体验。

## CloudCanal透明化、可视化运维
### 核心组件透明可视化
CloudCanal核心组件主要包含：

- 控制台(Console): 管控进程，负责产品化能力
- Sidecar组件: 机器保姆进程，负责task和console之间信息转发以及task的可用性保障
- 任务内核(Task): 具体迁移、同步任务的执行


其中针对Console组件，其内部还包含以下组件：

- 异步任务工作流：数据同步任务的创建过程比较复杂，CloudCanal通过异步工作流来完成。
- 状态机：状态机主要负责任务状态的切换，主要是结构迁移、全量、增量之间的阶段切换


在CloudCanal中，这些核心组件对用户都是透明的，用户可以通过可视化的界面对这些内部组件进行精细化的控制。
![2919b29a-cff1-4a20-bffa-37df4056989d-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/tech_share/0008/2919b29a-cff1-4a20-bffa-37df4056989d-image.png)

#### Sidecar
在机器管理页面可以对Sidecar组件进行控制和检查，包含：

- 生命周期管理
- 远程日志查看
- 详细机器监控（点击圆盘可以进入详细）

![e5f11662-9607-42bc-b6e9-3bb07f12a22b-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/tech_share/0008/e5f11662-9607-42bc-b6e9-3bb07f12a22b-image.png)

#### Console
##### 异步任务工作流
数据同步产品中任务创建是个复杂的流程，往往设计多个子任务。CloudCanal的console内置的异步任务工作流会按顺序执行子任务。针对失败的子任务，我们可以看到具体失败的步骤，以及错误信息，便于运维同学定位问题。
![138c8ba7-f494-4fc7-86d6-ca3630641fa8-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/tech_share/0008/138c8ba7-f494-4fc7-86d6-ca3630641fa8-image.png)
![6a1d90f8-2125-46ca-aa79-193c11378591-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/tech_share/0008/6a1d90f8-2125-46ca-aa79-193c11378591-image.png)

##### 状态机
每个任务都有其关联的状态机，负责任务的阶段流转。状态的流转由条件触发器触发。
![e16fa316-cf69-48c7-b0c1-bd2d17428424-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/tech_share/0008/e16fa316-cf69-48c7-b0c1-bd2d17428424-image.png)
![c5510305-3c92-452c-8ff7-4a16edba18ee-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/tech_share/0008/c5510305-3c92-452c-8ff7-4a16edba18ee-image.png)
#### Task
##### 任务详情
任务列表页提供了任务的列表信息和基本的生命周期控制能力以及进度查看。
![bda0e5dc-698d-41f7-b260-791429684c9f-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/tech_share/0008/bda0e5dc-698d-41f7-b260-791429684c9f-image.png)

任务详情页面提供了任务完整的详情信息，包括：

- 生命周期控制
- 订阅关系查看（库表映射）
- 源端、目标端数据源详细信息
- 各阶段同步细节
- 任务白屏化日志
- 关联的绑定机器信息
- 同步进度、位点细节

![4a917e2c-6115-4bd5-a1fa-cd31c8d5d468-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/tech_share/0008/4a917e2c-6115-4bd5-a1fa-cd31c8d5d468-image.png)


##### 任务内核参数
除任务详情的透明可视化之外，任务内核参数是CloudCanal对于任务精细化控制的重要能力。任务详情中的修改参数支持对任务内核进行更加精细化的控制，以目标端参数配置为例，我们可以控制例如：

- 异常跳过策略
- 并行度
- 约束冲突时的处理策略
- 对端RPS限流
- 大小写策略

![a1c07ab4-5f60-4986-bbb6-452bb04b519d-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/tech_share/0008/a1c07ab4-5f60-4986-bbb6-452bb04b519d-image.png)

### 内部组件异常透明化
CloudCanal的管控会搜集所有的异常日志，并且可视化的在控制台展示。核心组件的日志均会分类展示，便于用户快速查看日志和定位问题。CloudCanal会完整毫无遗漏的搜集所有运行时的异常，这也使得一些在日志中隐秘的、偶发的问题直接暴露出来。这些信息都会指导CloudCanal后续的研发，确保产品步步为营、高质量地去迭代升级。
![7ac8c7db-ca45-438b-8dad-6c7e279c423f-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/tech_share/0008/7ac8c7db-ca45-438b-8dad-6c7e279c423f-image.png)


### 运行时信息透明化
CloudCanal的运行时信息透明化主要体现在如下两个维度：

- 监控
- 日志
#### 监控
CloudCanal在控制台上即可查看所有组件的监控信息。每个核心组件的监控下按照不同维度会细分多张图表，让用户对核心组件有着完全的掌控。例如增量源端的监控，我们监控会细致到内存队列的阻塞时间、每秒flush事务数等指标。
![ac578344-579e-4061-acbc-111c96a0626a-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/tech_share/0008/ac578344-579e-4061-acbc-111c96a0626a-image.png)


#### 日志
在CloudCanal平台上提供了核心组件的白屏化日志，并且对日志均按照功能进行了划分。

##### 机器日志
在机器管理处，查看机器日志，我们可以查看机器的完整日志、慢通信日志、异常日志等信息。
![aaf203f7-f78f-4bf0-8224-097e84aecb06-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/tech_share/0008/aaf203f7-f78f-4bf0-8224-097e84aecb06-image.png)


##### 任务日志
在任务详情页，用户则可以查看实时的任务日志，确认任务实时运行状态或者确认问题。
![12c847fc-c75b-4e09-9cfa-a807791498fa-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/tech_share/0008/12c847fc-c75b-4e09-9cfa-a807791498fa-image.png)


## 总结
作为面向技术、运维人员的一款数据基础设施产品，在设计之初考虑产品层面的透明化、可视化运维是尤其重要的。这使得产品在后续功能变得越来越复杂和强大时，产品本身依然能够提供高质量的可运维性，同时也确保产品本身能够更好的迭代和发展。