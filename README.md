**

# RestTest é uma aplicação para testes automatizado de projetos e exercícios REST.

**

## Instalação
Para utilizar o RestTest basta ter o [NodeJs](https://nodejs.org/en/) instalado.
## Utilização
O RestTest funciona utilizando dois arquivos, o [arquivo](https://github.com/RaimundoHeitorMiranda/RESTest/blob/master/requests.json) de requisições e o [arquivo](https://github.com/RaimundoHeitorMiranda/RESTest/blob/master/config.json) de configuração. Nas requisições é onde ficará os testes, nele o utilizador define quais requisições devem ser feitas e quais as respostas esperadas. O arquivo de configuração é onde configura-se o endereço do servidor a ser testado, porta, segurança e outras configurações.
### Criando Tests
Um teste é formado por uma requisição e uma resposta
A requisição é formada pelos seguintes atributos:

 - Method - Que define o método da requisição, PUT,POST,DELETE,GET
 - path - qual o caminho da requisição(sem o endereço do servidor)
 - headers - cabeçalho
 - body - conteúdo que deseja enviar na requisição.

Exemplo: 

> "requestTest": {
> 
> "method": "DELETE",
> 
> "path": "/produtos/986",
> 
> "headers": null,
> 
> "body": null
> 
> }

O teste é formado por:
 - httpStatus - Que representa o status de resposta da requisição  em formato numérico , 200,404,500...
- Body - que representa o conteúdo da resposta
 
 Exemplo:

> "responseTest": {
>     "httpStatus":"404",
>     "body":null
>     }

Exemplo de um teste completo:

> {
> 
> "requestTest": {
> 
> "method": "DELETE",
> 
> "path": "/produtos/986",
> 
> "headers": null,
> 
> "body": null
> 
> },
> 
> "responseTest": {
> 
> "httpStatus":"404",
> 
> "body":null
> 
> }
> 
> },

## Configuração
O objeto de configuração define os atributos necessários para configurar o testes, sendo eles:
- requestConfig.server: string - que define o endereço do servidor a ser testado, por exemplo, http://www.minhaapi.com .
- requestConfig.port: number - que define a porta do servidor.
- requestConfig.headers: any - que define o cabeçalho.
- securityConfig.pathLogin :string - define o caminho do login.
- securityConfig.login: object - é definido como um objeto que será enviado via POST para o path.
- definido.headerKey: string - Nome da chave do cabeçalho onde deve ficar o token de acesso.
 exemplo do arquivo de configuração:
- appConfig.detail: boolean - ativa/desativa detalhes do resultado do teste, 
"requestConfig":{

> "server":"http://localhost",
> 
> "port":"3000",
> 
> "headers": {}
> 
> },
> 
> "securityConfig":{
> 
> "Login":{},
> 
> "passwordLogin":"admin",
> 
> "headerKey":"authorization"
> 
> },
> 
> "appConfig":{
> 
> "detail":false
> 
> }
> 
> }

## Resultado
O programa pode imprimir o resultado de forma simples, mostrado abaixo

## Build

## Contribuição





