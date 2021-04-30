# stories-insta-estadao
### LAB APP

##  Pré-requisitos para execução do projeto
    - NodeJS 

## Instalação e execução do projeto

`$ git clone https://github.com/carolldsk/stories-insta-estadao.git`

Após clonar o projeto, abra o terminal e digite: 

`$ npm i puppeteer`

Em seguida, instalar a biblioteca que gerenciamos os environments:

`$ npm i dotenv`

Diga para o git considerar que o .env não foi alterado com os seguintes comandos

`git update-index --assume-unchanged .env`
`git update-index --no-assume-unchanged .env`

Alterar o arquivo .env com o conteúdo do login usando as variáveis **INSTAGRAM_EMAIL** e **INSTAGRAM_PASSWORD**

Para executar o projeto, execute o index com o node:

`$ node index.js`
