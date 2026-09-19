// ========================================
// GLOBAL FUNCTIONS - Define first
// ========================================

const SHEETS_API = 'https://script.google.com/macros/s/AKfycbxMZW_sBs2IbcFm-Dzcg5Ne-CAIuK2hpQ3tWSEbIG7rLJehLbd71k_LPCX1TS8S61me/exec';

window.openVerification = function () {
    document.getElementById('verificationPage').style.display = 'block';
    document.getElementById('verifyInput').focus();
}

window.closeVerification = function () {
    document.getElementById('verificationPage').style.display = 'none';
    document.getElementById('verifyInput').value = '';
    document.getElementById('verifyResult').innerHTML = '';
}

window.verifyOrder = async function () {
    const inputOrder = document.getElementById('verifyInput').value.trim().toUpperCase();
    const resultDiv  = document.getElementById('verifyResult');

    if (!inputOrder) {
        resultDiv.innerHTML = '<div style="background:#FEE2E2;border:2px solid #EF4444;padding:1rem;border-radius:10px;color:#991B1B;"><i class="fas fa-exclamation-triangle"></i> Por favor, insira o número do pedido</div>';
        return;
    }

    resultDiv.innerHTML = '<div style="text-align:center;padding:1rem;color:#7697b7;"><i class="fas fa-spinner fa-spin"></i> Buscando pedido...</div>';

    try {
        const res  = await fetch(`${SHEETS_API}?order=${inputOrder}`);
        const data = await res.json();

        if (data.status === 'success') {
            const o = data.order;
            resultDiv.innerHTML = `
                <div style="background:#D1FAE5;border:2px solid #10B981;padding:1.5rem;border-radius:10px;color:#065F46;">
                    <h4 style="margin:0 0 1rem 0;color:#047857;"><i class="fas fa-check-circle"></i> Pedido Autêntico ✅</h4>
                    <p style="margin:0.3rem 0;"><strong>Pedido:</strong> #${o.orderNumber}</p>
                    <p style="margin:0.3rem 0;"><strong>Data:</strong> ${o.timestamp}</p>
                    <p style="margin:0.3rem 0;"><strong>Cliente:</strong> ${o.nome}</p>
                    <p style="margin:0.3rem 0;"><strong>Telefone:</strong> ${o.telefone}</p>
                    <p style="margin:0.3rem 0;"><strong>Entrega:</strong> ${o.tipoEntrega}</p>
                    <p style="margin:0.3rem 0;"><strong>Endereço:</strong> ${o.endereco}</p>
                    <p style="margin:0.3rem 0;"><strong>Bairro:</strong> ${o.bairro}</p>
                    <p style="margin:0.3rem 0;"><strong>Produtos:</strong> ${o.produtos}</p>
                    <hr style="border-color:#10B981;">
                    <p style="margin:0.3rem 0;"><strong>Frete:</strong> R$ ${parseFloat(o.frete).toFixed(2)}</p>
                    <p style="margin:0.3rem 0;font-size:1.2rem;"><strong>Total:</strong> R$ ${parseFloat(o.total).toFixed(2)}</p>
                </div>`;
        } else {
            resultDiv.innerHTML = `<div style="background:#FEE2E2;border:2px solid #EF4444;padding:1rem;border-radius:10px;color:#991B1B;"><i class="fas fa-times-circle"></i> <strong>Pedido não encontrado!</strong><br><small>Verifique o número e tente novamente.</small></div>`;
        }
    } catch (err) {
        resultDiv.innerHTML = `<div style="background:#FEE2E2;border:2px solid #EF4444;padding:1rem;border-radius:10px;color:#991B1B;"><i class="fas fa-exclamation-triangle"></i> Erro ao buscar pedido. Verifique sua conexão.</div>`;
    }
}

// ========================================
// BANCO DE PRODUTOS
// ========================================

