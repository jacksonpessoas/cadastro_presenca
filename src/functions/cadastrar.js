const fs = require('fs');
const path = require('path');

exports.handler = async function(event) {
    try {
        // Log para verificar o corpo da requisição recebido
        console.log("Recebido o corpo da requisição:", event.body);
        
        // Tentativa de fazer parse do body como JSON
        const data = JSON.parse(event.body);

        // Caminho onde o arquivo CSV será salvo
        const filePath = path.join(__dirname, 'cadastros.csv');
        const headers = 'Nome,Função,Contato,Endereço,Título,Zona,Seção,Líder\n';

        // Verificar se o arquivo CSV já existe, se não, cria com o cabeçalho
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, headers);
        }

        // Criar a linha com os dados
        const linha = `${data.nome},${data.funcao},${data.contato},${data.endereco},${data.titulo},${data.zona},${data.secao},${data.lider || ''}\n`;

        // Escrever no arquivo CSV
        fs.appendFileSync(filePath, linha);

        // Retornar resposta de sucesso
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Cadastro realizado com sucesso!' }),
        };
    } catch (error) {
        // Log de erro no processamento
        console.error('Erro ao processar a requisição:', error);

        // Retornar resposta de erro
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Erro ao processar o cadastro' }),
        };
    }
};
