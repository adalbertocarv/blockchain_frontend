
1. **Upload de um PDF**: 
   - O usuário faz o upload de um arquivo PDF no frontend.
   - O frontend envia o arquivo para o backend.
   - O backend calcula o hash do conteúdo do PDF e o armazena em um bloco da blockchain.
   - A blockchain gera um novo bloco para registrar esse hash e armazena o histórico dos documentos.

2. **Verificação de Integridade de um PDF**: 
   - O usuário faz o upload de um arquivo PDF (o mesmo ou uma versão nova) para verificar sua integridade.
   - O backend recalcula o hash do arquivo enviado e o compara com os hashes já armazenados na blockchain.
   - O sistema retorna uma mensagem informando se o arquivo é autêntico (seu hash já está registrado na blockchain) ou se foi alterado.