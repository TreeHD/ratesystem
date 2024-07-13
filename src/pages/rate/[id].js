import firebase_app from "../../config";
// import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { useRouter } from "next/router";

const db = getDatabase(firebase_app);


import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Rating } from '@mui/material';

const RatingPage = () => {
    const router = useRouter();
    const { id } = router.query;


    const [value, setValue] = useState(5);
    const [name, setName] = useState('ERROR');
    const [comments, setComments] = useState('');

    useEffect(() => {
        // console.log(crypto.randomUUID())
        if (!id) return;
        const starCountRef = ref(db, '/CUSTOMER_DATA/' + id);
        onValue(starCountRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val()
                if (data.rate != '') {
                    router.push("/rate/success")
                }

                setName(data.CUSTOMER_ID);

            } else {
                alert("系統錯誤")
            }
        });
    }, [router]);


    const handleSubmit = () => {
        // 在這裡處理提交邏輯
        set(ref(db, '/CUSTOMER_DATA/' + id), {
            rate: value,
            comments: comments
        });
        router.push("/rate/success")
    };

    return (
        <Box sx={{ minHeight: "100vh", maxWidth: 600, mx: 'auto', p: 2, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Typography variant="h4" component="h1" gutterBottom>
                評分頁面
            </Typography>
            <Typography component="legend">ID</Typography>
            <TextField
                id="outlined-helperText"
                // label="Helper text"
                value={name}
                disabled
            />
            <div>
                <Typography component="legend">請給予評分</Typography>
                <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                />
            </div>
            <TextField
                fullWidth
                label="想對我們說甚麼"
                variant="outlined"
                multiline
                rows={4}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
                送出
            </Button>
        </Box>
    );
};

export default RatingPage;