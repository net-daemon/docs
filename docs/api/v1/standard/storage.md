---
id: storage
title: Storage
---

With NetDaemon you can manage state using the storage. The storage is persisted per application instance in json file in the .storage folder. If you rename the class or the instance id the old storage will not be read att startup. All persisted states will be available after startup of applications.

## Store and get state using Storage property

Storing state is as simple as using the dynamic property `Storage`

```csharp
// Store a int value
Storage.MyIntValue = 10;
// Store a string
Storage.AString = "10";
// Read the int
int? someInt = Storage.MyIntValue;
// Read the string
string aString = Storage.AString ?? "defaultvalue";
```

## Store and get custom objects

You can use the `SaveDataAsync<T>` and `GetDataAsync<T>` to store custom data. The data have to be serializable with the `System.Text.Json`. This will not be unique to the app storing the data so it could be shared amongs several apps.

Example:
```csharp
// Just any Json serializable class or struct
public class MyData
{
    public int SomeNumber {get;set;}
    public int SomeString {get;set;}
}

// Save MyData using the persistance capabilites of NetDaemon
public async Task SaveMyState(string id, MyData data)
{
    await SaveDataAsync<MyData>(id, data);
}

// Get MyData using the persistance capabilites of NetDaemon
public async Task<MyData> GetMyState(string id)
{
    return await GetDataAsync<MyData>(id);
}

```