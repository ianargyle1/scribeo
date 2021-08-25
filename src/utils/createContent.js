export const createConent = async (context) => {
    const resp = await fetch('https://us-central1-scribeo-ai.cloudfunctions.net/createContent', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(context)
    });
    const content = await resp.json();
    return content;
}