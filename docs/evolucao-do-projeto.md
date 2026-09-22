# Evolução do Projeto Naya Blue

## 📌 Sobre o projeto

O Naya Blue é um projeto de e-commerce desenvolvido para uma loja de acessórios e moda.

O projeto começou como uma aplicação web para apresentação dos produtos e evoluiu gradualmente para uma solução de vendas com catálogo, carrinho, checkout, cálculo de frete, integração com WhatsApp e estrutura de apoio para gerenciamento de produtos e pedidos.

O desenvolvimento ocorreu de forma incremental, com novas funcionalidades sendo adicionadas conforme as necessidades da cliente e os problemas encontrados durante a implementação.

---

# 🚀 Versão 1 — Estrutura inicial da loja

A primeira etapa teve como objetivo criar a estrutura inicial da loja virtual.

### Implementações

* Estrutura inicial da página;
* Criação das categorias de produtos;
* Criação das páginas/seções:

  * Joias;
  * Rasteiras;
  * Óculos;
  * Maquiagem;
* Implementação inicial do carrinho de compras.

Essa versão estabeleceu a base da experiência de navegação e compra do projeto.

---

# 🎨 Versão 2 — Identidade visual e refinamento da interface

Na etapa seguinte, o foco passou a ser a identidade visual e a apresentação da marca.

### Implementações

* Maior destaque para a logo;
* Refinamento da navegação;
* Adição do favicon;
* Definição da cor principal:

```text
#7697b7
```

* Remoção da seção de Maquiagem;
* Remoção do Facebook, pois a cliente ainda não utilizava a plataforma;
* Atualização do e-mail da Naya Blue;
* Atualização do Instagram;
* Atualização do slogan para:

> "Elegância que Começa com Sutileza"

A interface passou a seguir uma identidade visual mais refinada e alinhada ao posicionamento da marca.

---

# 🛒 Versão 3 — Melhorias no carrinho e conversão

Nesta etapa foram realizadas melhorias no acompanhamento do carrinho e no direcionamento do cliente para a finalização da compra.

## Badge no menu mobile

Foi implementado um indicador de quantidade de produtos sobre o menu hambúrguer.

Características:

* Aparece somente quando existem itens no carrinho;
* Exibe a quantidade de produtos;
* Utiliza um círculo vermelho;
* Possui animação de pulsação.

## Animação do badge

Foi criada uma animação sutil:

* Escala de 1.0 para 1.15;
* Aumento da sombra durante a animação;
* Ciclo de aproximadamente 2 segundos;
* Objetivo de chamar atenção sem comprometer a identidade visual.

## Badge no carrinho desktop

O mesmo conceito foi aplicado ao ícone do carrinho na versão desktop.

Dessa forma, o usuário recebe um feedback visual tanto no mobile quanto no desktop.

## Call-to-action para o carrinho

Foi adicionado, próximo ao final da página, um botão de destaque:

> "Ver Meu Carrinho"

Esse botão passou a funcionar como mais um caminho para o cliente acessar o carrinho e finalizar a compra.

## WhatsApp

O número utilizado pela Naya Blue também foi atualizado no projeto.

A atualização foi aplicada em:

* Rodapé;
* Links de contato;
* Botão flutuante;
* Processo de checkout.

---

# 🎥 Vídeo de apresentação para a cliente

Após essa etapa foi produzido um vídeo explicando para a cliente o funcionamento da aplicação.

A apresentação contemplou:

1. Logo e Navbar;
2. Hero;
3. Categorias;
4. Produtos;
5. Badge animado;
6. Carrinho;
7. Call-to-action;
8. Rodapé;
9. WhatsApp.

O vídeo teve como objetivo demonstrar visualmente o que havia sido desenvolvido e explicar o funcionamento da loja.

---

# 💳 Versão 4 — Checkout e fluxo de pedido

A aplicação evoluiu para um processo mais completo de finalização da compra.

## Fluxo implementado

O cliente passou a seguir o seguinte fluxo:

```text
Produto
   ↓
Carrinho
   ↓
Finalizar Pedido
   ↓
Dados pessoais
   ↓
Forma de recebimento
   ↓
Confirmação
   ↓
WhatsApp
   ↓
Tela de sucesso
```

### Formulário de checkout

O cliente passou a poder:

1. Adicionar produtos ao carrinho;
2. Clicar em "Finalizar Pedido";
3. Preencher seus dados;
4. Selecionar a forma de recebimento;
5. Confirmar o pedido;
6. Abrir automaticamente o WhatsApp com os dados da compra;
7. Visualizar a tela de sucesso.

---

# 📍 Adaptação para vendas locais

