/*
 * This function is not intended to be invoked directly. Instead it will be
 * triggered by an HTTP starter function.
 * 
 * Before running this sample, please:
 * - create a Durable activity function (default name is "Hello")
 * - create a Durable HTTP starter function
 * - run 'npm install durable-functions' from the wwwroot folder of your 
 *    function app in Kudu
 */

const df = require("durable-functions");

module.exports = df.orchestrator(function* (context) {

    // Get the instance ID for this orchestration instance
    const id = context.df.instanceId;

    // In this orchestration we want to wait for "external events", i.e. notifications
    // We will wait for notifications for "step1" and "step2", but this can be generalised as needed
    const step1 = context.df.waitForExternalEvent("step1");
    const step2 = context.df.waitForExternalEvent("step2");
    // wait until we have both steps completed, i.e. until we have received both notifications
    yield context.df.Task.all([step1, step2]);

    // All steps have completed, call the FireNotidication activity function 
    // to create the notification that "id" has completed
    yield context.df.callActivity("FireNotification", id);

    return;
});