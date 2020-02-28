const AWS = require('aws-sdk');
const ssm = new AWS.SSM();

const getSecret = async (param) => {
    const entry = await (ssm.getParameter({
        Name: param,
        WithDecryption: true,
    }).promise());
    return entry.Parameter.Value;
};

module.exports = {getSecret};