// imgs: array de fotos — primeira é a foto principal exibida no card
const joias = [
    { id:3,  code:'003', name:'Brinco Dourado',                    price:30.00,  imgs:['IMAG/Joias/003.jpg.jpg'],                            description:'Brinco Círculos Com Fios e Bolinha Banhado em Ouro 18k',                             destaque:false },
    { id:4,  code:'004', name:'Brinco Dourado',                    price:30.00,  imgs:['IMAG/Joias/004.jpg.jpg'],                            description:'Brinco Gota Fina Banhado em Ouro 18k',                                               destaque:false },
    { id:5,  code:'005', name:'Brinco Dourado',                    price:30.00,  imgs:['IMAG/Joias/005.jpg.jpg'],                            description:'Brinco Design de Folha Banhado em Ouro 18k',                                         destaque:false },
    { id:6,  code:'006', name:'Argola Dourada',                    price:30.00,  imgs:['IMAG/Joias/006.jpg.jpg'],                            description:'Argola Aberta com Corações Banhado em Ouro 18k',                                     destaque:false },
    { id:7,  code:'007', name:'Brinco Dourado',                    price:30.00,  imgs:['IMAG/Joias/007.jpg.jpg'],                            description:'Brinco Redondo com Bolinha Banhado em Ouro 18k',                                     destaque:false },
    { id:8,  code:'008', name:'Brinco Dourado',                    price:30.00,  imgs:['IMAG/Joias/008.jpg.jpg'],                            description:'Brinco Formato Aspas Fininho Banhado em Ouro 18k',                                   destaque:false },
    { id:9,  code:'009', name:'Brinco Dourado',                    price:40.00,  imgs:['IMAG/Joias/009.jpg.jpg'],                            description:'Brinco Orgânico Vazado e Torcido Banhado em Ouro 18k',                               destaque:false },
    { id:10, code:'010', name:'Brinco Dourado',                    price:40.00,  imgs:['IMAG/Joias/010.jpg.jpg'],                            description:'Brinco Círculo Meio Vazado Com Quinas Banhado em Ouro 18k',                          destaque:false },
    { id:11, code:'011', name:'Brinco Dourado',                    price:50.00,  imgs:['IMAG/Joias/011.jpg.jpg'],                            description:'Brinco Fio Largo Curvado e Martelado Banhado em Ouro 18k',                           destaque:false },
    { id:12, code:'012', name:'Brinco Dourado',                    price:30.00,  imgs:['IMAG/Joias/012.jpg.jpg'],                            description:'Brinco Chapa Design Derretido Banhado em Ouro 18k',                                  destaque:false },
    { id:13, code:'013', name:'Brinco Prata',                      price:35.00,  imgs:['IMAG/Joias/013.jpg.jpg'],                            description:'Brinco Espiral Fino Banhado em Prata',                                               destaque:false },
    { id:14, code:'014', name:'Brinco Búzios Pérola',              price:30.00,  imgs:['IMAG/Joias/014.jpg.jpg'],                            description:'Brinco Búzios Com Pérola Oval Banhado em Ouro 18k',                                  destaque:false },
    { id:15, code:'015', name:'Brinco Prata',                      price:25.00,  imgs:['IMAG/Joias/015.jpg.jpg'],                            description:'Brinco Círculo Corrente Prata Folheado',                                             destaque:false },
    { id:16, code:'016', name:'Brinco Ponto de Luz Verde',         price:15.00,  imgs:['IMAG/Joias/016.jpg.jpg'],                            description:'Brinco Ponto de Luz Verde Esmeralda Folheado',                                       destaque:false },
    { id:17, code:'017', name:'Brinco Ponto de Luz Azul',          price:15.00,  imgs:['IMAG/Joias/017.jpg.jpg'],                            description:'Brinco Ponto de Luz Azul Folheado',                                                  destaque:false },
    { id:18, code:'018', name:'Mini Argola Dourada',               price:15.00,  imgs:['IMAG/Joias/018.jpg.jpg'],                            description:'Mini Argola com Strass Folheado',                                                    destaque:false },
    { id:19, code:'019', name:'Brinco de Coração',                 price:22.00,  imgs:['IMAG/Joias/019.jpg.jpg'],                            description:'Brinco de Coração Dourado com Preto Folheado',                                       destaque:true  },
    { id:20, code:'020', name:'Brinco Folha Relevo',               price:25.00,  imgs:['IMAG/Joias/020.jpg.jpg'],                            description:'Brinco Design de Folha Relevo Folheado',                                             destaque:false },
    { id:21, code:'021', name:'Brinco Infinito',                   price:25.00,  imgs:['IMAG/Joias/021.jpg.jpg'],                            description:'Brinco Formato Infinito com Bolinha Folheado',                                       destaque:false },
    { id:22, code:'022', name:'Brinco Prata Flor',                 price:25.00,  imgs:['IMAG/Joias/022.jpg.jpg'],                            description:'Brinco Flor Prata Folheado',                                                         destaque:false },
    { id:23, code:'023', name:'Anel Dourado',                      price:20.00,  imgs:['IMAG/Joias/023.jpg.jpg'],                            description:'Anel Vazado Strass Folheado nº 18',                                                  destaque:false },
    { id:24, code:'024', name:'Anel Dourado',                      price:20.00,  imgs:['IMAG/Joias/024.jpg.jpg'],                            description:'Anel Corrente Strass Folheado nº 18',                                                destaque:false },
    { id:25, code:'025', name:'Anel Dourado',                      price:20.00,  imgs:['IMAG/Joias/025.jpg.jpg'],                            description:'Anel Três Pontos nº 19',                                                             destaque:false },
    { id:26, code:'026', name:'Anel Prata',                        price:20.00,  imgs:['IMAG/Joias/026.jpg.jpg'],                            description:'Anel Corrente Strass Folheado nº 19',                                                destaque:false },
    { id:27, code:'027', name:'Anel Prata',                        price:20.00,  imgs:['IMAG/Joias/027.jpg.jpg'],                            description:'Anel Formato de Cobra Folheado nº 16',                                               destaque:false },
    { id:28, code:'028', name:'Anel Infinito Prata',               price:20.00,  imgs:['IMAG/Joias/028.jpg.jpg'],                            description:'Anel Formato Infinito Folheado nº 16',                                               destaque:true  },
    { id:29, code:'029', name:'Anel Prata',                        price:20.00,  imgs:['IMAG/Joias/029.jpg.jpg'],                            description:'Anel Ponto de Luz Folheado nº 18',                                                   destaque:false },
    { id:30, code:'030', name:'Anel Prata',                        price:20.00,  imgs:['IMAG/Joias/030.jpg.jpg'],                            description:'Anel Corações Strass Folheado nº 18',                                                destaque:false },
    { id:31, code:'031', name:'Pulseira Prata',                    price:25.00,  imgs:['IMAG/Joias/031.jpg.jpg'],                            description:'Pulseira Trançada Folheada',                                                         destaque:false },
    { id:32, code:'032', name:'Pulseira com Pérola',               price:22.00,  imgs:['IMAG/Joias/032.jpg.jpg'],                            description:'Pulseira Coração de Pérola Folheada',                                                destaque:true  },
    { id:33, code:'033', name:'Pulseira Dourada',                  price:22.00,  imgs:['IMAG/Joias/033.jpg.jpg'],                            description:'Pulseira de Bolinha Folheada',                                                       destaque:false },
    { id:34, code:'034', name:'Pulseira Dourada',                  price:22.00,  imgs:['IMAG/Joias/034.jpg.jpg'],                            description:'Pulseira Coração Folheada',                                                          destaque:false },
    { id:35, code:'035', name:'Bracelete Dourado',                 price:45.00,  imgs:['IMAG/Joias/035.jpg.jpg'],                            description:'Bracelete Aro Ondulado Banhado em Ouro 18k',                                         destaque:true  },
    { id:36, code:'036', name:'Colar Duplo Prata',                 price:25.00,  imgs:['IMAG/Joias/036.jpg.jpg'],                            description:'Colar Duplo Prata Folheado',                                                         destaque:false },
    { id:37, code:'037', name:'Colar Concha',                      price:25.00,  imgs:['IMAG/Joias/037.jpg.jpg'],                            description:'Colar Duplo Concha Folheado',                                                        destaque:false },
    { id:38, code:'038', name:'Colar Gota',                        price:25.00,  imgs:['IMAG/Joias/038.jpg.jpg'],                            description:'Colar com Pingente Gota Strass Folheado',                                            destaque:false },
    { id:39, code:'039', name:'Colar Coração Strass',              price:25.00,  imgs:['IMAG/Joias/039.jpg.jpg'],                            description:'Colar com Pingente Coração Strass Folheado',                                         destaque:false },
    { id:40, code:'040', name:'Colar Coração',                     price:40.00,  imgs:['IMAG/Joias/040.jpg.jpg'],                            description:'Colar com Pingente Coração com Zircônia Banhado em Ouro 18k',                        destaque:true  },
    { id:41, code:'041', name:'Colar Borboleta',                   price:40.00,  imgs:['IMAG/Joias/041.jpg.jpg'],                            description:'Colar com Borboleta Banhado em Ouro 18k',                                            destaque:false },
    { id:42, code:'042', name:'Choker Dourada',                    price:45.00,  imgs:['IMAG/Joias/042.jpg.jpg'],                            description:'Choker com Trevo Banhado em Ouro 18k',                                               destaque:false },
    { id:43, code:'043', name:'Colar de Elos',                     price:45.00,  imgs:['IMAG/Joias/043.jpg.jpg'],                            description:'Colar de Elos Fininho 40cm Banhado em Ouro 18k',                                     destaque:true  },
    { id:44, code:'044', name:'Conjunto Colar e Brinco Flor',      price:80.00,  imgs:['IMAG/Joias/044.jpg.jpg'],                            description:'Conjunto de Colar e Brinco Flor com Pérolas em Gota Banhado em Ouro 18k',            destaque:false },
    { id:45, code:'045', name:'Conjunto Colar e Brinco',           price:100.00, imgs:['IMAG/Joias/045.jpg.jpg'],                            description:'Conjunto de Colar e Brinco Orgânico Geométrico em Resina Branca Banhado em Ouro 18k', destaque:false },
    { id:46, code:'046', name:'Conjunto Colar e Brinco',           price:50.00,  imgs:['IMAG/Joias/046.jpg.jpg'],                            description:'Conjunto de Colar e Brinco Nó Banhado em Prata',                                     destaque:false },
    { id:47, code:'047', name:'Conjunto Colar e Brinco',           price:45.00,  imgs:['IMAG/Joias/047.jpg.jpg'],                            description:'Conjunto de Colar e Brinco Círculo Vazado Banhado em Ouro 18k',                      destaque:false },
    { id:48, code:'048', name:'Conjunto Colar e Brinco',           price:45.00,  imgs:['IMAG/Joias/048.jpg.jpg'],                            description:'Conjunto de Colar e Brinco Gota Lisa Banhado em Prata',                              destaque:false },
    { id:49, code:'049', name:'Bracelete Trevo',                   price:50.00,  imgs:['IMAG/Joias/049.jpg.jpg'],                            description:'Bracelete Aro Com Fios e Trevo Branco Banhado em Ouro 18k',                          destaque:false },
    { id:50, code:'050', name:'Pulseira Dourada',                  price:35.00,  imgs:['IMAG/Joias/050.jpg.jpg'],                            description:'Pulseira de Bolinha Grande Banhado em Ouro 18k',                                     destaque:false },
    { id:51, code:'051', name:'Pulseira Bolinha',                  price:35.00,  imgs:['IMAG/Joias/051.jpg.jpg'],                            description:'Pulseira de Bolinha Pequena Banhado em Prata',                                       destaque:false },
    { id:52, code:'052', name:'Brinco Pequeno',                    price:26.00,  imgs:['IMAG/Joias/052.jpg.jpg'],                            description:'Brinco Pequeno Três Fios Banhado em Ouro 18k',                                       destaque:false },
    { id:53, code:'053', name:'Argolinha Cartilagem',              price:26.00,  imgs:['IMAG/Joias/053.jpg.jpg'],                            description:'Argolinha Para Cartilagem Banhado em Ouro 18k',                                      destaque:false },
    { id:54, code:'054', name:'Anel Prata',                        price:28.00,  imgs:['IMAG/Joias/054.jpg.jpg'],                            description:'Anel Grosso Com Fios de Cristais Banhado em Prata nº 19',                           destaque:false },
    { id:55, code:'055', name:'Pulseira Prata',                    price:35.00,  imgs:['IMAG/Joias/055.jpg.jpg'],                            description:'Pulseira Elo Baiano Pequeno Banhado em Prata',                                       destaque:false },
    { id:56, code:'056', name:'Brinco Dourado',                    price:40.00,  imgs:['IMAG/Joias/056.jpg.jpg'],                            description:'Brinco Orgânico Oval Vazado Banhado em Ouro 18k',                                    destaque:false },
    { id:57, code:'057', name:'Brinco Dourado',                    price:40.00,  imgs:['IMAG/Joias/057.jpg.jpg'],                            description:'Brinco Três Fios Unidos Banhado em Ouro 18k',                                        destaque:false },
    { id:58, code:'058', name:'Brinco Dourado',                    price:40.00,  imgs:['IMAG/Joias/058.jpg.jpg'],                            description:'Brinco Nó Grosso Com Esfera Banhado em Ouro 18k',                                    destaque:false },
    { id:59, code:'059', name:'Brinco Dourado',                    price:40.00,  imgs:['IMAG/Joias/059.jpg.jpg'],                            description:'Brinco Ondulado Banhado em Ouro 18k',                                                destaque:false },
    { id:60, code:'060', name:'Brinco Dourado',                    price:40.00,  imgs:['IMAG/Joias/060.jpg.jpg'],                            description:'Brinco Orgânico Oval Banhado em Ouro 18k',                                           destaque:false },
    { id:61, code:'061', name:'Brinco Dourado',                    price:40.00,  imgs:['IMAG/Joias/061.jpg.jpg'],                            description:'Brinco Redondo Ondulado em Alto Relevo Banhado em Ouro 18k',                         destaque:false },
    { id:62, code:'062', name:'Brinco Dourado',                    price:40.00,  imgs:['IMAG/Joias/062.jpg.jpg'],                            description:'Brinco Nó Fio Triplo Banhado em Ouro 18k',                                           destaque:false },
    { id:63, code:'063', name:'Brinco Dourado',                    price:40.00,  imgs:['IMAG/Joias/063.jpg.jpg'],                            description:'Brinco Oval Ondulado Banhado em Ouro 18k',                                           destaque:false },
    { id:64, code:'064', name:'Brinco Quadrado',                   price:40.00,  imgs:['IMAG/Joias/064.jpg.jpg'],                            description:'Brinco Quadrado Texturizado Banhado em Ouro 18k',                                    destaque:false },
    { id:65, code:'065', name:'Argola Prata',                      price:50.00,  imgs:['IMAG/Joias/065.jpg.jpg'],                            description:'Argola Tubo Grosso Banhado em Prata',                                                destaque:false },
    { id:66, code:'066', name:'Pulseira Laminada',                 price:35.00,  imgs:['IMAG/Joias/066.jpg.jpg'],                            description:'Pulseira Laminada Banhado em Ouro 18k e Prata',                                      destaque:false },
    { id:67, code:'067', name:'Pulseira Elo Baiano',               price:40.00,  imgs:['IMAG/Joias/067.jpg.jpg','IMAG/Joias/067.jpg-prata.jpg'], description:'Pulseira Elo Baiano Banhado em Ouro 18k e Prata',                                destaque:false },
    { id:68, code:'068', name:'Pulseira Escama',                   price:40.00,  imgs:['IMAG/Joias/068.jpg.jpg'],                            description:'Pulseira Escama Banhado em Ouro 18k e Prata',                                        destaque:false },
    { id:69, code:'069', name:'Pulseira Maleável',                 price:35.00,  imgs:['IMAG/Joias/069.jpg.jpg'],                            description:'Pulseira Maleável Banhado em Ouro 18k e Prata',                                      destaque:false },
    { id:70, code:'070', name:'Pulseira Bolinha',                  price:35.00,  imgs:['IMAG/Joias/070.jpg.jpg'],                            description:'Pulseira Veneziana Bolinha Banhado em Prata',                                        destaque:false },
    { id:71, code:'071', name:'Chocker Escama',                    price:50.00,  imgs:['IMAG/Joias/071.jpg.jpg','IMAG/Joias/071.jpg-prata.jpg'], description:'Chocker Escama Banhado em Ouro 18k e Prata',                                     destaque:false },
    { id:72, code:'072', name:'Chocker Laminado',                  price:50.00,  imgs:['IMAG/Joias/072.jpg.jpg'],                            description:'Chocker Laminado Banhado em Ouro 18k',                                               destaque:false },
    { id:73, code:'073', name:'Chocker Maleável',                  price:50.00,  imgs:['IMAG/Joias/073.jpg.jpg','IMAG/Joias/073.jpg-prata.jpg'], description:'Chocker Maleável Banhado em Ouro 18k e Prata',                                   destaque:false },
    { id:74, code:'074', name:'Chocker Elo Baiano',                price:50.00,  imgs:['IMAG/Joias/074.jpg.jpg'],                            description:'Chocker Elo Baiano Banhado em Prata',                                                destaque:false },
    { id:75, code:'075', name:'Chocker Bolinha',                   price:50.00,  imgs:['IMAG/Joias/075.jpg.jpg','IMAG/Joias/075.jpg-prata.jpg'], description:'Chocker Bolinha Banhado em Ouro 18k e Prata',                                    destaque:false },
    { id:76, code:'076', name:'Colar Nossa Senhora',               price:55.00,  imgs:['IMAG/Joias/076.jpg.jpg'],                            description:'Colar Nossa Senhora Gota Cristal Banhado em Ouro 18k',                               destaque:false },
    { id:77, code:'077', name:'Colar Gravatinha',                  price:50.00,  imgs:['IMAG/Joias/077.jpg.jpg'],                            description:'Colar Gravatinha Banhado em Ouro 18k',                                               destaque:false },
    { id:78, code:'078', name:'Argola Essencial',                  price:35.00,  imgs:['IMAG/Joias/078.jpg.jpg'],                            description:'Argola Essencial Banhado em Ouro 18k e Prata',                                       destaque:false },
    { id:79, code:'079', name:'Argola Lumi',                       price:35.00,  imgs:['IMAG/Joias/079.jpg.jpg'],                            description:'Argola Lumi Banhado em Ouro 18k e Prata',                                            destaque:false },
    { id:80, code:'080', name:'Brinco Meia Lua',                   price:38.00,  imgs:['IMAG/Joias/080.jpg.jpg'],                            description:'Brinco Martelado Meia Lua Banhado em Ouro 18k e Prata',                              destaque:false },
    { id:81, code:'081', name:'Brinco Redondo',                    price:38.00,  imgs:['IMAG/Joias/081.jpg.jpg'],                            description:'Brinco Martelado Redondo Banhado em Ouro 18k e Prata',                               destaque:false },
    { id:82, code:'082', name:'Brinco Margot',                     price:38.00,  imgs:['IMAG/Joias/082.jpg.jpg'],                            description:'Brinco Margot Banhado em Ouro 18k',                                                  destaque:false },
    { id:83, code:'083', name:'Brinco Charme',                     price:38.00,  imgs:['IMAG/Joias/083.jpg.jpg'],                            description:'Brinco Charme Banhado em Prata',                                                     destaque:false },
    { id:84, code:'084', name:'Brinco Elegance',                   price:38.00,  imgs:['IMAG/Joias/084.jpg.jpg'],                            description:'Brinco Triângulo Elegance Banhado em Prata',                                         destaque:false },
    { id:85, code:'085', name:'Argola Carlie',                     price:35.00,  imgs:['IMAG/Joias/085.jpg.jpg'],                            description:'Argola Carlie Banhado em Ouro 18k',                                                  destaque:false },
    { id:86, code:'086', name:'Conjunto Colar e Brinco Paz',       price:28.00,  imgs:['IMAG/Joias/086.jpg.jpg'],                            description:'Conjunto de Colar e Brinco Paz Folheado',                                            destaque:false },
    { id:87, code:'087', name:'Conjunto Colar e Brinco',           price:28.00,  imgs:['IMAG/Joias/087.jpg.jpg'],                            description:'Conjunto de Colar e Brinco Ponto de Luz Folheado - Azul, Preto e Branco',            destaque:false },
    { id:88, code:'088', name:'Argolinha Com Pingente Coração',    price:26.00,  imgs:['IMAG/Joias/088.jpg.jpg'],                            description:'Argolinha Com Pingente Coração Texturizado Banhada em Ouro 18k',                     destaque:false },
    { id:89, code:'089', name:'Brinco Pêndulo Zircônia',           price:26.00,  imgs:['IMAG/Joias/089.jpg.jpg'],                            description:'Brinco Pêndulo Zircônia Cristal Banhado em Ouro 18k',                                destaque:false },
];

