# durable-function-sample-js

This is a test project to explore JavaScript Durable Functions

The aim of the sample is to wait for two HTTP requests to be invoked and then to make a new HTTP request. I.e. to aggregate multiple HTTP requests

There is an HTTP trigger function `DurableFunctionsHttpStart`. This expects two query string parameters: `id` and `stepname`. `id` is used to correlate multiple steps, and `stepname` is the step identifier (we wait for two steps to complete: `step1` and `step2`)

The `id` parameter is used as the instanceId for orchestrations. If there is not an existing instance with `id` then the trigger function creates it. It then raises an external event with name `stepname`

The orchestrator waits for two external events with name `step1` and `step2`. When both of those have been received then it calls the `FireNotification` activity Function to raise a new notification

## Running the sample

Before running the sample, either start the Azure Storage Emulator or change the Storage connection string to point to a storage account.

To start the function

```powershell
func start
```

Once the function host has started up, open a new PowerShell instance and run the following:

```powershell
# pick a new id value
$id = "id1"

# Fire the trigger for step1
$r1 = irm "http://localhost:7071/api/handleNotification?id=$id&stepname=step1"; $r1

# Fire the trigger for step2
$r2 = irm "http://localhost:7071/api/handleNotification?id=$id&stepname=step2"; $r2
```