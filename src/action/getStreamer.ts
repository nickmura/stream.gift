'use server'

interface StreamerExists {
    status: Boolean
}

export default async function GetStreamer(streamer: string): Promise<StreamerExists> {
    return new Promise(async (resolve, reject) => {
        fetch(process.env.BACKEND + "/get-streamer" + `?username=${streamer}`)
            .then(res => res.json())
            .then(res => {
                return resolve(res);
            })
            .catch(e => {
                return reject({ status: false });
            })
    })
}