exports.responseSuccess = (message) => {
    return {
        "responseCode": "00",
        "responseDesc": "Success!",
        "responseMessage": message
    }
}

exports.responseBadRequest = (message) => {
    return {
        "responseCode": "01",
        "responseDesc": "Invalid!",
        "responseMessage": message
    }
}

exports.responseNotFound = (message) => {
    return {
        "responseCode": "04",
        "responseDesc": "Note Fund!",
        "responseMessage": message
    }
}
