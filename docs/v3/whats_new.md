---
id: whats_new_v4 
title: What's new in V4 
---
## Version 4 of NetDaemon

We are exited to introduce you to version 4 of NetDaemon! There should be a pretty easy [upgrade path for version 3 users](v3/app_model/moving_from_v3.md)

### .NET 8 and C# 12

NetDaemon always have been releasing new version following the Microsoft release schedule
of .NET to let our users to use the latest innovations and speed of modern .NET.

### Nuget packages

We have removed the `JoySoftware` from the nuget identity and all package now starting with `NetDaemon`. There are no company behind NetDaemon and the naming could lead to that conclusion.

We also moved the source deploy features to it's own nuget package. This will make the size of app builds a lot smaller for users that uses the recommended compiled deploy option.

:::info

If you are using the source only deploy model you will now have to include the `NetDaemon.AppModel.SourceDeployedApps` nuget package in your C# project. 

:::

### Removal of deprecated V2 references

:::warning

All references to old deprecated and unsupported version 2 of the runtime are removed from documentation and add-ons. Users that still use deprecated and unsupported software will have to fork NetDaemon repos from earlier commits.

:::
