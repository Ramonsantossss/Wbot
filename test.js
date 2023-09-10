const express = require('express');
const app = express();
const axios = require('axios');
const cheerio = require('cheerio');

// Importe suas funções aqui
const { assistir, fetchAnimesRecents, genero, veranime } = require('./api.js');

app.use(express.json());
app.set("json spaces",2)

// Rota para assistir um episódio
app.get('/assistir/:epId', async (req, res) => {
  const { epId } = req.params;
  try {
    // Chame a função assistir para obter informações do episódio
    const episodeInfo = await assistir(epId);
    res.json(episodeInfo);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar informações do episódio' });
  }
});

// Rota para buscar informações de animes recentes
app.get('/animes-recentes', async (req, res) => {
  try {
    // Chame a função fetchAnimesRecents para obter informações de animes recentes
    const episodes = await fetchAnimesRecents();
    res.json(episodes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar informações de animes recentes' });
  }
});

// Rota para buscar animes por gênero
app.get('/genero/:nameGenero', async (req, res) => {
  const { nameGenero } = req.params;
  try {
    // Chame a função genero para obter informações de animes por gênero
    const tvShows = await genero(nameGenero);
    res.json(tvShows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar informações dos animes por gênero' });
  }
});



// Rota da API que chama a função veranime
app.get('/veranime', async (req, res) => {
  const { name } = req.params;
  try {
    // Chame a função veranime para obter informações de um anime específico
    const animeInfo = await veranime(name);

    // Defina o cabeçalho Content-Type para JSON
    res.setHeader('Content-Type', 'application/json');

    // Envie os dados JSON como resposta
    res.status(200).send(animeInfo);
  } catch (error) {
    console.error('Erro na rota da API:', error);
    res.status(500).send({ error: 'Erro ao buscar informações do anime' });
  }
});




const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
















/*const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const FormData = require('form-data');

async function uploadPhotoToTelegraph(photoBuffer) {
  const form = new FormData();
  form.append('file', photoBuffer, { filename: 'media' });

  try {
    const response = await fetch('https://telegra.ph/upload', {
      method: 'POST',
      body: form,
    });

    const responseBody = await response.text(); // Obter o corpo da resposta como texto

    if (responseBody && response.ok) {
      const data = JSON.parse(responseBody);
      if (data && data[0] && data[0].src) {
        return 'https://telegra.ph' + data[0].src;
      } else {
        throw new Error('Failed to retrieve the image URL from the response.');
      }
    } else {
      throw new Error(`Failed to upload photo. Response status: ${response.status}, Response body: ${responseBody}`);
    }
  } catch (error) {
    throw new Error(`Error uploading photo: ${error.message}`);
  }
}

async function processPhotosInFolder(folderPath) {
  const files = fs.readdirSync(folderPath);
  const photoFiles = files.filter(file => file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png'));

  for (const photoFile of photoFiles) {
    const photoPath = path.join(folderPath, photoFile);
    const photoBuffer = fs.readFileSync(photoPath);
    
    try {
      const imageUrl = await uploadPhotoToTelegraph(photoBuffer);
      console.log(imageUrl);
    } catch (error) {
      
    }

    await new Promise(resolve => setTimeout(resolve, 500)); // Aguarda 2 segundos
  }
}

// Substitua 'caminho/da/pasta' pelo caminho real da pasta com as fotos
const photosFolderPath = './A3';
processPhotosInFolder(photosFolderPath);
*/