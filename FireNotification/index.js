/*
 * This function is not intended to be invoked directly. Instead it will be
 * triggered by an orchestrator function.
 * 
 * Before running this sample, please:
 * - create a Durable orchestration function
 * - create a Durable HTTP starter function
 * - run 'npm install durable-functions' from the wwwroot folder of your
 *   function app in Kudu
 */

module.exports = function (context) {

    // This activity function is fired once all steps for an instance have completed
    // Currently it simply outputs a log message, but it can take whatever action you want ;-)

    context.log(`**** Firing notification for instance '${context.bindings.id}'`);

    context.done(null, `Hello ${context.bindings.id}!`);
};