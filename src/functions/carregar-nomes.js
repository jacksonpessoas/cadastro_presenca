const fs = require('fs');
const path = require('path');

exports.handler = async function(event) {
    try {
        // Caminho do arquivo CSV de cadastros
        const filePath = path.join('/tmp', 'cadastros.csv'); // ou o caminho onde o arquivo está salvo

        // Verificar se o arquivo existe
        if (!fs.existsSync(filePath)) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Arquivo de cadastro não encontrado' }),
            };
        }

        // Ler o conteúdo do arquivo CSV
        const data = fs.readFileSync(filePath, 'utf8');
        
        // Separar as linhas e pegar os nomes
        const lines = data.trim().split('\n').slice(1); // Ignorar o cabeçalho
        const nomes = lines.map(line => {
            const [nome] = line.split(','); // Pega o primeiro campo (nome)
            return nome;
        });

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