Durante o desenvolvimento também foi discutida a possibilidade de realizar vendas para outras cidades.

Foi apresentada à cliente a possibilidade de utilizar:

* Correios;
* Transportadora.

Também foram explicados os processos e os custos envolvidos.

A cliente informou posteriormente que, naquele momento, as vendas seriam realizadas somente em Belém.

Com essa definição, o projeto foi adaptado para trabalhar com entrega local.

---

# 🚚 Sistema de retirada e frete

Foi criada a opção de **Forma de Recebimento**, contendo:

* Retirada;
* Frete.

## Retirada

O cliente pode optar por retirar o produto no endereço físico da Naya Blue.

## Frete

Quando o cliente escolhe a opção de frete, precisa selecionar o bairro onde reside.

Foi criada uma estrutura com valores de entrega para bairros de:

* Belém;
* Ananindeua.

O valor do frete é acrescentado ao valor total dos produtos.

### Cálculo do pedido

```text
Valor dos produtos
        +
Valor do frete
        =
Valor total do pedido
```

Após o cálculo, todas as informações são preparadas para envio ao WhatsApp da Naya Blue.

---

# 📱 Fluxo de pagamento

O projeto foi estruturado para que a Naya Blue receba no WhatsApp as informações relacionadas ao pedido.

As informações incluem:

* Dados do cliente;
* Produtos selecionados;
* Valores;
* Forma de recebimento;
* Frete;
* Valor total.

O pagamento via Mercado Pago não foi implementado como uma integração automática dentro do site.

O processo definido foi:

```text
Cliente
   ↓
Finaliza pedido
   ↓
Dados enviados para a Naya Blue
   ↓
Responsável recebe o pedido no WhatsApp
   ↓
Responsável acessa o Mercado Pago
   ↓
Gera manualmente o link de pagamento
   ↓
Envia o link ao cliente
```

Essa decisão manteve o processo de pagamento sob controle da responsável pelas vendas.

---

# 🗃️ Problema: armazenamento dos pedidos

Após a implementação do envio das informações para o WhatsApp, surgiu uma nova necessidade:

**Como armazenar e manter um histórico dos pedidos?**

Foram avaliadas diferentes alternativas.

### Opção 1 — Google Sheets API

Possibilidade de utilizar uma planilha como estrutura de armazenamento dos pedidos.

### Opção 2 — Firebase

Alternativa utilizando os serviços do Google para armazenamento de dados.

### Opção 3 — Netlify Functions

Possibilidade de criar uma camada de backend utilizando funções serverless.

### Opção 4 — JSONBin.io

Alternativa utilizando uma API externa para armazenamento de dados.

### Opção 5 — QR Code

Foi considerada uma solução temporária baseada na geração de QR Code.

---

# 🔎 Avaliação das alternativas

A solução de QR Code chegou a ser desenvolvida como uma possibilidade rápida para o lançamento.

Durante a avaliação, porém, foi identificado um problema de experiência para o cliente.

O processo exigiria que o comprador:

1. Gerasse/recebesse a imagem;
2. Salvasse a imagem;
3. Anexasse a imagem na conversa;
4. Enviasse o arquivo para a Naya Blue.

Esse fluxo adicionava etapas desnecessárias ao processo de compra.

Diante da necessidade de antecipar o lançamento da loja, foram comparadas as alternativas considerando principalmente:

* Tempo de desenvolvimento;
* Facilidade de utilização;
* Organização dos dados;
* Histórico dos pedidos;
* Facilidade de consulta;
* Custo.

---

# 📊 Solução escolhida — Google Sheets + Apps Script

A solução escolhida foi o uso do **Google Sheets API em conjunto com Google Apps Script**.

Entre os motivos considerados estavam:

* Pedidos salvos automaticamente;
* Organização dos dados em planilha;
* Possibilidade de exportação para Excel;
* Acesso aos registros de diferentes locais;
* Histórico dos pedidos;
* Baixo custo para a solução proposta.

---

# ⚙️ Implementação da API de pedidos

Foi criada uma planilha denominada:

> **Pedidos Naya Blue**

A primeira linha foi configurada com as colunas necessárias para receber os dados dos pedidos.

Em seguida foi criado um projeto no Google Apps Script denominado:

> **API Pedidos Naya Blue**

O script foi posteriormente implantado como **Web App**.

O processo envolveu:

1. Criação da planilha;
2. Configuração das colunas;
3. Criação do Google Apps Script;
4. Configuração das permissões;
5. Implantação como Web App;
6. Teste da API;
7. Integração com o site.

---

# 📋 Sistema de cadastro de produtos

Também foi criada uma planilha específica para facilitar o cadastro dos produtos da Naya Blue.

