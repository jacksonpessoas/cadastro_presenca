const fs = require('fs');
const path = require('path');

exports.handler = async function(event) {
    try {
        // Caminho do arquivo CSV de cadastros
        const filePath = path.join('/tmp', 'cadastros.csv'); // Verifique se o caminho está correto
        console.log("Caminho do arquivo CSV:", filePath); // Log do caminho do arquivo

        // Verificar se o arquivo existe
        if (!fs.existsSync(filePath)) {
            console.log("Arquivo não encontrado:", filePath);
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Arquivo de cadastro não encontrado' }),
            };
        }

        // Ler o conteúdo do arquivo CSV
        const data = fs.readFileSync(filePath, 'utf8');
        console.log("Conteúdo do arquivo CSV:", data); // Log do conteúdo do arquivo

        // Separar as linhas e pegar os nomes
        const lines = data.trim().split('\n').slice(1); // Ignorar o cabeçalho
        const nomes = lines.map(line => {
            const [nome] = line.split(','); // Pega o primeiro campo (nome)
            return nome;
        });

        console.log("Nomes carregados:", nomes); // Log dos nomes carregados

        // Retornar os nomes como JSON
        return {
            statusCode: 200,
            body: JSON.stringify({ nomes }),
        };
    } catch (error) {
        console.error('Erro ao carregar os nomes:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Erro ao carregar os nomes' }),
        };
    }
};
