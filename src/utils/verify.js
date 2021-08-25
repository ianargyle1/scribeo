export const verify = (required, received) => {
    var missing = []
    for (var i = 0; i < required.length; i++) {
        if (required[i] in received) {
            if (typeof received[required[i]] == 'string') {
                if (received[required[i]].trim() == '') {
                    missing.push(required[i]);
                }
            }
        } else {
            missing.push(required[i]);
        }
    }
    return missing;
}