// imgs: rosto primeiro, depois foto avulsa (quando existir)
const oculos = [
    { id:601, code:'601', name:'Óculos de Sol Londres',    price:140.00, imgs:['IMAG/Oculos/601.jpg-rosto.jpg','IMAG/Oculos/601.jpg.jpg'], description:'Óculos de Sol Redondo Londres - Degradê Verde Acetato',              destaque:true  },
    { id:602, code:'602', name:'Óculos de Sol Verona',     price:140.00, imgs:['IMAG/Oculos/602.jpg-rosto.jpg','IMAG/Oculos/602.jpg.jpg'], description:'Óculos de Sol Redondo Blogueira Verona - Preto',                     destaque:false },
    { id:603, code:'603', name:'Óculos de Sol Hexagonal',  price:140.00, imgs:['IMAG/Oculos/603.jpg.jpg','IMAG/Oculos/603.jpg-nome.jpg'],                           description:'Óculos de Sol Hexagonal - Marrom Degradê',                           destaque:true  },
    { id:604, code:'604', name:'Óculos de Sol Gatinho',    price:120.00, imgs:['IMAG/Oculos/604.jpg-rosto.jpg','IMAG/Oculos/604.jpg.jpg'], description:'Óculos de Sol Gatinho Retangular - Rosê Transparente Acetato',       destaque:true  },
    { id:605, code:'605', name:'Óculos de Sol Mini Paola', price:120.00, imgs:['IMAG/Oculos/605.jpg-rosto.jpg','IMAG/Oculos/605.jpg.jpg'], description:'Óculos de Sol Mini Paola - Preto Degradê',                           destaque:false },
    { id:606, code:'606', name:'Óculos de Sol Florença',   price:140.00, imgs:['IMAG/Oculos/606.jpg-rosto.jpg','IMAG/Oculos/606.jpg.jpg'], description:'Óculos de Sol Redondo Florença - Marrom Degradê/Rose Vermelho',      destaque:false },
    { id:607, code:'607', name:'Óculos de Sol Isa',        price:120.00, imgs:['IMAG/Oculos/607.jpg-rosto.jpg','IMAG/Oculos/607.jpg.jpg'], description:'Óculos de Sol Blogueira Isa - Rosa Dourado',                         destaque:true  },
    { id:608, code:'608', name:'Óculos de Sol Bawlgriff',  price:140.00, imgs:['IMAG/Oculos/608.jpg.jpg','IMAG/Oculos/608.jpg-nome.jpg'],                           description:'Óculos de Sol Hexagonal Bawlgriff - Marrom Degradê Rosê',            destaque:false },
    { id:609, code:'609', name:'Óculos de Sol Barcelona',  price:140.00, imgs:['IMAG/Oculos/609.jpg.jpg','IMAG/Oculos/609.jpg-nome.jpg'],                           description:'Óculos de Sol Redondo Barcelona - Marrom Transparente Acetato',      destaque:false },
    { id:610, code:'610', name:'Óculos de Sol Oval',       price:140.00, imgs:['IMAG/Oculos/610.jpg-rosto.jpg','IMAG/Oculos/610.jpg.jpg'], description:'Óculos de Sol Oval Fluense - Preto Dourado',                         destaque:false },
];

