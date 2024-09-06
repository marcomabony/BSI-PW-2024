# Projeto: Sistema de Verificação de Fake News: Uma Aplicação Web com Gestão de Acessos por Tipo de Usuário

Este projeto é parte integrante da disciplina de Programação Web e tem como objetivo a construção de uma aplicação web utilizando as seguintes tecnologias:
•	HTML para estruturação das páginas;
•	CSS para estilização e design;
•	JavaScript para interatividade e funcionalidades dinâmicas;
•	Quarkus como framework para o back-end em Java;
•	Java para a lógica de negócios e funcionalidades do servidor.

# A aplicação é um verificador de fake news e conta com três tipos de usuários, cada um com permissões específicas:
1.	Administrador Geral: Possui o controle total sobre o sistema, podendo cadastrar e excluir usuários, além de excluir e alterar o status das notícias verificadas.
2.	Coordenador: Responsável pela manutenção do banco de dados, o Coordenador tem permissão para alterar o status das notícias. No entanto, caso seja necessário excluir uma notícia, ele deve solicitar essa ação ao Administrador Geral.
3.	Jornalista: Tem acesso ao verificador de fake news, que pode fornecer como resposta se uma notícia é verdadeira, falsa ou imprecisa. Além disso, o Jornalista pode acessar o histórico de todas as notícias que verificou nos últimos 30 dias.

# Essa estrutura de usuários garante que a aplicação seja gerida de forma organizada e segura, com funções bem definidas para cada tipo de usuário.
A aplicação possui 2 casos de uso principais:

# 1. Verificador de Fake News
•	Descrição: Este caso de uso permite ao usuário submeter uma notícia para verificação de autenticidade.
•	Fluxo Principal:
1.	O usuário acessa a plataforma e seleciona a funcionalidade de verificação de Fake News.
2.	O usuário insere o texto da notícia no campo designado, com um mínimo de 100 caracteres.
3.	Após colar a notícia, o usuário aciona o comando "Verificar" (pode ser um botão ou um evento de tecla "Enter").
4.	O sistema processa o texto utilizando algoritmos de classificação de aprendizado de máquina (por exemplo, CNN, SVM ou Naive Bayes) para analisar a veracidade da notícia.
5.	O sistema retorna uma classificação ao usuário, indicando se a notícia é "Verdadeira", "Falsa" ou "Imprecisa".
6.	A notícia e sua classificação são armazenadas no banco de dados para possível revisão futura.

# 2. Gestão de Estado e Solicitação de Exclusão
•	Descrição: Este caso de uso permite ao Coordenador, que possui acesso ao banco de dados central de notícias verificadas, realizar a gestão do status de uma notícia e, se necessário, solicitar sua exclusão.
•	Fluxo Principal:
1.	O Coordenador acessa a interface de administração e navega até o banco de dados de notícias verificadas.
2.	O Coordenador seleciona uma notícia específica cuja verificação já foi realizada.
3.	O Coordenador pode alterar o status da notícia, modificando sua classificação para "Verdadeira ", "Falsa" ou “Imprecisa”.
4.	Caso o Coordenador identifique que a notícia não deveria permanecer no banco de dados, ele preenche um formulário com uma justificativa detalhada para a exclusão.
5.	O Coordenador então submete uma solicitação de exclusão ao Administrador Geral, que será responsável por aprovar ou rejeitar a remoção da notícia do sistema.
O projeto possui os seguintes requisitos funcionais e não funcionais: 

# Requisitos Funcionais:
1.	Autenticação de Usuário: O sistema deve exigir login com e-mail e senha, permitindo o acesso à aplicação apenas para usuários autenticados.
2.	Gerenciamento de Usuários e Perfis: O sistema deve permitir o cadastro e manutenção de usuários, com perfis de acesso específicos, garantindo que cada função esteja disponível conforme as permissões do usuário.
3.	Navegação entre Interfaces: Um mecanismo de navegação deve estar presente em todas as interfaces, permitindo voltar à página anterior ou ao menu principal, utilizando links ou menus de navegação.
4.	Casos de Uso Específicos: Cada integrante deverá definir e desenvolver dois casos de uso do domínio da aplicação, que representem funções principais além de cadastros simples.
5.	Rastreabilidade e Auditoria: Todas as ações de usuários serão registradas com a data, hora e a ação realizada, permitindo auditoria completa das atividades no sistema.

# Requisitos Não Funcionais:
1.	Java EE: O sistema será implementado em Java EE (preferencialmente versão 11 ou superior).
2.	Arquitetura MVC: Deverá ser utilizado o padrão MVC para separar as camadas de apresentação, lógica de negócio e dados.
3.	JAX-RS para REST: Endpoints RESTful serão implementados usando JAX-RS.
4.	Padrão DAO/Entity: Cada entidade terá uma classe de modelo e um DAO para gerenciamento de dados.
5.	Padrão BO: As regras de negócio serão implementadas em Business Objects (BO).
6.	Comunicação por DTO: A comunicação entre back-end e front-end será feita exclusivamente por DTOs, garantindo segurança no tráfego de dados.

# Colaboradores 

* [Miguel Ângelo Pinheiro Fernandes  ](https://github.com/MiguelFernandes20)
* [Marco Filipe Mabony ](https://github.com/marcomabony)

