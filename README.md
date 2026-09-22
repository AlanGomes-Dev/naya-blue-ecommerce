# Naya Blue — E-commerce

E-commerce desenvolvido para a Naya Blue com foco em experiência do usuário, conversão de vendas e integração entre catálogo, carrinho, checkout, WhatsApp e ferramentas Google.

## 🚀 Demonstração

**Site:** https://nayablue.netlify.app/

## 🖥️ Interface do projeto

### Página inicial

![Página inicial](docs/images/01-home.png)

### Catálogo de produtos

![Catálogo de produtos](docs/images/02-produtos.png)

### Carrinho de compras

![Carrinho de compras](docs/images/03-carrinho.png)

## 🏗️ Arquitetura da solução

O Naya Blue foi desenvolvido como uma solução de e-commerce voltada para uma operação real de vendas, combinando uma interface de loja virtual com recursos para gerenciamento de produtos e processamento de pedidos.

![Arquitetura do Naya Blue](docs/architecture/arquitetura-naya-blue.png)

### 🔄 Fluxo do pedido

1. O cliente navega pelo catálogo e seleciona os produtos.
2. Os produtos são adicionados ao carrinho.
3. O cliente acessa o checkout.
4. Preenche seus dados pessoais.
5. Seleciona a forma de recebimento:

   * Retirada;
   * Frete.
6. Quando seleciona frete, informa o bairro para cálculo do valor de entrega.
7. O sistema calcula o valor dos produtos + entrega.
8. O pedido é preparado com os dados da compra.
9. As informações são direcionadas para o WhatsApp da Naya Blue.
10. A responsável pela venda recebe os dados e realiza o atendimento.
11. O pagamento é posteriormente gerado manualmente através do Mercado Pago e enviado ao cliente.

### 🛠️ Tecnologias utilizadas

* HTML5
* CSS3
* Bootstrap
* JavaScript
* Google Sheets
* Google Apps Script
* Netlify

### ✨ Principais funcionalidades

* Catálogo de produtos por categoria
* Carrinho de compras
* Badge animado de quantidade de itens
* Checkout com formulário
* Seleção entre retirada e frete
* Cálculo de frete por bairro
* Geração de pedido para WhatsApp
* Tela de confirmação do pedido
* Cadastro e organização de produtos através do Google Sheets
* Armazenamento e gerenciamento dos pedidos
* Carrossel para produtos com múltiplas imagens
* Lightbox para visualização ampliada das imagens
* Navegação responsiva para dispositivos móveis
* Call-to-action direcionando o cliente para o carrinho

### 📊 Gestão de produtos

Foi criada uma planilha específica para facilitar o cadastro e a organização dos produtos da Naya Blue.

A estrutura conta com:

* Cabeçalho formatado;
* Exemplos de preenchimento;
* Instruções de utilização;
* Validação de dados para categorias;
* Formatação de moeda;
* Painel de controle com contadores;
* Formatação condicional;
* Aba de instruções;
* Cabeçalho protegido;
* Notas explicativas;
* Linhas congeladas para facilitar a navegação.

A organização dos produtos permite que as informações utilizadas no catálogo sejam mantidas de forma estruturada, facilitando a atualização da loja.

### 📦 Gestão dos pedidos

Para solucionar a necessidade de registrar os pedidos, foram avaliadas diferentes alternativas, incluindo:

* Google Sheets API;
* Firebase;
* Netlify Functions;
* JSONBin.io;
* QR Code.

A solução escolhida utilizou **Google Sheets + Google Apps Script**, considerando o prazo de lançamento e a necessidade de manter os pedidos organizados e acessíveis.

Foi criada uma planilha denominada **Pedidos Naya Blue** e uma aplicação no Google Apps Script denominada **API Pedidos Naya Blue**, posteriormente disponibilizada como Web App e integrada ao projeto.

### 🧩 Desafios e soluções

Durante o desenvolvimento, o projeto passou por várias etapas de evolução.

Entre os principais desafios estavam a criação do fluxo de compra, o armazenamento dos pedidos, a definição da forma de entrega, o cálculo de frete e a apresentação de produtos com múltiplas imagens.

Uma das decisões técnicas envolveu avaliar diferentes alternativas para persistência dos pedidos antes da escolha do Google Sheets + Apps Script.

A solução também precisou ser adaptada ao modelo de negócio definido pela cliente, que inicialmente avaliou a possibilidade de vendas para outras cidades, mas posteriormente decidiu concentrar as vendas em Belém.

Com isso, o checkout foi adaptado para trabalhar com retirada e entrega por bairro, incluindo os respectivos valores de frete.

### 📈 Evolução do projeto

O desenvolvimento foi realizado de forma incremental, com diferentes versões da aplicação.

A evolução incluiu:

**Versão 1**

* Estrutura inicial da loja;
* Categorias de produtos;
* Carrinho de compras.

**Versão 2**

* Refinamento da identidade visual;
* Destaque da logo;
* Favicon;
* Definição da identidade de cores;
* Ajustes de conteúdo e seções.

**Versão 3**

* Badge de quantidade no carrinho;
* Animação de pulsação;
* Badge no menu mobile;
* CTA para acesso ao carrinho;
* Melhorias no fluxo de conversão.

**Versão 4**

