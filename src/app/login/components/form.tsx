'use client'

import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from '@/contexts/AuthContext';

export function FormLogin() {

    const router = useRouter();
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        const success = login(email, senha);
        if (success) router.push('/dashboard');
        else setError("Credenciais inválidas")
    }
    return (
        <Container maxWidth="sm">
            <Box sx={{
                p: 4,
                mt: 8,
                boxShadow: 4,
                borderRadius: 4,
                bgcolor: 'white',
            }}>
               <Typography variant="h4" align="center" gutterBottom>
                    Login
                </Typography> 

                <TextField 
                    fullWidth
                    label="email"
                    variant="outlined"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <TextField 
                    fullWidth
                    label="senha"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
                {error && (
                    <Typography color="error" variant="body2">{error}</Typography>
                )}

                <Button onClick={handleLogin}>Entrar</Button>
                <Button onClick={() => router.push('/register')}>Criar conta</Button>

            </Box>
        </Container>
    )
}
