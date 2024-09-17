import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import './App.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 

function App() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [blockchain, setBlockchain] = useState([]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage('Por favor, selecione um arquivo.');
            return;
        }

        const formData = new FormData();
        formData.append('pdf', file);

        try {
            const response = await axios.post('http://localhost:3000/api/pdf/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setMessage(response.data.message);
            fetchBlockchain();  // Atualizar a blockchain após o upload
        } catch (error) {
            console.error('Erro ao enviar arquivo:', error);
            setMessage('Erro ao enviar arquivo.');
        }
    };

    const handleVerify = async () => {
        if (!file) {
            setMessage('Por favor, selecione um arquivo.');
            return;
        }

        const formData = new FormData();
        formData.append('pdf', file);

        try {
            const response = await axios.post('http://localhost:3000/api/pdf/verify', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setMessage(response.data.message);
        } catch (error) {
            console.error('Erro ao verificar arquivo:', error);
            setMessage('Erro ao verificar arquivo.');
        }
    };

    // Função para buscar a blockchain do backend
    const fetchBlockchain = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/pdf/blockchain');
            setBlockchain(response.data.blockchain);
        } catch (error) {
            console.error('Erro ao buscar blockchain:', error);
        }
    };

    // Buscar a blockchain quando o componente for montado
    useEffect(() => {
        fetchBlockchain();
    }, []);

    // Configurações do carrossel (Slider)
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        adaptiveHeight: false,  // Mantém o tamanho fixo do carrossel
        centerMode: true,
        centerPadding: '0',
    };

    return (
        <div className="background">
            <h1 className="main-title">Upload e Verificação de PDF</h1>
            <input className="file-input" type="file" onChange={handleFileChange} />
            <div className="button-container">
                <button className="custom-button" onClick={handleUpload}>Enviar PDF</button>
                <button className="custom-button" onClick={handleVerify}>Verificar PDF</button>
            </div>
            <p>{message}</p>

            <h2 className="main-title">Blockchain</h2>
            {blockchain.length === 0 ? (
                <p>Carregando blockchain...</p>
            ) : (
                <div className="blockchain-container">
                    <Slider {...settings}>
                        {blockchain.map((block) => (
                            <div className="block" key={block.index}>
                                <h3 className="block-title">Bloco #{block.index}</h3>
                                <p><strong>Timestamp:</strong> {new Date(block.timestamp).toLocaleString()}</p>
                                <p><strong>Proof:</strong> {block.proof}</p>
                                <p><strong>Hash Anterior:</strong> {block.previousHash}</p>
                                <p><strong>Dados:</strong></p>
                                <ul>
                                    {block.data.map((doc, i) => (
                                        <li key={i}>
                                            <strong>Nome do Documento:</strong> {doc.documentName}<br />
                                            <strong>Hash:</strong> {doc.documentHash}<br />
                                            <strong>Versão:</strong> {doc.version}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </Slider>
                </div>
            )}
        </div>
    );
}

export default App;