// imgs: foto com "-sim" primeiro (sandália avulsa), depois foto no pé
const rasteirinhas = [
    { id:301, code:'301', name:'Três Graças - Joelly',   price:65.00, imgs:['IMAG/Rasteirinhas/301.jpg-verde-sim.jpg','IMAG/Rasteirinhas/301.jpg.jpg'],  description:'Rasteirinha em couro sintético quadrada colorida',              destaque:true  },
    { id:302, code:'302', name:'Três Graças - Lígia',    price:62.00, imgs:['IMAG/Rasteirinhas/302.jpg-azul-sim.jpg','IMAG/Rasteirinhas/302.jpg.jpg'],   description:'Rasteirinha em couro sintético',                             destaque:false },
    { id:303, code:'303', name:'Três Graças - Gerluce',  price:65.00, imgs:['IMAG/Rasteirinhas/303.jpg-azul-sim.jpg','IMAG/Rasteirinhas/303.jpg.jpg'],   description:'Rasteirinha em couro sintético',                             destaque:false },
    { id:304, code:'304', name:'Três Graças - Viviane',  price:68.00, imgs:['IMAG/Rasteirinhas/304.jpg-sim.jpg','IMAG/Rasteirinhas/304.jpg-nude.jpg'],   description:'Rasteirinha em couro sintético trançada',                    destaque:false },
    { id:305, code:'305', name:'Três Graças - Juquinha', price:70.00, imgs:['IMAG/Rasteirinhas/305.jpg-preta-sim.jpg','IMAG/Rasteirinhas/305.jpg.JPG'],  description:'Rasteirinha em couro sintético quadrada com tiras',          destaque:true  },
    { id:306, code:'306', name:'Três Graças - Arminda',  price:75.00, imgs:['IMAG/Rasteirinhas/306.jpg-dourada-sim.jpg','IMAG/Rasteirinhas/306.jpg.jpg'], description:'Rasteirinha em couro sintético bico fino', destaque:false },
    { id:307, code:'307', name:'Três Graças - Zenilda',  price:85.00, imgs:['IMAG/Rasteirinhas/307.jpg-sim.jpg','IMAG/Rasteirinhas/307.jpg-marrom.jpg'], description:'Rasteirinha em couro sintético em metais',                   destaque:false },
    { id:308, code:'308', name:'Rasteirinha Dara',        price:85.00, imgs:['IMAG/Rasteirinhas/308.jpg-marrom-sim.jpg','IMAG/Rasteirinhas/308.jpg.JPG'], description:'Rasteirinha em couro sintético com anel de metal',           destaque:false },
    { id:309, code:'309', name:'Rasteirinha Maitê',       price:85.00, imgs:['IMAG/Rasteirinhas/309.jpg.jpg'],                                            description:'Rasteirinha em couro sintético lacinho',                     destaque:false },
    { id:310, code:'310', name:'Rasteirinha Iolanda',     price:65.00, imgs:['IMAG/Rasteirinhas/310.jpg-sim.jpg','IMAG/Rasteirinhas/310.jpg-nude.jpg'],   description:'Rasteirinha em couro sintético tira trançada',               destaque:false },
    { id:311, code:'311', name:'Rasteirinha Safira',      price:75.00, imgs:['IMAG/Rasteirinhas/311.jpg-sim.jpg','IMAG/Rasteirinhas/311.jpg-preta.jpg'],  description:'Rasteirinha em couro sintético bico fino e passadeira',      destaque:false },
    { id:312, code:'312', name:'Rasteirinha Caterina',    price:75.00, imgs:['IMAG/Rasteirinhas/312.jpg-sim.jpg','IMAG/Rasteirinhas/312.jpg-strass.jpg'], description:'Rasteirinha em couro sintético com strass',                  destaque:false },
    { id:313, code:'313', name:'Rasteirinha Fernanda',    price:75.00, imgs:['IMAG/Rasteirinhas/313.jpg-sim.jpg','IMAG/Rasteirinhas/313.jpg-rose.jpg'],   description:'Rasteirinha em couro sintético com tiras rose',              destaque:false },
    { id:314, code:'314', name:'Rasteirinha Nívia',       price:75.00, imgs:['IMAG/Rasteirinhas/314.jpg-sim.jpg','IMAG/Rasteirinhas/314.jpg-dourada.jpg'],description:'Rasteirinha em couro sintético dourada bico quadrado tiras', destaque:false },
    { id:315, code:'315', name:'Rasteirinha Thayná',      price:75.00, imgs:['IMAG/Rasteirinhas/315.jpg-sim.jpg','IMAG/Rasteirinhas/315.jpg-dourada.jpg'],description:'Rasteirinha em couro sintético dourada bico fino tiras',     destaque:false },
];

