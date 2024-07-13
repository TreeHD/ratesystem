// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { resolve } from "styled-jsx/css";

export default async function handler(req, res) {
    const body = req.body;
    const query = req.query;
    const myHeaders = new Headers();
    myHeaders.append("reurl-api-key", process.env.REURL_TOKEN);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "url": body.url,
        "utm_source": "FB_AD"
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };
    const response = await fetch('https://api.reurl.cc/shorten', requestOptions);
    const data = await response.json();
    res.status(200).json(await data);
    resolve();


}
