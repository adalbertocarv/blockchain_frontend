import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Grid, Typography, Snackbar, CircularProgress, Box } from '@mui/material';
import { Alert } from '@mui/material';
import './App.css'; // Importando o CSS atualizado

function App() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage('Por favor, selecione um arquivo.');
            setSnackbarOpen(true);
            return;
        }

        const formData = new FormData();
        formData.append('pdf', file);

        try {
            setLoading(true);
            const response = await axios.post('http://localhost:3000/api/pdf/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setMessage(response.data.message);
        } catch (error) {
            console.error('Erro ao enviar arquivo:', error);
            setMessage('Erro ao enviar arquivo.');
        } finally {
            setLoading(false);
            setSnackbarOpen(true);
        }
    };

    const handleVerify = async () => {
        if (!file) {
            setMessage('Por favor, selecione um arquivo.');
            setSnackbarOpen(true);
            return;
        }

        const formData = new FormData();
        formData.append('pdf', file);

        try {
            setLoading(true);
            const response = await axios.post('http://localhost:3000/api/pdf/verify', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setMessage(response.data.message);
        } catch (error) {
            console.error('Erro ao verificar arquivo:', error);
            setMessage('Erro ao verificar arquivo.');
        } finally {
            setLoading(false);
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box className="background">
            <Typography variant="h3" component="h1" align="center" gutterBottom className="main-title">
                Transforme PDF em Algo Útil
            </Typography>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        type="file"
                        onChange={handleFileChange}
                        helperText="Selecione o arquivo PDF"
                        InputLabelProps={{ shrink: true }}
                        className="file-input"
                    />
                </Grid>
                <Grid item xs={12} md={6} container spacing={2} justifyContent="center">
                    <Grid item>
                        <Button
                            variant="contained"
                            className="custom-button"
                            onClick={handleUpload}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Enviar PDF'}
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="outlined"
                            className="custom-button"
                            onClick={handleVerify}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Verificar PDF'}
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                    {message && (
                        <Snackbar
                            open={snackbarOpen}
                            autoHideDuration={6000}
                            onClose={handleSnackbarClose}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        >
                            <Alert onClose={handleSnackbarClose} severity="info" sx={{ width: '100%' }}>
                                {message}
                            </Alert>
                        </Snackbar>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
}

export default App;