// ─── VARIANTES COR/TAMANHO ────────────────────────────────────────────────────
const rasteirasVariants = {
    301: { cores: [
        { nome:'Amarela', img:'IMAG/Rasteirinhas/301.jpg.jpg',          tamanhos:['35','36','37'] },
        { nome:'Verde',   img:'IMAG/Rasteirinhas/301.jpg-verde-sim.jpg', tamanhos:['35','36','37'] },
    ]},
    302: { cores: [
        { nome:'Azul', img:'IMAG/Rasteirinhas/302.jpg-azul-sim.jpg', tamanhos:['35','36','37'] },
    ]},
    303: { cores: [
        { nome:'Rosa', img:'IMAG/Rasteirinhas/303.jpg.jpg',          tamanhos:['35','36','37'] },
        { nome:'Azul', img:'IMAG/Rasteirinhas/303.jpg-azul-sim.jpg', tamanhos:['35','36','37'] },
    ]},
    304: { cores: [
        { nome:'Azul', img:'IMAG/Rasteirinhas/304.jpg-sim.jpg',  tamanhos:['35','36','37'] },
        { nome:'Nude', img:'IMAG/Rasteirinhas/304.jpg-nude.jpg', tamanhos:['35','36','37'] },
    ]},
    305: { cores: [
        { nome:'Preta', img:'IMAG/Rasteirinhas/305.jpg-preta-sim.jpg', tamanhos:['35','36','37'] },
    ]},
    306: { cores: [
        { nome:'Dourada', img:'IMAG/Rasteirinhas/306.jpg-dourada-sim.jpg', tamanhos:['35','36','37'] },
        { nome:'Chumbo',  img:'IMAG/Rasteirinhas/306.jpg.jpg',             tamanhos:['35','36','37'] },
        { nome:'Nude',    img:'IMAG/Rasteirinhas/306.jpg-nude.jpg',        tamanhos:['35','36','37'] },
    ]},
    307: { cores: [
        { nome:'Chumbo', img:'IMAG/Rasteirinhas/307.jpg-sim.jpg',    tamanhos:['35','36','37'] },
        { nome:'Marrom', img:'IMAG/Rasteirinhas/307.jpg-marrom.jpg', tamanhos:['35','36','37'] },
    ]},
    308: { cores: [
        { nome:'Marrom',    img:'IMAG/Rasteirinhas/308.jpg-marrom-sim.jpg', tamanhos:['35','36','37'] },
        { nome:'Off-White', img:'IMAG/Rasteirinhas/308.jpg.JPG',            tamanhos:['35','36','37'] },
    ]},
    309: { cores: [
        { nome:'Dourada', img:'IMAG/Rasteirinhas/309.jpg.jpg', tamanhos:['35','36','37'] },
    ]},
    310: { cores: [
        { nome:'Branca', img:'IMAG/Rasteirinhas/310.jpg-sim.jpg',  tamanhos:['35','36','37'] },
        { nome:'Nude',   img:'IMAG/Rasteirinhas/310.jpg-nude.jpg', tamanhos:['35','36','37'] },
    ]},
    311: { cores: [
        { nome:'Branca', img:'IMAG/Rasteirinhas/311.jpg-sim.jpg',   tamanhos:['35','36','37'] },
        { nome:'Preta',  img:'IMAG/Rasteirinhas/311.jpg-preta.jpg', tamanhos:['35','36','37'] },
    ]},
    312: { cores: [
        { nome:'Nude', img:'IMAG/Rasteirinhas/312.jpg-strass.jpg', tamanhos:['35','36','37'] },
    ]},
    313: { cores: [
        { nome:'Rose', img:'IMAG/Rasteirinhas/313.jpg-rose.jpg', tamanhos:['35','36','37'] },
    ]},
    314: { cores: [
        { nome:'Dourada', img:'IMAG/Rasteirinhas/314.jpg-dourada.jpg', tamanhos:['35','36','37'] },
    ]},
    315: { cores: [
        { nome:'Dourada', img:'IMAG/Rasteirinhas/315.jpg-dourada.jpg', tamanhos:['35','36','37'] },
    ]},
};

const bolsas = [
    { id:901, code:'901', name:'Bolsa Virgínia',   price:240.00, cor:'Marrom Café',    imgs:['IMAG/Bolsas/901.jpg.jpg'],             description:'Bolsa em couro ecológico com 1 alça. Medida: 25x18cm.',                                       destaque:true  },
    { id:902, code:'902', name:'Bolsa Morgana',    price:240.00, cor:'Marrom',         imgs:['IMAG/Bolsas/902.jpg.jpg'],             description:'Bolsa em couro ecológico com 2 alças. Medida: 27x15cm.',                                      destaque:false },
    { id:903, code:'903', name:'Bolsa Helena',     price:250.00, cor:'Caqui / Gelo',   imgs:['IMAG/Bolsas/903.jpg.jpg','IMAG/Bolsas/903.jpg-caqui.jpg','IMAG/Bolsas/903.jpg-gelo.jpg'], description:'Bolsa em couro ecológico com 1 corrente dourada. Medida: 29x13cm.', destaque:true },
    { id:904, code:'904', name:'Bolsa Iris',       price:240.00, cor:'Preta',          imgs:['IMAG/Bolsas/904.jpg.jpg'],             description:'Bolsa em couro ecológico com 1 alça. Medida: 22x13,5cm.',                                     destaque:false },
    { id:905, code:'905', name:'Bolsa Alícia',     price:230.00, cor:'Preta',          imgs:['IMAG/Bolsas/905.jpg.jpg'],             description:'Bolsa em couro ecológico com 3 alças. Medida: 22x13,5cm.',                                    destaque:false },
    { id:906, code:'906', name:'Bolsa Valentina',  price:260.00, cor:'Marrom Caramelo',imgs:['IMAG/Bolsas/906.jpg.jpg'],             description:'Bolsa em couro ecológico. Medida: 41x28cm.',                                                  destaque:false },
    { id:907, code:'907', name:'Bolsa Isadora',    price:260.00, cor:'Off-White',      imgs:['IMAG/Bolsas/907.jpg.jpg'],             description:'Bolsa em couro ecológico. Medida: 33x25cm.',                                                  destaque:false },
    { id:908, code:'908', name:'Bolsa Sofia',      price:260.00, cor:'Nude',           imgs:['IMAG/Bolsas/908.jpg.jpg'],             description:'Bolsa em couro ecológico. Medida: 34,5x29cm.',                                                destaque:true  },
    { id:909, code:'909', name:'Bolsa Olívia',     price:260.00, cor:'Nude',           imgs:['IMAG/Bolsas/909.jpg.jpg'],             description:'Bolsa em couro ecológico com mini bolsa. Medida: 33x24cm.',                                   destaque:false },
];

// ─── VARIANTES COR — BOLSAS ──────────────────────────────────────────────────
const bolsasVariants = {
    901: { cores: [{ nome:'Marrom Café',     img:'IMAG/Bolsas/901.jpg.jpg' }] },
    902: { cores: [{ nome:'Marrom',          img:'IMAG/Bolsas/902.jpg.jpg' }] },
    903: { cores: [{ nome:'Caqui', img:'IMAG/Bolsas/903.jpg-caqui.jpg' },
                   { nome:'Gelo',  img:'IMAG/Bolsas/903.jpg-gelo.jpg'  }] },
    904: { cores: [{ nome:'Preta',           img:'IMAG/Bolsas/904.jpg.jpg' }] },
    905: { cores: [{ nome:'Preta',           img:'IMAG/Bolsas/905.jpg.jpg' }] },
    906: { cores: [{ nome:'Marrom Caramelo', img:'IMAG/Bolsas/906.jpg.jpg' }] },
    907: { cores: [{ nome:'Off-White',       img:'IMAG/Bolsas/907.jpg.jpg' }] },
    908: { cores: [{ nome:'Nude',            img:'IMAG/Bolsas/908.jpg.jpg' }] },
    909: { cores: [{ nome:'Nude',            img:'IMAG/Bolsas/909.jpg.jpg' }] },
};

// ─── DESTAQUES ────────────────────────────────────────────────────────────────
const destaques = [
    ...joias.filter(p => p.destaque),
    ...oculos.filter(p => p.destaque),
    ...rasteirinhas.filter(p => p.destaque),
    ...bolsas.filter(p => p.destaque),
];

// ─── ESTADO ───────────────────────────────────────────────────────────────────
let cart           = [];
let currentSection = 'destaque';

// ========================================
// RENDERIZAÇÃO
// ========================================

function getProductList() {
    switch (currentSection) {
        case 'joias':        return joias;
        case 'oculos':       return oculos;
        case 'rasteirinhas': return rasteirinhas;
        case 'bolsas':       return bolsas;
        default:             return destaques;
    }
}

function getCategoryIcon(id) {
    if (id >= 900) return 'fa-shopping-bag';
    if (id >= 600) return 'fa-glasses';
    if (id >= 300) return 'fa-shoe-prints';
    return 'fa-gem';
}

function loadProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    const lista = getProductList();

    if (lista.length === 0) {
        productList.innerHTML = '<div class="col-12 text-center py-5"><p class="text-muted">Nenhum produto nesta categoria ainda.</p></div>';
        return;
    }

    lista.forEach(product => {
        const isRasteira   = rasteirinhas.some(r => r.id === product.id);
        const isBolsa      = bolsas.some(b => b.id === product.id);
        const variantBlock = isRasteira ? buildVariantHTML(product.id)
                           : isBolsa    ? buildVariantBolsaHTML(product.id)
                           : '';
        const imgs         = product.imgs || [product.img];
        const icon         = getCategoryIcon(product.id);

        // Carrossel: se tiver mais de 1 foto
        let imgBlock = '';
        if (imgs.length > 1) {
            const slides = imgs.map((src, i) => `
                <div class="carousel-item${i === 0 ? ' active' : ''}">
                    <img src="${src}" alt="${product.name}" class="d-block w-100 carousel-img"
                         onclick="openLightbox('${src}', '${product.name.replace(/'/g,"\\'")}', ${product.id})"
                         onerror="this.closest('.carousel-item').style.display='none'">
                </div>`).join('');
            imgBlock = `
                <div id="carousel-${product.id}" class="carousel slide product-carousel" data-bs-ride="carousel" data-bs-interval="3500">
                    <div class="carousel-inner">${slides}</div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carousel-${product.id}" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon"></span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carousel-${product.id}" data-bs-slide="next">
                        <span class="carousel-control-next-icon"></span>
                    </button>
                    <div class="carousel-indicators-dots">
                        ${imgs.map((_, i) => `<span class="dot${i===0?' active':''}" onclick="goToSlide(${product.id},${i})"></span>`).join('')}
                    </div>
                </div>`;
        } else {
            imgBlock = `
                <div class="product-image-real">
                    <img src="${imgs[0]}" alt="${product.name}"
                         class="carousel-img"
                         onclick="openLightbox('${imgs[0]}', '${product.name.replace(/'/g,"\\'")}', ${product.id})"
                         onerror="this.parentElement.innerHTML='<div class=&quot;product-image-placeholder&quot;><i class=&quot;fas ${icon}&quot;></i></div>'">
                </div>`;
        }

        productList.innerHTML += `
            <div class="col-lg-3 col-md-4 col-sm-6">
                <div class="product-card">
                    ${imgBlock}
                    <div class="product-info">
                        <div class="product-name">${product.name}</div>
                        <div class="product-description">${product.description}</div>
                        <div class="product-price">R$ ${product.price.toFixed(2)}</div>
                        ${variantBlock}
                        <div id="variant-error-${product.id}" class="variant-error" style="display:none;">
                            <i class="fas fa-exclamation-circle"></i> Selecione a cor e o tamanho antes de adicionar.
                        </div>
                        <button class="btn-add-cart" onclick="addToCart(${product.id})">
                            <i class="fas fa-cart-plus"></i> Adicionar
                        </button>
                    </div>
                </div>
            </div>`;
    });
}

// ─── CARROSSEL helpers ────────────────────────────────────────────────────────
function goToSlide(productId, index) {
    const carouselEl = document.getElementById(`carousel-${productId}`);
    if (!carouselEl) return;
    const carousel = bootstrap.Carousel.getOrCreateInstance(carouselEl);
    carousel.to(index);
    carouselEl.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === index));
}

// Sync dots on Bootstrap slide event
document.addEventListener('slide.bs.carousel', function(e) {
    const id = e.target.id.replace('carousel-', '');
    const to = e.to;
    const dots = e.target.querySelectorAll('.dot');
    dots.forEach((d, i) => d.classList.toggle('active', i === to));
});

