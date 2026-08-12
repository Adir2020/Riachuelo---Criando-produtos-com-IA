/**
 * QA Quest - Base de Dados do Jogo de 30 Dias de QA
 */

const GAME_DATA = {
  ranks: [
    { level: 1, title: "QA Aprendiz 🐣", minXp: 0 },
    { level: 2, title: "Estagiário de Testes 🔍", minXp: 150 },
    { level: 3, title: "QA Junior I 🚀", minXp: 350 },
    { level: 4, title: "QA Junior II 🛡️", minXp: 600 },
    { level: 5, title: "Analisador de Bugs 👾", minXp: 900 },
    { level: 6, title: "QA Pleno I ⚔️", minXp: 1250 },
    { level: 7, title: "Especialista em API 🌐", minXp: 1650 },
    { level: 8, title: "Automação Ninja 🤖", minXp: 2100 },
    { level: 9, title: "Mestre em CI/CD ⚙️", minXp: 2600 },
    { level: 10, title: "QA Lead / Lenda do QA 👑", minXp: 3200 }
  ],

  achievements: [
    { id: 'first_step', title: 'Primeiro Passo', desc: 'Concluiu o primeiro dia de estudos.', icon: '🚩', xp: 50 },
    { id: 'streak_3', title: 'Foco Total', desc: 'Alcançou 3 dias de ofensiva seguidos.', icon: '🔥', xp: 100 },
    { id: 'bug_hunter_s1', title: 'Caçador de Bugs I', desc: 'Completou o desafio prático do Dia 7.', icon: '🐞', xp: 150 },
    { id: 'bug_report_pro', title: 'Relator de Defeitos', desc: 'Completou o gerador de Bug Report do Dia 14.', icon: '📋', xp: 150 },
    { id: 'api_master', title: 'Mestre do Postman', desc: 'Executou as 5 requisições de API no Dia 21.', icon: '⚡', xp: 200 },
    { id: 'git_ninja', title: 'Git Ninja', desc: 'Concluiu os comandos no terminal Git.', icon: '🔀', xp: 150 },
    { id: 'qa_hero', title: 'Portfólio Campeão', desc: 'Concluiu o Projeto Final de 30 Dias!', icon: '🏆', xp: 500 }
  ],

  weeks: [
    {
      id: 1,
      title: "Semana 1: Fundamentos de QA",
      badge: "🌱",
      desc: "Conceitos fundamentais, ciclo de desenvolvimento, tipos de testes e criação de cenários/casos.",
      days: [
        {
          day: 1,
          title: "QA, Testes e Ciclo de Software",
          subtitle: "Dias 1–2 (Parte 1)",
          xp: 50,
          theory: "Quality Assurance (QA) visa prevenir defeitos no processo, enquanto Quality Control (QC) foca em identificar defeitos no produto final. O ciclo SDLC (Software Development Life Cycle) envolve planejamento, análise, design, implementação, testes e manutenção.",
          tasks: [
            "Estudar a diferença entre QA (Garantia) e QC (Controle)",
            "Entender as fases do SDLC e STLC (Software Testing Life Cycle)",
            "Escrever 3 anotações rápidas no seu caderno ou semana-01.md"
          ],
          quiz: {
            question: "Qual a principal diferença entre Quality Assurance (QA) e Quality Control (QC)?",
            options: [
              "QA foca em prevenir defeitos nos processos; QC foca em identificar defeitos no produto final.",
              "QA é apenas automação; QC é apenas teste manual.",
              "QA é feito pelos desenvolvedores; QC é feito pelos usuários finais.",
              "Não há diferença, são termos exatamente sinônimos."
            ],
            correct: 0,
            explanation: "QA é proativo e orientado ao processo para evitar falhas. QC é reativo e examina o software pronto para achar falhas."
          }
        },
        {
          day: 2,
          title: "Ciclo de Vida do Teste (STLC)",
          subtitle: "Dias 1–2 (Parte 2)",
          xp: 50,
          theory: "O STLC (Software Testing Life Cycle) possui etapas bem definidas: Análise de Requisitos -> Planejamento de Testes -> Desenvolvimento de Casos de Teste -> Configuração do Ambiente -> Execução dos Testes -> Encerramento do Ciclo.",
          tasks: [
            "Mapear as 6 fases do STLC",
            "Identificar em qual fase os casos de teste são criados",
            "Revisar o conceito de Custo do Defeito (quanto mais cedo achado, mais barato)"
          ],
          quiz: {
            question: "Em qual momento do ciclo de desenvolvimento é ideal iniciar o planejamento dos testes?",
            options: [
              "Somente após o código estar 100% pronto e em produção.",
              "O mais cedo possível, logo na fase de análise de requisitos (Shift Left).",
              "Apenas na semana de entrega do projeto.",
              "Quando os usuários finais começarem a reclamar de bugs."
            ],
            correct: 1,
            explanation: "A prática de Shift Left prega iniciar os testes e validações o quanto antes para reduzir custos de correção."
          }
        },
        {
          day: 3,
          title: "Tipos de Testes: Funcional vs Não-Funcional",
          subtitle: "Dias 3–4 (Parte 1)",
          xp: 50,
          theory: "Testes Funcionais validam O QUE o sistema faz (ex: login, cadastro, pagamentos). Testes Não-Funcionais validam COMO o sistema se comporta (desempenho, segurança, usabilidade, acessibilidade).",
          tasks: [
            "Diferenciar requisitos funcionais de não-funcionais",
            "Listar 3 exemplos de testes funcionais e 3 não-funcionais",
            "Anotar a importância do Smoke Test"
          ],
          quiz: {
            question: "Qual das opções abaixo é um exemplo de teste Não-Funcional?",
            options: [
              "Verificar se o botão de 'Cadastrar' envia os dados corretamente.",
              "Testar o tempo de resposta da página com 1.000 usuários simultâneos (Desempenho).",
              "Validar se o campo de e-mail exige o caractere '@'.",
              "Conferir se o saldo da conta diminui após uma compra."
            ],
            correct: 1,
            explanation: "Desempenho, carga e estresse avaliam atributos de qualidade não-funcionais do sistema."
          }
        },
        {
          day: 4,
          title: "Smoke, Regressão e Testes Exploratórios",
          subtitle: "Dias 3–4 (Parte 2)",
          xp: 50,
          theory: "Smoke Test verifica se as funções críticas estão operacionais antes de testes profundos. Teste de Regressão garante que alterações novas não quebraram o que já funcionava. Teste Exploratório usa a intuição e experiência do QA em tempo real.",
          tasks: [
            "Aprender quando aplicar um Smoke Test (Build Acceptance)",
            "Compreender a utilidade da suíte de teste de Regressão",
            "Praticar 15 minutos de teste exploratório em um site de sua escolha"
          ],
          quiz: {
            question: "Quando devemos executar um Teste de Regressão?",
            options: [
              "Apenas na primeira versão de um sistema novo.",
              "Sempre que houver alterações no código, correções de bugs ou novas funcionalidades.",
              "Somente quando o servidor cair.",
              "Nunca, pois testes passados não precisam ser repetidos."
            ],
            correct: 1,
            explanation: "A regressão garante a estabilidade de funcionalidades antigas após novas mudanças no código."
          }
        },
        {
          day: 5,
          title: "Cenários de Teste",
          subtitle: "Dias 5–6 (Parte 1)",
          xp: 50,
          theory: "Um Cenário de Teste descreve 'O QUE' será testado em alto nível (ex: 'Validar login com sucesso'). É o ponto de partida antes de detalhar os passos específicos.",
          tasks: [
            "Aprender a diferença entre Cenário e Caso de Teste",
            "Escrever 5 cenários para uma tela de carrinho de compras",
            "Revisar o conceito de cobertura de testes"
          ],
          quiz: {
            question: "Qual a diferença entre Cenário de Teste e Caso de Teste?",
            options: [
              "Cenário é o objetivo em alto nível ('O que testar'); Caso de Teste traz os passos detalhados e dados ('Como testar').",
              "Cenário é em inglês; Caso de teste é em português.",
              "Cenário é para código backend; Caso de teste é para frontend.",
              "Não há nenhuma diferença prática entre eles."
            ],
            correct: 0,
            explanation: "Um único cenário de teste pode se desdobrar em múltiplos casos de teste (positivos, negativos e limites)."
          }
        },
        {
          day: 6,
          title: "Estruturação de Casos de Teste",
          subtitle: "Dias 5–6 (Parte 2)",
          xp: 50,
          theory: "Um Caso de Teste bem estruturado contém: ID, Título, Pré-condições, Passos de Execução, Dados de Entrada, Resultado Esperado e Status (Pass/Fail).",
          tasks: [
            "Estudar o padrão de redação de passos claros e reproduzíveis",
            "Desenhar a estrutura padrão de caso de teste em markdown",
            "Preparar-se para o desafio prático do Dia 7"
          ],
          quiz: {
            question: "Qual componente é ESSENCIAL em um Caso de Teste para determinar se o teste passou ou falhou?",
            options: [
              "Nome do desenvolvedor que fez a tela.",
              "Resultado Esperado (Expected Result).",
              "Cor do tema do aplicativo.",
              "Endereço IP do computador."
            ],
            correct: 1,
            explanation: "Sem um Resultado Esperado claro, o QA não pode comparar com o Resultado Obtido para validar o teste."
          }
        },
        {
          day: 7,
          title: "🎮 DESAFIO DA SEMANA 1: Caça aos Bugs!",
          subtitle: "Dia 7 (Prática)",
          xp: 150,
          isMinigame: true,
          minigameType: "bug_hunt",
          theory: "Hora de colocar a teoria em prática! Acesse o simulador de e-commerce e encontre os 3 bugs escondidos na interface.",
          tasks: [
            "Testar a interface do e-commerce simulado",
            "Encontrar os 3 bugs visuais/funcionais",
            "Registrar 10 casos de teste básicos no seu documento de anotações"
          ]
        }
      ]
    },

    {
      id: 2,
      title: "Semana 2: Testes Funcionais",
      badge: "🧪",
      desc: "Técnicas de design de teste (Particionamento por Equivalência, Valor Limite) e Bug Reports profissionais.",
      days: [
        {
          day: 8,
          title: "Testes Positivos e Negativos",
          subtitle: "Dias 8–9 (Parte 1)",
          xp: 50,
          theory: "Testes Positivos verificam se o sistema funciona com dados válidos no 'caminho feliz'. Testes Negativos testam a resiliência do sistema com dados inválidos ou inesperados.",
          tasks: [
            "Identificar fluxos de caminho feliz (Happy Path)",
            "Criar cenários negativos para um campo de formulário",
            "Anotar a importância de mensagens de erro amigáveis"
          ],
          quiz: {
            question: "Qual o objetivo principal dos Testes Negativos?",
            options: [
              "Deixar os desenvolvedores chateados.",
              "Garantir que o sistema trate erros adequadamente e não quebre com dados inválidos.",
              "Testar apenas o caminho feliz com informações perfeitas.",
              "Garantir que a internet não caia durante o uso."
            ],
            correct: 1,
            explanation: "Testes negativos garantem a solidez do sistema contra falhas e tentativas de uso incorreto."
          }
        },
        {
          day: 9,
          title: "Técnicas: Particionamento e Valor Limite",
          subtitle: "Dias 8–9 (Parte 2)",
          xp: 60,
          theory: "Particionamento por Equivalência divide os dados em classes válidas e inválidas. Análise de Valor Limite (BVA) testa os limites exatos das partições (ex: se o limite é idade 18 a 60, testamos 17, 18, 19, 59, 60, 61).",
          tasks: [
            "Aplicar BVA em um campo de idade (18 a 65 anos)",
            "Identificar os valores de borda (min-1, min, min+1, max-1, max, max+1)",
            "Desenhar uma tabela de partição de equivalência simples"
          ],
          quiz: {
            question: "Se um campo aceita senhas de 8 a 16 caracteres, quais valores testar na Análise de Valor Limite (BVA)?",
            options: [
              "1, 5, 20 e 100 caracteres.",
              "7, 8, 9 caracteres e 15, 16, 17 caracteres.",
              "Qualquer quantidade entre 8 e 16.",
              "Apenas senhas com 10 caracteres."
            ],
            correct: 1,
            explanation: "Na BVA testamos os limites exatos e seus vizinhos imediatos (abaixo do mínimo, mínimo, acima do mínimo, abaixo do máximo, máximo, acima do máximo)."
          }
        },
        {
          day: 10,
          title: "Anatomia de um Bug Report",
          subtitle: "Dias 10–11 (Parte 1)",
          xp: 60,
          theory: "Um bom Bug Report deve ser claro, objetivo e reproduzível. Elementos vitais: Título descritivo, Passos para Reproduzir, Resultado Esperado, Resultado Obtido, Ambiente (OS, Browser) e Evidências (screenshots/vídeos).",
          tasks: [
            "Estudar o formato padrão de relatório de defeitos",
            "Entender a importância dos passos de reprodução sem ambiguidade",
            "Analisar exemplos de bons e maus bug reports"
          ],
          quiz: {
            question: "Por que um passo a passo claro é a parte mais crítica de um Bug Report?",
            options: [
              "Para preencher espaço no relatório.",
              "Para permitir que o desenvolvedor consiga reproduzir o defeito e corrigi-lo sem adivinhações.",
              "Para provar que o QA sabe escrever rápido.",
              "Não é importante, basta mandar uma foto sem contexto."
            ],
            correct: 1,
            explanation: "Se o desenvolvedor não conseguir reproduzir o bug a partir dos passos relatados, a correção se torna muito difícil ou o bug é rejeitado."
          }
        },
        {
          day: 11,
          title: "Prioridade vs Severidade de Bugs",
          subtitle: "Dias 10–11 (Parte 2)",
          xp: 60,
          theory: "Severidade mede o IMPACTO TÉCNICO do bug no sistema (Alta, Média, Baixa). Prioridade mede a URGÊNCIA DE NEGÓCIO para correção (Alta, Média, Baixa). Ex: Erro de digitação na logomarca da página inicial = Severidade Baixa, Prioridade Alta.",
          tasks: [
            "Compreender a diferença entre Severidade e Prioridade",
            "Classificar 3 exemplos práticos de bugs nas 4 combinações possíveis",
            "Anotar casos de Severidade Alta com Prioridade Baixa"
          ],
          quiz: {
            question: "Um erro de ortografia no título da página principal da empresa possui:",
            options: [
              "Severidade Alta / Prioridade Alta.",
              "Severidade Baixa / Prioridade Alta (impacta a imagem da empresa, mas não trava a aplicação).",
              "Severidade Alta / Prioridade Baixa.",
              "Severidade Baixa / Prioridade Baixa."
            ],
            correct: 1,
            explanation: "Não há quebra de funcionalidade do sistema (Severidade Baixa), mas afeta a reputação pública da empresa (Prioridade Alta)."
          }
        },
        {
          day: 12,
          title: "Validação de Formulários",
          subtitle: "Dias 12–13 (Parte 1)",
          xp: 60,
          theory: "Formulários são grandes portas de entrada de dados e erros. É necessário testar: campos obrigatórios, tipos de dados, limites de caracteres, caracteres especiais, injeção de script (XSS básico) e mensagens de validação.",
          tasks: [
            "Mapear todos os campos de um formulário de cadastro",
            "Criar uma matriz de testes para validação de campos",
            "Verificar comportamento com espaços em branco (trimming)"
          ],
          quiz: {
            question: "O que deve acontecer quando um usuário tenta enviar um formulário com um campo obrigatório vazio?",
            options: [
              "A aplicação deve travar com tela branca.",
              "Os dados devem ser salvos como nulos no banco silenciosamente.",
              "O envio deve ser bloqueado com uma mensagem clara de validação para o usuário.",
              "O computador deve reiniciar."
            ],
            correct: 2,
            explanation: "O frontend/backend deve validar o campo e instruir o usuário de maneira clara."
          }
        },
        {
          day: 13,
          title: "Preparando a Suíte de Testes Manuais",
          subtitle: "Dias 12–13 (Parte 2)",
          xp: 60,
          theory: "Organizar casos de teste em suítes lógicas por módulos (ex: Módulo Autenticação, Módulo Checkout, Módulo Perfil) facilita a execução e relatórios de progresso.",
          tasks: [
            "Agrupar casos de teste por módulos funcionais",
            "Estudar o cálculo de taxa de sucesso dos testes (% Pass/Fail)",
            "Preparar o modelo de Bug Report para o desafio do Dia 14"
          ],
          quiz: {
            question: "O que é uma 'Suíte de Testes' (Test Suite)?",
            options: [
              "Um quarto de hotel onde os QAs trabalham.",
              "Um conjunto de casos de teste agrupados por funcionalidade ou objetivo comum.",
              "Um software antivírus para computadores.",
              "Uma linguagem de programação moderna."
            ],
            correct: 1,
            explanation: "Uma suíte de testes agrupa diversos casos de teste relacionados para execução organizada."
          }
        },
        {
          day: 14,
          title: "🎮 DESAFIO DA SEMANA 2: Gerador de Bug Report!",
          subtitle: "Dia 14 (Prática)",
          xp: 150,
          isMinigame: true,
          minigameType: "bug_report",
          theory: "Desafio Prático: monte um Bug Report impecável escolhendo a Severidade, Prioridade, Passos e Resultados corretos para o defeito apresentado.",
          tasks: [
            "Analisar o defeito apresentado na simulação",
            "Classificar corretamente Severidade e Prioridade",
            "Gerar o Bug Report completo e exportar o resultado"
          ]
        }
      ]
    },

    {
      id: 3,
      title: "Semana 3: API e Automação",
      badge: "⚡",
      desc: "Fundamentos de Web/HTTP, testes manuais com Postman e introdução à automação de testes.",
      days: [
        {
          day: 15,
          title: "Fundamentos de API & Protocolo HTTP",
          subtitle: "Dias 15–16 (Parte 1)",
          xp: 70,
          theory: "API (Application Programming Interface) permite a comunicação entre sistemas. O protocolo HTTP utiliza requisições (Request) e respostas (Response) compostas por URL, Métodos, Headers e Body.",
          tasks: [
            "Entender a arquitetura cliente-servidor",
            "Diferenciar os verbos HTTP principais: GET, POST, PUT, DELETE",
            "Conhecer a estrutura do formato JSON (chaves e valores)"
          ],
          quiz: {
            question: "Qual método HTTP é utilizado convencionalmente para CRIAR um novo recurso no servidor?",
            options: [
              "GET",
              "POST",
              "DELETE",
              "HEAD"
            ],
            correct: 1,
            explanation: "O método POST é utilizado para submeter dados e criar novos recursos no servidor."
          }
        },
        {
          day: 16,
          title: "Status Codes HTTP & JSON",
          subtitle: "Dias 15–16 (Parte 2)",
          xp: 70,
          theory: "Status Codes indicam o resultado da requisição: 2xx (Sucesso - ex: 200 OK, 201 Created), 4xx (Erro do Cliente - ex: 400 Bad Request, 404 Not Found), 5xx (Erro do Servidor - ex: 500 Internal Server Error).",
          tasks: [
            "Memorizar os principais grupos de status code HTTP (2xx, 4xx, 5xx)",
            "Analisar um payload JSON de resposta",
            "Praticar a identificação de erros de requisição"
          ],
          quiz: {
            question: "Qual Status Code HTTP indica que o recurso solicitado NÃO foi encontrado no servidor?",
            options: [
              "200 OK",
              "201 Created",
              "404 Not Found",
              "500 Internal Server Error"
            ],
            correct: 2,
            explanation: "404 Not Found é o erro clássico de cliente quando a URL ou recurso buscado não existe."
          }
        },
        {
          day: 17,
          title: "Introdução ao Postman",
          subtitle: "Dias 17–18 (Parte 1)",
          xp: 70,
          theory: "Postman é a ferramenta líder para testes de API. Permite criar requisições, organizar Coleções (Collections), configurar Variáveis de Ambiente e automatizar asserções de testes em JavaScript.",
          tasks: [
            "Instalar ou acessar o Postman (web/desktop)",
            "Criar uma Coleção de testes para uma API de testes (ex: ReqRes ou JSONPlaceholder)",
            "Enviar uma requisição GET e inspecionar o Body e Headers"
          ],
          quiz: {
            question: "Para que servem as 'Collections' no Postman?",
            options: [
              "Para guardar fotos e vídeos do computador.",
              "Para agrupar e organizar requisições HTTP relacionadas em pastas.",
              "Para acelerar o processador do computador.",
              "Para compilar código Java."
            ],
            correct: 1,
            explanation: "Collections no Postman organizam suítes de testes de API para fácil execução e reaproveitamento."
          }
        },
        {
          day: 18,
          title: "Validações e Scripts no Postman",
          subtitle: "Dias 17–18 (Parte 2)",
          xp: 70,
          theory: "Na aba 'Tests' do Postman, escrevemos validações automáticas como: `pm.response.to.have.status(200)` e checagem de propriedades JSON no corpo da resposta.",
          tasks: [
            "Criar um teste que valida o Status Code 200 no Postman",
            "Validar a presença de um campo específico no JSON de resposta",
            "Executar a coleção usando o Collection Runner"
          ],
          quiz: {
            question: "Em qual aba do Postman é possível escrever scripts JavaScript para validar automaticamente a resposta da API?",
            options: [
              "Params",
              "Headers",
              "Tests",
              "Body"
            ],
            correct: 2,
            explanation: "A aba Tests permite executar código JS após o recebimento da resposta para fazer asserções."
          }
        },
        {
          day: 19,
          title: "Fundamentos de Automação de Testes",
          subtitle: "Dias 19–20 (Parte 1)",
          xp: 70,
          theory: "Automação de testes utiliza scripts para executar passos de teste e verificar resultados sem intervenção humana manual. Indicada para testes repetitivos e de regressão.",
          tasks: [
            "Compreender a Pirâmide de Testes (Unidade > Integração > E2E/UI)",
            "Aprender quando automatizar e quando manter teste manual",
            "Conhecer os conceitos de Locators / Seletores CSS e XPath"
          ],
          quiz: {
            question: "De acordo com a Pirâmide de Testes, qual camada deve possuir a maior quantidade de testes automatizados devido ao baixo custo e alta rapidez?",
            options: [
              "Testes de Interface (UI / E2E).",
              "Testes Manuais Exploratórios.",
              "Testes Unitários (Unidade).",
              "Testes de Carga."
            ],
            correct: 2,
            explanation: "Testes unitários são rápidos, baratos de manter e isolados, formando a base da Pirâmide de Testes."
          }
        },
        {
          day: 20,
          title: "Ferramentas: Playwright e Selenium",
          subtitle: "Dias 19–20 (Parte 2)",
          xp: 70,
          theory: "Playwright e Selenium são frameworks modernos para automação Web. O Playwright destaca-se pela velocidade, suporte nativo a múltiplos navegadores e auto-waiting de elementos.",
          tasks: [
            "Conhecer a sintaxe básica de seletores (`page.locator('button')`)",
            "Entender a diferença entre asserções assíncronas e esperas explícitas",
            "Comparar Playwright vs Selenium"
          ],
          quiz: {
            question: "Qual a vantagem do mecanismo de 'Auto-waiting' presente em frameworks modernos como Playwright?",
            options: [
              "O teste espera automaticamente o elemento estar visível e interativo antes de clicar, reduzindo testes instáveis (flaky tests).",
              "Faz o computador desligar após o teste.",
              "Aumenta o tempo de execução dos testes em 10 vezes.",
              "Não precisa escrever nenhum código."
            ],
            correct: 0,
            explanation: "O auto-waiting aguarda as condições necessárias para interação, evitando erros de elemento não encontrado."
          }
        },
        {
          day: 21,
          title: "🎮 DESAFIO DA SEMANA 3: Simulador de API Postman!",
          subtitle: "Dia 21 (Prática)",
          xp: 200,
          isMinigame: true,
          minigameType: "postman",
          theory: "Desafio de API: utilize o simulador do Postman para enviar 5 requisições HTTP (GET, POST, PUT, DELETE) e validar os status codes e JSONs de resposta.",
          tasks: [
            "Testar requisição GET para listar usuários",
            "Testar requisição POST para criar um novo registro",
            "Validar as respostas HTTP e inspecionar o formato JSON"
          ]
        }
      ]
    },

    {
      id: 4,
      title: "Semana 4: Git, CI/CD e Projeto Final",
      badge: "🛠️",
      desc: "Controle de versão, integração contínua e desenvolvimento do projeto final de portfólio.",
      days: [
        {
          day: 22,
          title: "Git Básico para QAs",
          subtitle: "Dias 22–23 (Parte 1)",
          xp: 80,
          theory: "Git é o sistema de controle de versão distribuído essencial. Permite controlar o histórico de alterações de código de testes e colaborar com o time de desenvolvimento.",
          tasks: [
            "Entender os estados do Git: Working Directory, Staging Area, Local Repository",
            "Praticar os comandos `git status`, `git add` e `git commit`",
            "Escrever mensagens de commit claras e padronizadas"
          ],
          quiz: {
            question: "Qual comando do Git adiciona arquivos modificados à área de preparação (Staging Area) antes do commit?",
            options: [
              "git push",
              "git add",
              "git checkout",
              "git clone"
            ],
            correct: 1,
            explanation: "O comando `git add` move as alterações para a Staging Area para serem incluídas no próximo commit."
          }
        },
        {
          day: 23,
          title: "Branches, Remoto e Pull Requests",
          subtitle: "Dias 22–23 (Parte 2)",
          xp: 80,
          theory: "Branches (ramificações) isolam o desenvolvimento de novas funcionalidades ou suítes de testes. `git push` envia alterações locais para o GitHub/GitLab, onde Pull Requests são revisados.",
          tasks: [
            "Criar e alternar entre branches (`git checkout -b feature/testes`)",
            "Simular o envio de alterações para o repositório remoto",
            "Entender o fluxo de Code Review em Pull Requests"
          ],
          quiz: {
            question: "Para que serve uma 'Branch' no Git?",
            options: [
              "Para apagar todo o projeto do computador.",
              "Para criar uma linha isolada de desenvolvimento sem afetar o código principal (main/master).",
              "Para rodar os testes sem precisar de internet.",
              "Para formatar o disco rígido."
            ],
            correct: 1,
            explanation: "Branches permitem trabalhar em novas funcionalidades ou testes em paralelo de forma segura."
          }
        },
        {
          day: 24,
          title: "Conceitos de CI/CD",
          subtitle: "Dias 24–25 (Parte 1)",
          xp: 80,
          theory: "CI (Continuous Integration) integra e valida código continuamente via testes automatizados. CD (Continuous Delivery/Deployment) automatiza a entrega do software para ambientes de teste e produção.",
          tasks: [
            "Compreender os benefícios da Integração Contínua",
            "Identificar o papel dos testes automatizados em um pipeline de CI",
            "Anotar a diferença entre Continuous Delivery e Continuous Deployment"
          ],
          quiz: {
            question: "Qual o papel principal dos testes automatizados em uma esteira de CI (Continuous Integration)?",
            options: [
              "Fazer o deploy no sábado de madrugada.",
              "Validar a cada commit/pull request se a nova alteração não introduziu regressões no sistema.",
              "Gerar senhas aleatórias.",
              "Substituir todos os analistas de QA da empresa."
            ],
            correct: 1,
            explanation: "Na CI, a execução automática de testes garante feedback rápido sobre a qualidade de novas alterações."
          }
        },
        {
          day: 25,
          title: "Pipelines com GitHub Actions",
          subtitle: "Dias 24–25 (Parte 2)",
          xp: 80,
          theory: "GitHub Actions permite criar workflows automatizados em arquivos `.yml` no repositório. Pode ser configurado para executar suítes de testes a cada `push` ou `pull_request`.",
          tasks: [
            "Entender a estrutura básica de um arquivo de workflow (`.github/workflows/main.yml`)",
            "Mapear as etapas de um Job: checkout do código, instalação de dependências, execução de testes",
            "Verificar relatórios de execução do pipeline"
          ],
          quiz: {
            question: "Onde ficam armazenados os arquivos de configuração do GitHub Actions no repositório?",
            options: [
              "Na pasta raiz `C:/Windows/`",
              "Dentro do diretório `.github/workflows/` no formato YAML (`.yml`)",
              "Em um arquivo de texto no Desktop",
              "No banco de dados do servidor"
            ],
            correct: 1,
            explanation: "O GitHub lê automaticamente os arquivos `.yml` presentes no diretório `.github/workflows/`."
          }
        },
        {
          day: 26,
          title: "Organização de Projetos de QA",
          subtitle: "Dias 26–27 (Parte 1)",
          xp: 80,
          theory: "Um projeto de QA profissional possui estrutura clara: pasta de documentação de testes, relatórios de bugs em markdown, coleções de API e pasta de scripts de automação limpos e modularizados.",
          tasks: [
            "Estruturar as pastas de um repositório modelo de QA no GitHub",
            "Criar um README.md profissional para seu projeto de portfólio",
            "Organizar a documentação dos cenários executados"
          ],
          quiz: {
            question: "O que NÃO deve faltar no README.md de um projeto de QA no GitHub para causar boa impressão em recrutadores?",
            options: [
              "Receitas de culinária.",
              "Descrição do projeto, tecnologias utilizadas, instrução de como executar os testes e links de evidências.",
              "Apenas o seu nome sem nenhuma explicação.",
              "O código-fonte completo colado em texto puro sem formatação."
            ],
            correct: 1,
            explanation: "Um README claro guia quem avalia seu portfólio sobre a arquitetura e como rodar o projeto de testes."
          }
        },
        {
          day: 27,
          title: "Revisão e Preparação do Projeto Final",
          subtitle: "Dias 26–27 (Parte 2)",
          xp: 80,
          theory: "Consolidação de todo o conteúdo visto nos 26 dias anteriores. Garantir que a documentação, os casos de teste, os bugs e os testes de API estão devidamente integrados.",
          tasks: [
            "Revisar todos os entregáveis das Semanas 1, 2 e 3",
            "Fazer o checklist final dos artefatos de teste",
            "Preparar-se para a maratona final do Projeto (Dias 28 a 30)"
          ],
          quiz: {
            question: "Qual atitude demonstra maturidade técnica de um profissional de QA ao finalizar um ciclo de testes?",
            options: [
              "Esconder os bugs encontrados para entregar no prazo.",
              "Apresentar um relatório claro com métricas, bugs documentados, testes executados e sugestões de melhorias.",
              "Deixar a aplicação sem testar.",
              "Apagar os testes antigos."
            ],
            correct: 1,
            explanation: "Transparência, documentação precisa e visão de melhoria contínua são pilares de um bom QA."
          }
        },
        {
          day: 28,
          title: "🎮 PROJETO FINAL (Parte 1): Documentação e Casos",
          subtitle: "Dias 28–30 (Etapa 1)",
          xp: 100,
          theory: "Início do Projeto Final de Portfólio! Etapa 1: Estruturação dos Casos de Teste e Plano de Testes em Markdown.",
          tasks: [
            "Definir o sistema alvo para o projeto final de portfólio",
            "Elaborar 10 casos de teste completos e bem estruturados",
            "Adicionar a documentação na pasta do seu projeto"
          ],
          quiz: {
            question: "Na primeira etapa do projeto final de QA, qual o foco principal?",
            options: [
              "Fazer o deploy em produção sem testar.",
              "Planejar e documentar os cenários de teste e a estratégia da aplicação.",
              "Deletar a base de dados.",
              "Comprar servidores novos."
            ],
            correct: 1,
            explanation: "O planejamento e a documentação bem alinhados garantem uma execução eficiente no projeto final."
          }
        },
        {
          day: 29,
          title: "🎮 PROJETO FINAL (Parte 2): API e Bug Reports",
          subtitle: "Dias 28–30 (Etapa 2)",
          xp: 100,
          theory: "Etapa 2 do Projeto Final: Execução de testes de API com Postman e documentação rigorosa de todos os defeitos encontrados.",
          tasks: [
            "Exportar a coleção de testes de API do Postman (.json)",
            "Registrar no mínimo 3 Bug Reports detalhados",
            "Organizar as evidências visuais e de logs"
          ],
          quiz: {
            question: "Como anexar a coleção de testes de API do Postman ao seu repositório no GitHub?",
            options: [
              "Tirando foto da tela do computador com a câmera do celular.",
              "Exportando a Collection em formato `.json` e salvando dentro da pasta do repositório.",
              "Não é possível colocar Postman no GitHub.",
              "Copiando a URL do site do Google."
            ],
            correct: 1,
            explanation: "O Postman permite exportar Collections e Environments em arquivos `.json` diretamente para o Git."
          }
        },
        {
          day: 30,
          title: "👑 DESAFIO FINAL: Conclusão do Portfólio de QA!",
          subtitle: "Dia 30 (Boss Final)",
          xp: 300,
          isMinigame: true,
          minigameType: "final_project",
          theory: "Parabéns! Você chegou ao Boss Final! Complete as validações de encerramento, consolide seu repositório de portfólio e conquiste seu Certificado de 30 Dias de QA!",
          tasks: [
            "Concluir as verificações finais do projeto",
            "Publicar o repositório completo com README, Cronograma, Anotações e Recursos",
            "Gerar seu Certificado de Conclusão!"
          ]
        }
      ]
    }
  ]
};
