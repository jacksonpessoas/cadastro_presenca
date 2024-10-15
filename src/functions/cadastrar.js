const fs = require('fs');
const path = require('path');

exports.handler = async function (event) {
    try {
        console.log("Recebido o corpo da requisição:", event.body);
        const data = JSON.parse(event.body);

        // Caminho onde o arquivo CSV será salvo no diretório temporário
        const filePath = path.join('/tmp', 'cadastros.csv');  // Usando o diretório temporário /tmp
        const headers = 'Nome,Função,Contato,Endereço,Título,Zona,Seção,Líder\n';

        // Verificar se o arquivo CSV já existe, se não, cria com o cabeçalho
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
    } catch (error) {
        console.error('Erro ao processar a requisição:', error);

        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Erro ao processar o cadastro' }),
        };
    }
};
