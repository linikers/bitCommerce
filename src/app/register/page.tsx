'use client';

import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

export default function RegisterPage() {

    const router = useRouter();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleRegister = async () => {
        router.push('/login');
    };

    return (
        <Container maxWidth="sm" >
            <Box sx={{
                mt: 8,
                p: 4,
                boxShadow: 4,
                borderRadius: 4,
                bgcolor: 'white',
            }}>
                <Typography variant="h4" align="center" gutterBottom>Criar conta</Typography>

                <TextField 
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <TextField 
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />

                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3 }}
                    onClick={handleRegister}
                >
                    Criar conta
                </Button>
                <Button
                    fullWidth
                    sx={{ mt: 1}}
                    onClick={() => router.push('/login')}
                >
                    Já tenho conta
                </Button>
            </Box>
        </Container>
    )
}