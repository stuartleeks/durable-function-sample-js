const df = require("durable-functions");

module.exports = async function (context, req) {
    const client = df.getClient(context);

    // This HTTP trigger expects the following query string parameters:
    //  - id:       This is constant across all steps for an instance and is used to correlate steps
    //  - stepname: This is an identifier for a given step

    const id = req.query.id;
    const stepName = req.query.stepname;

    context.log(`**** Starting trigger. Id '${id}', stepName '${stepName}'`)

    instance = await client.getStatus(id);
    context.log(`**** Trigger. Id '${id}', stepName '${stepName}'. Instance ${instance.instanceId}`)
    if (instance.instanceId === undefined){
        // no instance with id "id" currently, so create one
        context.log(`**** Creating new orchestration with ID = '${id}'.`);
        instance = await client.startNew("DurableFunctionsOrchestratorJS", id)
        context.log(`**** Created new orchestration with ID = '${id}'`);
    } else {
        // already have an instance with id "id"
        
        context.log(`**** Found orchestration with ID = '${id}', ${instance.runtimeStatus}`);
    }

    context.log(`**** Raising event for orchestration with ID = '${id}', stepName='${stepName}''.`);
    await client.raiseEvent(id, stepName);

    return client.createCheckStatusResponse(context.bindingData.req, id);
};