import firebase_app from "@/config";
import Papa from 'papaparse';
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, set } from "firebase/database";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const db = getDatabase(firebase_app);

export default function Import() {

    const [datas, setDatas] = useState([]);

    const handleuploadClick = (e) => {
        e.preventDefault();
        document.getElementById('file').click();
    }

    const handleFile = (e) => {
        const file = e.target.files[0];
        Papa.parse(file, {
            header: true,
            complete: function (results) {
                setDatas(results.data);
                let data = results.data;
                //insert uuid
                data.map((item) => {
                    item.uuid = crypto.randomUUID();
                });
                // upload to firebase
                data.forEach((item) => {
                    if (item.CUSTOMER_ID != undefined) {
                        set(ref(db, '/CUSTOMER_DATA/' + item.uuid), {
                            CUSTOMER_ID: item.CUSTOMER_ID,
                            rate: "",
                            comments: ""
                        });
                    }
                });
                data.map((item) => {
                    item.rateLink = `${process.env.NEXT_PUBLIC_SITE_URL}+${item.uuid}`;

                });

                //export to csv
                const csv = Papa.unparse(data);
                const blob = new Blob(["\ufeff", csv], { encoding: "UTF-8", type: 'text/csv;charset=UTF-8' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.setAttribute('hidden', '');
                a.setAttribute('href', url);
                a.setAttribute('download', 'export.csv');
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
        });
    }

    return (
        <>
            <Box component="section" sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
                    <h3>上傳檔案{process.env.NEXT_PUBLIC_SITE_URL}</h3>
                    <Button variant="contained" size="large" onMouseDown={handleuploadClick} style={{ margin: 10 }}>
                        Large
                    </Button>
                    <input hidden id="file" type="file" accept=".csv" onChange={handleFile} />
                </Box>
            </Box>
        </>
    )
}