* Checkout;
* Formulário de dados do cliente;
* Forma de recebimento;
* Retirada e frete;
* Cálculo de entrega por bairro;
* Geração do pedido para WhatsApp.

**Evolução posterior**

* Avaliação de alternativas para armazenamento dos pedidos;
* Implementação do Google Sheets + Apps Script;
* Criação da planilha de pedidos;
* Criação da planilha de cadastro de produtos;
* Inclusão da categoria Bolsas;
* Cadastro dos produtos;
* Carrossel de imagens;
* Lightbox;
* Ajustes finais de produtos, cores e informações.


## 📋 Sobre o projeto

O Naya Blue foi desenvolvido como uma solução de e-commerce para apresentação dos produtos e recebimento de pedidos.

Durante o desenvolvimento, a aplicação evoluiu de uma estrutura inicial de catálogo para uma solução com:

* catálogo de produtos;
* categorias e filtros;
* carrinho de compras;
* checkout;
* cálculo de frete;
* opção de retirada;
* envio dos dados do pedido pelo WhatsApp;
* integração com Google Sheets;
* gerenciamento de produtos através de planilha;
* acompanhamento dos pedidos;
* suporte a múltiplas imagens por produto;
* carrossel de imagens;
* visualização ampliada em Lightbox;
* interface responsiva.

## 🛠️ Tecnologias

* HTML5
* CSS3
* JavaScript
* Bootstrap
* Google Sheets
* Google Apps Script
* Netlify
* WhatsApp
* Mercado Pago

## 🛒 Principais funcionalidades

### Catálogo

Organização dos produtos por categorias, com informações de preço, imagens e identificação dos produtos.

### Carrinho de compras

O usuário pode adicionar produtos ao carrinho, visualizar os itens selecionados e acompanhar o valor da compra.

### Checkout

O fluxo de compra coleta as informações necessárias do cliente e permite selecionar a forma de recebimento:

* Retirada;
* Frete.

Quando o frete é selecionado, o valor correspondente é acrescentado ao pedido.

### WhatsApp

Após a confirmação do pedido, as informações da compra são estruturadas e encaminhadas para o WhatsApp da Naya Blue.

O fluxo foi desenvolvido para facilitar o atendimento e reduzir o trabalho manual de conferência das informações do pedido.

### Google Sheets

Foi criada uma estrutura utilizando Google Sheets e Google Apps Script para armazenar e organizar os pedidos.

Também foi desenvolvida uma planilha para cadastro e gerenciamento dos produtos.

### Gestão de produtos

A planilha de produtos possui recursos como:

* validação de dados;
* formatação de moeda;
* indicadores de preenchimento;
* formatação condicional;
* instruções de utilização;
* cabeçalho protegido;
* notas explicativas;
* congelamento do cabeçalho.

### Imagens dos produtos

Produtos com múltiplas imagens possuem:

* carrossel automático;
* transição de imagens;
* setas de navegação;
* indicadores de posição;
* Lightbox;
* navegação por teclado;
* fechamento com `Esc`.

## 🔄 Evolução do projeto

O projeto passou por várias etapas de desenvolvimento, desde a criação inicial do catálogo até a implementação do fluxo completo de pedidos.

### Versão inicial

* criação das seções de produtos;
* estrutura inicial do catálogo;
* implementação do carrinho.

### Evolução visual

* refinamento da identidade visual;
* destaque da logo;
* criação do favicon;
* definição da cor principal;
* ajustes de categorias;
* atualização das informações da marca.

### Experiência do carrinho

* badge de quantidade de produtos;
* animação de destaque;
* melhoria da navegação;
* chamada para visualização do carrinho.

### Checkout

* formulário de dados do cliente;
* forma de recebimento;
* retirada;
* cálculo de frete;
* envio das informações pelo WhatsApp.

### Integração com Google

Para solucionar a necessidade de armazenar os pedidos de forma organizada, foi desenvolvida uma integração utilizando:

**Google Sheets + Google Apps Script**

A solução permitiu centralizar os pedidos e manter um histórico organizado.

### Gestão do catálogo

Foi criada uma planilha específica para facilitar o cadastro dos produtos pela cliente.

### Catálogo final

* inclusão da categoria Bolsas;
* cadastro dos produtos;
* inclusão das fotografias;
* suporte a múltiplas imagens;
* carrossel;
* Lightbox;
* ajustes finais de produtos, cores e numeração.

## 🎯 Objetivos técnicos

O projeto buscou aplicar conceitos de:

* desenvolvimento web;
* manipulação do DOM;
* JavaScript;
* responsividade;
* experiência do usuário;
* fluxo de conversão;
* integração com APIs;
* automação;
* armazenamento de dados;
* organização de catálogo;
* resolução de problemas reais de negócio.

## 📌 Projeto real

Este projeto foi desenvolvido para uma cliente real e evoluiu de acordo com necessidades apresentadas durante o desenvolvimento.

As decisões técnicas foram tomadas considerando fatores como prazo de lançamento, facilidade de utilização, manutenção e custo operacional.

## 👨‍💻 Desenvolvedor

**Alan Souza Gomes**

Engenheiro de Software | Desenvolvimento Web | JavaScript | Cloud

[LinkedIn](https://www.linkedin.com/in/alan-gom/)