// ─── LIGHTBOX ────────────────────────────────────────────────────────────────
function openLightbox(src, name, productId) {
    let lb = document.getElementById('lightbox-overlay');
    if (!lb) {
        lb = document.createElement('div');
        lb.id = 'lightbox-overlay';
        lb.innerHTML = `
            <div id="lightbox-backdrop" onclick="closeLightbox()"></div>
            <div id="lightbox-container">
                <button id="lightbox-close" onclick="closeLightbox()"><i class="fas fa-times"></i></button>
                <button id="lightbox-prev" onclick="lightboxNav(-1)"><i class="fas fa-chevron-left"></i></button>
                <img id="lightbox-img" src="" alt="">
                <button id="lightbox-next" onclick="lightboxNav(1)"><i class="fas fa-chevron-right"></i></button>
                <div id="lightbox-dots"></div>
            </div>`;
        document.body.appendChild(lb);
    }
    const product = findProduct(productId);
    const imgs    = (product && product.imgs) ? product.imgs : [src];
    lb._imgs      = imgs;
    lb._idx       = imgs.indexOf(src);
    if (lb._idx < 0) lb._idx = 0;
    _renderLightbox(lb);
    lb.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function _renderLightbox(lb) {
    document.getElementById('lightbox-img').src = lb._imgs[lb._idx];
    const prev = document.getElementById('lightbox-prev');
    const next = document.getElementById('lightbox-next');
    prev.style.display = lb._imgs.length > 1 ? 'flex' : 'none';
    next.style.display = lb._imgs.length > 1 ? 'flex' : 'none';
    const dotsEl = document.getElementById('lightbox-dots');
    dotsEl.innerHTML = lb._imgs.length > 1
        ? lb._imgs.map((_, i) => `<span class="lb-dot${i===lb._idx?' active':''}" onclick="lightboxNav(${i - lb._idx})"></span>`).join('')
        : '';
}

function lightboxNav(delta) {
    const lb = document.getElementById('lightbox-overlay');
    if (!lb) return;
    lb._idx = (lb._idx + delta + lb._imgs.length) % lb._imgs.length;
    _renderLightbox(lb);
}

function closeLightbox() {
    const lb = document.getElementById('lightbox-overlay');
    if (lb) { lb.style.display = 'none'; document.body.style.overflow = ''; }
}

document.addEventListener('keydown', e => {
    const lb = document.getElementById('lightbox-overlay');
    if (!lb || lb.style.display === 'none') return;
    if (e.key === 'ArrowRight') lightboxNav(1);
    if (e.key === 'ArrowLeft')  lightboxNav(-1);
    if (e.key === 'Escape')     closeLightbox();
});

// ─── VARIANTES ────────────────────────────────────────────────────────────────
function buildVariantHTML(productId) {
    const variant = rasteirasVariants[productId];
    if (!variant) return '';

    const coresHTML = variant.cores.map(cor => `
        <button class="btn-cor" data-cor="${cor.nome}" data-pid="${productId}"
            onclick="selectCor(this, ${productId}, '${cor.nome}')">${cor.nome}</button>
    `).join('');

    return `
        <div class="variant-section">
            <div class="variant-label"><i class="fas fa-palette"></i> Cor:</div>
            <div class="cores-group" id="cores-${productId}">${coresHTML}</div>
            <div class="variant-label tamanho-label" id="tamanho-label-${productId}" style="display:none;">
                <i class="fas fa-ruler"></i> Tamanho:
            </div>
            <div class="tamanhos-group" id="tamanhos-${productId}"></div>
        </div>`;
}

// ─── VARIANTES BOLSAS ─────────────────────────────────────────────────────────
function buildVariantBolsaHTML(productId) {
    const variant = bolsasVariants[productId];
    if (!variant) return '';

    const coresHTML = variant.cores.map(cor => `
        <button class="btn-cor" data-cor="${cor.nome}" data-pid="${productId}"
            onclick="selectCorBolsa(this, ${productId}, '${cor.nome}')">${cor.nome}</button>
    `).join('');

    return `
        <div class="variant-section">
            <div class="variant-label"><i class="fas fa-palette"></i> Cor:</div>
            <div class="cores-group" id="cores-${productId}">${coresHTML}</div>
        </div>`;
}

function selectCorBolsa(el, productId, corNome) {
    document.querySelectorAll(`#cores-${productId} .btn-cor`).forEach(b => b.classList.remove('active'));
    el.classList.add('active');
    const corData = bolsasVariants[productId].cores.find(c => c.nome === corNome);
    if (!corData) return;
    const card = el.closest('.product-card');
    const carousel = card.querySelector('.product-carousel');
    if (carousel) {
        const activeImg = carousel.querySelector('.carousel-item.active img');
        if (activeImg && corData.img) activeImg.src = corData.img;
    } else {
        const cardImg = card.querySelector('.product-image-real img');
        if (cardImg && corData.img) cardImg.src = corData.img;
    }
    document.getElementById(`variant-error-${productId}`).style.display = 'none';
}

function selectCor(el, productId, corNome) {
    document.querySelectorAll(`#cores-${productId} .btn-cor`).forEach(b => b.classList.remove('active'));
    el.classList.add('active');

    const tamanhoGroup = document.getElementById(`tamanhos-${productId}`);
    const tamanhoLabel = document.getElementById(`tamanho-label-${productId}`);
    tamanhoGroup.innerHTML = '';
    tamanhoGroup.dataset.selected = '';

    const corData = rasteirasVariants[productId].cores.find(c => c.nome === corNome);
    if (!corData) return;

    // Troca a imagem para a foto da cor selecionada
    const cardCarousel = el.closest('.product-card').querySelector('.product-carousel');
    if (cardCarousel) {
        // atualiza primeira imagem do carrossel
        const firstImg = cardCarousel.querySelector('.carousel-item.active img');
        if (firstImg && corData.img) firstImg.src = corData.img;
    } else {
        const cardImg = el.closest('.product-card').querySelector('.product-image-real img');
        if (cardImg && corData.img) cardImg.src = corData.img;
    }

    corData.tamanhos.forEach(tam => {
        const btn = document.createElement('button');
        btn.className   = 'btn-tamanho';
        btn.textContent = tam;
        btn.onclick = function () {
            document.querySelectorAll(`#tamanhos-${productId} .btn-tamanho`).forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            tamanhoGroup.dataset.selected = tam;
        };
        tamanhoGroup.appendChild(btn);
    });

    tamanhoLabel.style.display = 'block';
    document.getElementById(`variant-error-${productId}`).style.display = 'none';
}

// ─── FILTRO DE SEÇÃO ──────────────────────────────────────────────────────────
function filterCategory(category) {
    currentSection = category;

    const titles = {
        destaque:     { h2:'Produtos em Destaque', p:'As melhores ofertas para você' },
        joias:        { h2:'Joias',                p:'Brilho e sofisticação' },
        oculos:       { h2:'Óculos de Sol',        p:'Proteção com elegância' },
        rasteirinhas: { h2:'Rasteirinhas',          p:'Conforto e estilo' },
        bolsas:       { h2:'Bolsas',               p:'Estilo e praticidade' },
    };
    const t = titles[category] || titles.destaque;
    document.getElementById('sectionTitle').textContent    = t.h2;
    document.getElementById('sectionSubtitle').textContent = t.p;

    document.querySelectorAll('.category-card').forEach(c => c.classList.remove('active'));
    const activeCard = document.querySelector(`.category-card[data-cat="${category}"]`);
    if (activeCard) activeCard.classList.add('active');

    loadProducts();
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

// ========================================
// CARRINHO
// ========================================

function findProduct(id) {
    return [...joias, ...oculos, ...rasteirinhas, ...bolsas].find(p => p.id === id);
}

function addToCart(productId) {
    const product    = findProduct(productId);
    if (!product) return;

    const isRasteira = rasteirinhas.some(r => r.id === productId);
    const isBolsa    = bolsas.some(b => b.id === productId);

    if (isRasteira) {
        const coresAtivas  = document.querySelectorAll(`#cores-${productId} .btn-cor.active`);
        const tamanhoGroup = document.getElementById(`tamanhos-${productId}`);
        const errorEl      = document.getElementById(`variant-error-${productId}`);

        const corSel = coresAtivas.length > 0 ? coresAtivas[0].dataset.cor : '';
        const tamSel = tamanhoGroup ? tamanhoGroup.dataset.selected : '';

        if (!corSel || !tamSel) {
            errorEl.style.display = 'flex';
            setTimeout(() => { errorEl.style.display = 'none'; }, 4000);
            return;
        }

        const cartKey = `${productId}-${corSel}-${tamSel}`;
        const existing = cart.find(i => i.cartKey === cartKey);
        if (existing) { existing.quantity++; }
        else { cart.push({ ...product, cartKey, cor: corSel, tamanho: tamSel, quantity: 1 }); }

    } else if (isBolsa) {
        const coresAtivas = document.querySelectorAll(`#cores-${productId} .btn-cor.active`);
        const errorEl     = document.getElementById(`variant-error-${productId}`);
        const corSel      = coresAtivas.length > 0 ? coresAtivas[0].dataset.cor : '';

        if (!corSel) {
            errorEl.innerHTML = '<i class="fas fa-exclamation-circle"></i> Selecione a cor antes de adicionar.';
            errorEl.style.display = 'flex';
            setTimeout(() => { errorEl.style.display = 'none'; }, 4000);
            return;
        }

        const cartKey = `${productId}-${corSel}`;
        const existing = cart.find(i => i.cartKey === cartKey);
        if (existing) { existing.quantity++; }
        else { cart.push({ ...product, cartKey, cor: corSel, quantity: 1 }); }

    } else {
        const cartKey = String(productId);
        const existing = cart.find(i => i.cartKey === cartKey);
        if (existing) { existing.quantity++; }
        else { cart.push({ ...product, cartKey, quantity: 1 }); }
    }

    updateCart();
    showNotification('Produto adicionado ao carrinho!');
}

function removeFromCart(cartKey) {
    cart = cart.filter(i => i.cartKey !== cartKey);
    updateCart();
}

function updateCart() {
    const cartItems       = document.getElementById('cartItems');
    const cartCount       = document.getElementById('cartCount');
    const cartCountMobile = document.getElementById('cartCountMobile');
    const cartTotal       = document.getElementById('cartTotal');
    const cartCtaCount    = document.getElementById('cartCtaCount');
    const cartCtaText     = document.getElementById('cartCtaText');

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-center text-muted">Seu carrinho está vazio</p>';
        cartCount.textContent = cartCountMobile.textContent = '0';
        cartCount.classList.remove('show');
        cartCountMobile.classList.remove('show');
        cartTotal.textContent = 'R$ 0,00';
        cartCtaCount.style.display = 'none';
        cartCtaText.textContent = 'Explore nossos produtos e adicione ao carrinho!';
        return;
    }

    let total = 0, itemCount = 0;
    cartItems.innerHTML = '';

    cart.forEach(item => {
        total     += item.price * item.quantity;
        itemCount += item.quantity;

        const variantLine = item.cor && item.tamanho
            ? `<div class="cart-item-variant"><i class="fas fa-circle" style="color:#7697b7;font-size:0.6rem;"></i> ${item.cor} · Tam ${item.tamanho}</div>`
            : item.cor
            ? `<div class="cart-item-variant"><i class="fas fa-circle" style="color:#7697b7;font-size:0.6rem;"></i> ${item.cor}</div>`
            : '';

        const itemImg = item.imgs ? item.imgs[0] : (item.img || '');
        cartItems.innerHTML += `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${itemImg}" alt="${item.name}"
                         style="width:80px;height:80px;object-fit:cover;border-radius:10px;"
                         onerror="this.style.display='none';this.parentElement.innerHTML='<i class=&quot;fas ${getCategoryIcon(item.id)}&quot; style=&quot;font-size:2rem;color:var(--azul-medio);&quot;></i>'">
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    ${variantLine}
                    <div class="cart-item-price">R$ ${item.price.toFixed(2)} x ${item.quantity}</div>
                    <button class="cart-item-remove" onclick="removeFromCart('${item.cartKey}')">
                        <i class="fas fa-trash"></i> Remover
                    </button>
                </div>
            </div>`;
    });

    cartCount.textContent = cartCountMobile.textContent = itemCount;
    cartCount.classList.add('show');
    cartCountMobile.classList.add('show');
    cartTotal.textContent = `R$ ${total.toFixed(2)}`;
    cartCtaCount.style.display = 'inline-block';
    cartCtaCount.textContent   = itemCount;
    cartCtaText.textContent = itemCount === 1
        ? 'Você tem 1 item esperando no carrinho!'
        : `Você tem ${itemCount} itens esperando no carrinho!`;
}

function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('active');
}

document.getElementById('cartBtn').addEventListener('click', function (e) {
    e.preventDefault();
    toggleCart();
});

function checkout() {
    if (cart.length === 0) { showNotification('Seu carrinho está vazio!'); return; }
    renderSummary();
    new bootstrap.Modal(document.getElementById('checkoutModal')).show();
}

// ========================================
// CHECKOUT — STEPS
// ========================================

function goToStep(step) {
    if (step === 2 && selectedDelivery === 'entrega' && !document.getElementById('bairroSelect').value) {
        showNotification('Por favor, selecione seu bairro!'); return;
    }
    if (step === 3) {
        const name  = document.getElementById('custName').value.trim();
        const phone = document.getElementById('custPhone').value.trim();
        if (!name || !phone) { showNotification('Preencha todos os campos obrigatórios!'); return; }
        if (selectedDelivery === 'entrega' && !document.getElementById('custAddress').value.trim()) {
            showNotification('Preencha o endereço de entrega!'); return;
        }
        sendOrderWhatsApp();
    }

    document.querySelectorAll('.checkout-step').forEach(s => s.classList.remove('active'));
    document.getElementById('step' + step).classList.add('active');
    for (let i = 1; i <= 3; i++) document.getElementById('stepLabel' + i).classList.remove('active','completed');
    for (let i = 1; i < step; i++)  document.getElementById('stepLabel' + i).classList.add('completed');
    document.getElementById('stepLabel' + step).classList.add('active');
    document.getElementById('stepLine1').classList.toggle('active', step >= 2);
    document.getElementById('stepLine2').classList.toggle('active', step >= 3);
}

