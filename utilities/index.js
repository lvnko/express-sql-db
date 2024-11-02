const standardErrorHandler = (res, err) => {
    res.status(err.status || 500);
    console.log('err => ', err);
    res.json({
        err: err.message,
        // ...message ? { message } : null
    });
    res.end();
    return;
}

const customErrorHandler = (res, message) => {
    res.status(404);
    res.json({
        err: {
            message: message
        },
    });
    res.end();
    return;

}

const customFaultHandler = (res, message) => {
    return res.send({
        statusText: "fail",
        message: message
    });
};

const verifyData = (data, actionLabel = 'take the requested action') => {
    const blankReport  = { valid: false };
    const bodyFieldKeys = Object.keys(data);
    if (bodyFieldKeys.length <= 0) return {
        ...blankReport,
        result: `Failed to ${actionLabel}, data is required!`
    }
    const invalidFields = bodyFieldKeys.filter(
        key => data[key] === false || typeof data[key] === 'number' ?
            false : !data[key]
    );
    const invalidityCount = invalidFields.length;
    if (invalidityCount) return {
        ...blankReport,
        result: `Failed to ${actionLabel}, valid data of ${invalidFields.join(", ")} ${invalidityCount > 1  ? 'are':'is'} required!`
    };
    return {
        valid: true,
        result: data
    }
}

export { standardErrorHandler, customErrorHandler, customFaultHandler, verifyData };