---
id: redis_big_key_opt
description: Struggling with big keys during Redis migration or full sync? Learn how lazy loading and sharded sync prevent OOM, command limits, and sync failures.
title: How to Handle Big Keys in Redis Migration and Sync
date: 2025-06-24
authors: juantu
tags:
  - data_insights
image: /img/blog/data_insights/redis_big_key_opt.png
---

In enterprise-grade data replication workflows, Redis is widely adopted thanks to its blazing speed and flexible data structures. But as data grows, so do the keys in Redis—literally. Over time, it’s common to see Redis keys ballooning with hundreds of thousands of elements in structures like Lists, Sets, or Hashes.

These “big keys” are usually one of the roots of poor performance in a full data migration or sync, slowing down processes or even bringing them to a crashing halt.

That’s why [BladePipe](https://www.bladepipe.com), a professional data replication platform, recently rolled out a fresh round of enhancements to its Redis support. This includes expanded command coverage, data verification feature, and more importantly, **major improvements for big key sync**.

Let’s dig into how these improvements work and how they keep Redis migrations smooth and reliable.

## Challenges of Big Key Sync
In high-throughput, real-time applications, it’s common for a single Redis key to contain a massive amount of elements. When it comes to syncing that data, a few serious issues can pop up:

- **Out-of-Memory (OOM) Crashes:** Reading big keys all at once can cause the sync process to blow up memory usage, sometimes leading to OOM.
- **Protocol Size Limits:** Redis commands and payloads have strict limits (e.g., 512MB for a single command via the RESP protocol). Exceed those limits, and Redis will reject the operation.
- **Target-Side Write Failures:** Even if the source syncs properly, the target Redis might fail to process oversized writes, leading to data sync interruption.


## How BladePipe Tackles Big Key Syncs
To address these issues, BladePipe introduces lazy loading and sharded sync mechanisms specifically tailored for big keys without sacrificing data integrity.

### Lazy Loading
Traditional data sync tools often attempt to load an entire key into memory in one go. BladePipe flips the script by using on-demand loading. Instead of stuffing the entire key into memory, BladePipe streams it shard-by-shard during the sync process.

This dramatically reduces memory usage and minimizes the risk of OOM crashes.

### Sharded Sync
The heart of BladePipe’s big key optimization lies in breaking big keys into smaller shards. Each shard contains a configurable number of elements and is sent to the target Redis in multiple commands.

- Configurable parameter: `parseFullEventBatchSize`
- Default value: 1024 elements per shard
- Supported types: List, Set, ZSet, Hash

Example: If a Set contains 500,000 elements, BladePipe will divide it into ~490 shards, each with up to 1024 elements, and send them as separate SADD commands.

### Shard-by-Shard Sync Process   
Here’s a breakdown of how it works:
1. **Shard Planning:** BladePipe inspects the total number of elements in a big key and calculates how many shards are needed based on the parameter `parseFullEventBatchSize`.
2. **Shard Construction & Dispatch:** Each shard is formatted into a Redis-compatible command and sent to the target sequentially.
3. **Order & Integrity Guarantees:** Shards are written in the correct order, preserving data consistency on the target Redis.

## Real-World Results

To benchmark the improvements, BladePipe ran sync tests with a mixed dataset:

- 1 million regular keys (String, List, Hash, Set, ZSet)
- 50,000 large keys (~30MB each; max ~35MB)

Here’s what performance looked like:

![](../assets/blog/data_insights/redis_big_key_opt/big_key.png)


The result shows that even with big keys in the mix, BladePipe achieved a steady sync throughput of 4–5K RPS from Redis to Redis, which is enough to handle the daily production workloads for most businesses without compromising accuracy.

## Wrapping Up
Big keys don’t have to be big problems. With lazy loading and sharded sync, BladePipe provides a reliable and memory-safe way to handle full Redis migrations—even for your biggest keys.