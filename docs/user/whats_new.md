---
id: whats_new_v5
title: What's new in V5 
---
## Version 5 of NetDaemon

We are exited to introduce you to version 5 of NetDaemon!

For version 4 users it is a matter of using the latest version of the nuget packages and the v5/.NET 9 version of the NetDaemon
 Docker image or add-on. 

If you are still using version 3 it is really time to upgrade, we do not longer support that version, 
see the [upgrade path for version 3 users](user/app_model/moving_from_v3.md)


### .NET 9 and C# l3

NetDaemon always have been releasing new version following the Microsoft release schedule
of .NET to let our users to use the latest innovations and speed of modern .NET.


:::info

If you are using the source only deploy model you will now have to include the `NetDaemon.AppModel.SourceDeployedApps` nuget package in your C# project. 

:::

### Removal of deprecated V2 references

:::warning

All references to old deprecated and unsupported version 2 of the runtime are removed from documentation and add-ons. Users that still use deprecated and unsupported software will have to fork NetDaemon repos from earlier commits.

:::
