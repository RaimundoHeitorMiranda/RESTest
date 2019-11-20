


# RestTest é uma aplicação para testes automatizado de projetos e exercícios REST.



## Instalação
Para utilizar o RestTest basta ter o [NodeJs](https://nodejs.org/en/) instalado e executar o seguinte comando 

    npm i rest-test-tst

## Utilização
O RestTest funciona utilizando dois arquivos, o [arquivo](https://github.com/RaimundoHeitorMiranda/RESTest/blob/master/requests.json) de requisições e o [arquivo](https://github.com/RaimundoHeitorMiranda/RESTest/blob/master/config.json) de configuração. Nas requisições é onde ficará os testes, nele o utilizador define quais requisições devem ser feitas e quais as respostas esperadas. O arquivo de configuração é onde configura-se o endereço do servidor a ser testado, porta, segurança e outras configurações.

Para utilizar basta executar a o seguinte comando, com os arquivos previamente configurados: 

    node ./builder/RestTest.js requests.json
   ou para quem for usuário do TST:

    tst
   OBS: o arquivo de configuração é lido automaticamente. Apenas o arquivo de testes deve ser colocado como parâmetro.

### Criando Tests
Um teste é formado por uma requisição e uma resposta
A requisição é formada pelos seguintes atributos:

 - Method - Que define o método da requisição, PUT,POST,DELETE,GET
 - path - qual o caminho da requisição(sem o endereço do servidor)
 - headers - cabeçalho (opcional)
 - content - conteúdo que deseja enviar na requisição, necessário de acordo com o tipo de requisição.

Exemplo: 

    "requestTest": {
	    "method": "DELETE",
	    "path": "/produtos/986",
	    "headers": null,
	    "content": null    
    }

O teste é formado por:
 - httpStatus - Que representa o status de resposta da requisição  em formato numérico , 200, 404, 500...
- Body - que representa o conteúdo da resposta
 
 Exemplo:

    "responseTest": {
        "httpStatus":"404",
        "body":{}
        }

Exemplo de um teste completo:

    {
	    "requestTest": {
	    "method": "DELETE",
	    "path": "/produtos/986",
	    "headers": null,
	    "body": null
	    },
    
	    "responseTest": {
		    "httpStatus":"404",
		    "body":{}
	    }
    },

## Lidando com Identificadores
Em toda requisição POST, de adição de um recurso, na resposta do teste(responseTest.body) deve obrigatoriamente tem um identificador(id), esse identificador falso ira mapear o identificador real retornado pelo servidor, a a partir daí , sempre que em um path ou no corpo de uma resposta tiver o id falso ele será trocado pelo id real.
Exemplo:

    {
	    "requestTest": {
	    "method": "POST",
	    "path": "/produtos",
	    "headers": null,
	    "body": {
		    "id": 10,
		    "nome": "Tapioca",
		    "valor": 2
		    }
	    },
    
	    "responseTest": {
		    "httpStatus":"201",
		    "body":{
			    "id": 10,
			    "nome": "Tapioca",
			    "valor": 2
		    }
	    }
    }

Nesse caso, o id 10 irá mapear o valor do id real retornado pelo servidor. A partir disso, toda requisição que tiver o valor 10, será trocada pelo valor real do servidor.

> GET /produtos/10(id falso) -> /produtos/234234(id real)
## Configuração
O objeto de configuração define os atributos necessários para configurar o testes, sendo eles:
- requestConfig.server: string - que define o endereço do servidor a ser testado, por exemplo, http://www.minhaapi.com .
- requestConfig.port: number - que define a porta do servidor.
- requestConfig.headers: any - que define o cabeçalho.
- securityConfig.pathLogin :string - define o caminho do login.
- securityConfig.login: object - é definido como um objeto que será enviado via POST para o path, neste objeto deverão conter as informações necessárias para a aquisição do token, como usuário e senha.
- definido.headerKey: string - Nome da chave do cabeçalho onde deve ficar o token de acesso.

Exemplo do arquivo de configuração:

    {
	
	    "requestConfig":{
		    "server":"http://localhost",
		    "port":"3000",
		    "headers": {
			    "headerExemple":"headerExemplevalue"
			    }
	    },
    
	    "securityConfig":{
		    "pathLogin":"/login",
		    "login": {
			    "user":"admin",
			    "password":"admin"},
		    "headerKey":"authorization"
	    }
    }

## Resultado
O programa retorna o resultado de da seguinte forma:

    F......FF
    Result {
    valid: false,
    attributeExtra: [],
    attributeMissing: [],
    valuesDiff:
     [ 
     'Attribute Value Diff: .3.DESCRICAO have diferent values:<Pão, 2 bifes de hambúrguer 90g, 2 fatias de queijo, 4 fatias de bacon, salada e batata.> is diferent of <Pão, 2 bifes de hambúrguer 900g, 2 fatias de queijo, 4 fatias de bacon, salada e batata.>(expected)',
     'Attribute Value Diff: .4.NOME have diferent values:<Coca cola 350ml> is diferent of <Coca cola 360ml>(expected)'
     ],
    request_verb_path: 'GET in /produtos',
    status_ok: true 
    },

Error no Status de resposta e ausência de atributos 
	
    F......FF
    Result {
	    valid: false,
	    attributeExtra: [],
	    attributeMissing: [ 'categoria_id', 'descricao', 'nome', 'preco' ],
	    valuesDiff: [],
	    request_verb_path: 'POST in /produtos',
	    status_ok: false,
	    status_diff: 'Expected 200 but was 201' 
    }, 
Sendo a primeira linha para a integração com o TST e as demais linhas para um resultado mais detalhado.

## Contribuição
Para contribuir basta editar os arquivos TypeScript e enviar um pullrequest.
## Build
Para fazer o build da aplicação basta executar o comando `TSC` no diretório Raiz do sistema.
