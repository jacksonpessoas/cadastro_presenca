const fs = require('fs');
const path = require('path');

exports.handler = async function(event) {
    const data = JSON.parse(event.body);

    // Verificar se o arquivo CSV já existe, se não, cria com o cabeçalho
    const filePath = path.join(__dirname, 'cadastros.csv');
    const headers = 'Nome,Função,Contato,Endereço,Título,Zona,Seção,Líder\n';
    
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, headers);
    }

    // Criar a linha com os dados
    const linha = `${data.nome},${data.funcao},${data.contato},${data.endereco},${data.titulo},${data.zona},${data.secao},${data.lider || ''}\n`;

    // Escrever no arquivo CSV
    fs.appendFileSync(filePath, linha);

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Cadastro realizado com sucesso!' }),
    };
};
