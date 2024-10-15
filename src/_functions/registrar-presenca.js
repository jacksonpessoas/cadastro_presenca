const fs = require('fs');
const path = require('path');

exports.handler = async function(event) {
    const data = JSON.parse(event.body);

    // Verificar se o arquivo CSV já existe, se não, cria com o cabeçalho
    const filePath = path.join(__dirname, 'ata_presenca.csv');
    const headers = 'Nome,Data\n';

    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, headers);
    }

    // Obter a data atual
    const dataAtual = new Date().toLocaleDateString('pt-BR');

    // Criar a linha com os dados
    const linha = `${data.nome},${dataAtual}\n`;

    // Escrever no arquivo CSV
    fs.appendFileSync(filePath, linha);

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Presença registrada com sucesso!' }),
    };
};