A estrutura recebeu diversas funcionalidades para reduzir erros durante o preenchimento.

### Recursos implementados

1. Cabeçalho formatado;
2. Quatro linhas de exemplo;
3. Linha de instruções;
4. Validação de dados na coluna Categoria;
5. Formatação de moeda na coluna Preço;
6. Painel de controle com contadores em tempo real;
7. Formatação condicional;
8. Aba de instruções;
9. Cabeçalho protegido;
10. Notas explicativas nas células;
11. Linhas congeladas.

---

# 📝 Organização dos produtos

Foram definidos códigos para organização dos produtos:

```text
Joias:       001 até 050
Rasteiras:   051 até 100
Óculos:      101 até 150
```

Posteriormente, conforme a expansão do catálogo, também foi adicionada a categoria de bolsas.

As imagens dos produtos foram organizadas utilizando códigos correspondentes aos produtos.

Exemplo:

```text
Produto 001 → 001.jpg
Produto 002 → 002.jpg
```

As fotos foram organizadas em pastas e utilizadas no catálogo do site.

---

# 👜 Inclusão da categoria Bolsas

Durante a etapa final de desenvolvimento, a cliente informou que lançaria uma nova linha de bolsas.

A aplicação foi então atualizada para incluir a nova categoria.

Foram realizados:

* Inclusão da seção de Bolsas;
* Cadastro dos produtos;
* Organização das imagens;
* Atualização do catálogo;
* Ajustes nas informações apresentadas aos clientes.

---

# 🖼️ Carrossel de imagens

Como alguns produtos possuíam mais de uma fotografia, foi desenvolvido um sistema para apresentação de múltiplas imagens.

### Funcionamento

Produtos com várias imagens passaram a possuir:

* Transição automática;
* Intervalo de aproximadamente 3,5 segundos;
* Setas de navegação;
* Exibição das setas ao passar o mouse;
* Dots de navegação.

Isso permitiu apresentar diferentes ângulos dos produtos sem aumentar excessivamente o tamanho dos cards.

---

# 🔍 Lightbox

Também foi implementado um Lightbox para visualização ampliada das imagens.

Ao clicar em uma imagem do produto, ela é aberta em uma visualização maior adaptada ao tamanho da tela.

### Recursos

* Navegação por setas;
* Dots de navegação;
* Tecla `←`;
* Tecla `→`;
* Tecla `Esc` para fechar.

---

# 🎯 Ajustes finais

Após a implementação das principais funcionalidades, foram realizados ajustes finais no catálogo.

Entre eles:

* Ajustes nas postagens;
* Seleção dos números das rasteirinhas;
* Identificação das cores das bolsas;
* Ajustes das informações dos produtos;
* Organização das imagens;
* Revisão da apresentação dos produtos.

---

# 🧪 Evolução técnica do projeto

A evolução do Naya Blue ocorreu de forma incremental.

A cada etapa, novas necessidades surgiram a partir do funcionamento da aplicação e das necessidades reais da cliente.

O projeto passou por uma evolução aproximada de:

```text
Loja visual
     ↓
Catálogo
     ↓
Carrinho
     ↓
Checkout
     ↓
Entrega local
     ↓
WhatsApp
     ↓
Persistência dos pedidos
     ↓
Gestão de produtos
     ↓
Catálogo com múltiplas imagens
     ↓
Experiência final de compra
```

---

# 📚 Principais aprendizados

Durante o desenvolvimento, foram trabalhados conceitos relacionados a:

* Desenvolvimento de interfaces web;
* Responsividade;
* JavaScript;
* Manipulação do DOM;
* Carrinho de compras;
* Formulários;
* Validação de dados;
* Cálculo de valores;
* Organização de produtos;
* Integração com serviços externos;
* Google Sheets;
* Google Apps Script;
* APIs;
* Web Apps;
* Integração com WhatsApp;
* Organização de imagens;
* Experiência do usuário;
* Fluxo de checkout;
* Git e GitHub;
* Documentação de projetos.

---

# 📌 Estado final do projeto

O Naya Blue chegou a uma versão funcional composta por:

* Catálogo de produtos;
* Categorias;
* Carrinho;
* Checkout;
* Retirada;
* Frete por bairro;
* Cálculo do valor total;
* Envio dos dados do pedido para WhatsApp;
* Estrutura de armazenamento dos pedidos;
* Planilha de cadastro de produtos;
* Carrossel de imagens;
* Lightbox;
* Interface responsiva;
* Organização dos produtos e imagens.

O projeto também foi versionado utilizando Git e disponibilizado no GitHub para documentação e apresentação do trabalho desenvolvido.