let selectedDelivery = 'retirada';
let freteValue       = 0;
let selectedBairro   = '';

function selectDelivery(el, method) {
    document.querySelectorAll('.payment-option').forEach(o => o.classList.remove('selected'));
    el.classList.add('selected');
    el.querySelector('input[type="radio"]').checked = true;
    selectedDelivery = method;

    const storeInfo       = document.getElementById('storeAddressInfo');
    const deliveryOptions = document.getElementById('deliveryOptions');
    const addressFields   = document.getElementById('addressFields');

    if (method === 'retirada') {
        storeInfo.style.display = 'block';
        deliveryOptions.style.display = 'none';
        if (addressFields) addressFields.style.display = 'none';
        freteValue = 0; selectedBairro = '';
        document.getElementById('bairroSelect').value = '';
    } else {
        storeInfo.style.display = 'none';
        deliveryOptions.style.display = 'block';
        if (addressFields) addressFields.style.display = 'block';
    }
    updateFretePreview();
    renderSummary();
}

function updateFretePreview() {
    const select  = document.getElementById('bairroSelect');
    const preview = document.getElementById('fretePreview');
    const valueEl = document.getElementById('freteValue');

    if (select.value && selectedDelivery === 'entrega') {
        freteValue     = parseFloat(select.value);
        selectedBairro = select.options[select.selectedIndex].text;
        valueEl.textContent   = `R$ ${freteValue.toFixed(2)}`;
        preview.style.display = 'block';
        renderSummary();
    } else {
        preview.style.display = 'none';
        freteValue = 0; selectedBairro = '';
    }
}

function renderSummary() {
    let html = '<h6><i class="fas fa-shopping-bag"></i> Resumo do Pedido</h6>';
    let total = 0;

    cart.forEach(item => {
        const sub = item.price * item.quantity;
        total += sub;
        const variantInfo = item.cor && item.tamanho
            ? ` <span style="color:#7697b7;font-size:0.8rem;">(${item.cor} · Tam ${item.tamanho})</span>`
            : item.cor
            ? ` <span style="color:#7697b7;font-size:0.8rem;">(${item.cor})</span>`
            : '';
        html += `<div class="summary-item"><span>${item.name} x${item.quantity}${variantInfo}</span><span>R$ ${sub.toFixed(2)}</span></div>`;
    });

    if (selectedDelivery === 'entrega' && freteValue > 0) {
        html  += `<div class="summary-item"><span>Frete (${selectedBairro})</span><span>R$ ${freteValue.toFixed(2)}</span></div>`;
        total += freteValue;
    } else if (selectedDelivery === 'retirada') {
        html += `<div class="summary-item" style="color:#10B981;"><span>Retirada na Loja</span><span>Grátis</span></div>`;
    }
    html += `<div class="summary-total"><span>Total</span><span>R$ ${total.toFixed(2)}</span></div>`;

    const s1 = document.getElementById('summaryStep1');
    const s2 = document.getElementById('summaryStep2');
    if (s1) s1.innerHTML = html;
    if (s2) s2.innerHTML = html;
}

// ========================================
// ENVIO — WHATSAPP + GOOGLE SHEETS
// ========================================

function sendOrderWhatsApp() {
    const orderNumber = 'NAY' + Date.now().toString().slice(-6);
    const name      = document.getElementById('custName').value.trim();
    const phone     = document.getElementById('custPhone').value.trim();
    const address   = selectedDelivery === 'entrega' ? document.getElementById('custAddress').value.trim() : 'Retirada na Loja';
    const reference = selectedDelivery === 'entrega' ? document.getElementById('custReference').value.trim() : '';

    let subtotal = 0, productsText = '';
    cart.forEach(item => {
        const sub = item.price * item.quantity;
        subtotal += sub;
        const v = item.cor ? ` [${item.cor}, Tam ${item.tamanho}]` : '';
        productsText += `${item.name}${v} x${item.quantity} (R$${sub.toFixed(2)}) | `;
    });

    const total     = subtotal + freteValue;
    const timestamp = new Date().toLocaleString('pt-BR');

    document.getElementById('verificationCode').textContent = orderNumber;

    fetch(SHEETS_API, {
        method: 'POST',
        body: JSON.stringify({
            orderNumber, timestamp, nome: name, telefone: phone,
            tipoEntrega: selectedDelivery === 'retirada' ? 'Retirada na Loja' : 'Entrega em Domicílio',
            endereco: address + (reference ? ` - Ref: ${reference}` : ''),
            bairro: selectedDelivery === 'retirada' ? 'Marco (Loja)' : selectedBairro,
            produtos: productsText.slice(0, -3),
            frete: freteValue, total
        })
    }).then(r => r.json())
      .then(d => console.log('Pedido salvo:', d))
      .catch(e => console.log('Erro ao salvar:', e));

    let msg = '\uD83D\uDED2 *NOVO PEDIDO NAYA BLUE*\n';
    msg += `\uD83D\uDCCB *Pedido:* ${orderNumber}\n`;
    msg += `\uD83D\uDC64 *Cliente:*\n   ${name}\n   ${phone}\n`;

    if (selectedDelivery === 'retirada') {
        msg += '\uD83D\uDCCD *Retirada na Loja*\n   Passagem Olímpia, nº 59\n   Bairro do Marco - CEP: 66093-220\n';
    } else {
        msg += `\uD83D\uDCCD *Entrega em Domicílio*\n   ${address}\n`;
        if (reference) msg += `   Ref: ${reference}\n`;
        msg += `   ${selectedBairro}\n`;
    }

    msg += '\uD83D\uDED2 *Produtos:*\n';
    cart.forEach(item => {
        const sub = item.price * item.quantity;
        const vl  = item.cor && item.tamanho
            ? `\n      \uD83D\uDC5F Cor: ${item.cor} | Tamanho: ${item.tamanho}`
            : item.cor
            ? `\n      \uD83D\uDC5F Cor: ${item.cor}`
            : '';
        msg += `   \u25AA ${item.name} x${item.quantity} = R$ ${sub.toFixed(2)}${vl}\n`;
    });

    msg += `\uD83D\uDCB0 *Subtotal:* R$ ${subtotal.toFixed(2)}\n`;
    msg += `\uD83D\uDE9A *Frete:* R$ ${freteValue.toFixed(2)}\n`;
    msg += `\uD83D\uDCB5 *TOTAL: R$ ${total.toFixed(2)}*\n`;
    msg += `\uD83D\uDD10 *N\u00BA do Pedido:* ${orderNumber}\n`;
    msg += `\uD83D\uDCB3 *Pagamento:* Aguardando link Mercado Pago\n`;
    msg += `\uD83D\uDCC5 ${timestamp}`;

    const waPhone  = '5591993777788';
    const encoded  = encodeURIComponent(msg);
    const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
    const waUrl    = isMobile
        ? `https://wa.me/${waPhone}?text=${encoded}`
        : `https://web.whatsapp.com/send?phone=${waPhone}&text=${encoded}`;

    window.open(waUrl, '_blank');
}

function openWhatsApp() {
    window.open('https://wa.me/5591993777788?text=' + encodeURIComponent('Olá! Gostaria de mais informações sobre meu pedido.'), '_blank');
}

function finishOrder() {
    bootstrap.Modal.getInstance(document.getElementById('checkoutModal')).hide();
    cart = [];
    updateCart();
    ['custName','custPhone','custAddress','custReference'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('bairroSelect').value = '';
    selectedDelivery = 'retirada'; freteValue = 0; selectedBairro = '';
    goToStep(1);
    showNotification('Obrigada pela preferência! Em breve você receberá o link de pagamento. 💙');
}

function showNotification(message) {
    const n = document.createElement('div');
    n.style.cssText = `position:fixed;top:100px;right:20px;background:#10B981;color:white;
        padding:1rem 1.5rem;border-radius:10px;box-shadow:0 4px 10px rgba(0,0,0,0.2);
        z-index:9999;animation:slideIn 0.3s ease;`;
    n.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    document.body.appendChild(n);
    setTimeout(() => n.remove(), 3000);
}

// ========================================
// INICIALIZAÇÃO
// ========================================
loadProducts();

window.addEventListener('scroll', function () {
    document.querySelector('.navbar').classList.toggle('scrolled', window.scrollY > 50);
});
