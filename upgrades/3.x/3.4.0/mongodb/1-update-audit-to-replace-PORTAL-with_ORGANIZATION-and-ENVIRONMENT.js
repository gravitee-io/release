print('In audits collection replace PORTAL with ENVIRONMENT or ORGANIZATION regarding audit type');
let auditIdToOrg = [];
let auditIdToEnv = []
db.audits.find({referenceType:'PORTAL'}).forEach(audit => {
    if (
        audit.event.startsWith('IDENTITY_PROVIDER') ||
        audit.event.startsWith('ROLE') ||
        audit.event.startsWith('USER') ||
        (audit.event.startsWith('MEMBERSHIP') && audit.patch.includes('"organization"'))
    ) {
        auditIdToOrg.push(audit._id);
    }
    else {
        auditIdToEnv.push(audit._id);
    }
});
try {
    const orgUpdateResult = db.audits.updateMany({ _id: { $in: auditIdToOrg } }, { $set: { referenceType: "ORGANIZATION" } });
    if (orgUpdateResult.matchedCount && orgUpdateResult.modifiedCount) {
        print(`Successfully modified ${orgUpdateResult.modifiedCount} lines to ORGANIZATION.`)
    } else {
        print(`No audit has been modified to ORGANIZATION.`)
    }
} catch(e) {
    print(`Error while updating audits to ORGANIZATION.\nError: ${e}`);
}

try {
    const envUpdateResult = db.audits.updateMany({ _id: { $in: auditIdToEnv } }, { $set: { referenceType: "ENVIRONMENT" } })
    if (envUpdateResult.matchedCount && envUpdateResult.modifiedCount) {
        print(`Successfully modified ${envUpdateResult.modifiedCount} lines to ENVIRONMENT.`)
    } else {
        print(`No audit has been modified to ENVIRONMENT.`)
    }
} catch(e) {
    print(`Error while updating audits to ENVIRONMENT.\nError: ${e}`);
}