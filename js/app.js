/**
 * QA Quest - Lógica Principal do Jogo (app.js)
 */

class QAQuestApp {
  constructor() {
    this.saveKey = 'qa_quest_save_v1';

    // State Default
    this.state = {
      xp: 0,
      level: 1,
      streak: 1,
      lastActiveDate: null,
      completedDays: [],
      unlockedAchievements: [],
      currentWeekId: 1,
      currentDayNum: 1,
      taskProgress: {}, // dayNum -> array of checked indexes
      quizAnswers: {},  // dayNum -> { optionIndex, isCorrect }
      playerName: "Futuro QA Lead"
    };

    // State dos mini-jogos temporários
    this.minigameState = {
      bugHuntCount: 0,
      bugsFound: [false, false, false],
      postmanRequests: 0,
      gitStep: 0
    };

    this.init();
  }

  init() {
    this.loadState();
    this.updateStreak();
    this.bindEvents();
    this.renderAll();
  }

  loadState() {
    const saved = localStorage.getItem(this.saveKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        this.state = { ...this.state, ...parsed };
      } catch (e) {
        console.error("Erro ao carregar save state:", e);
      }
    }
    // Garantir arrays e objetos essenciais
    this.state.completedDays = Array.isArray(this.state.completedDays) ? this.state.completedDays : [];
    this.state.unlockedAchievements = Array.isArray(this.state.unlockedAchievements) ? this.state.unlockedAchievements : [];
    this.state.taskProgress = this.state.taskProgress || {};
    this.state.quizAnswers = this.state.quizAnswers || {};
  }

  saveState() {
    localStorage.setItem(this.saveKey, JSON.stringify(this.state));
  }

  updateStreak() {
    const today = new Date().toISOString().split('T')[0];
    if (!this.state.lastActiveDate) {
      this.state.lastActiveDate = today;
      this.state.streak = 1;
      this.saveState();
      return;
    }

    if (this.state.lastActiveDate !== today) {
      const last = new Date(this.state.lastActiveDate);
      const curr = new Date(today);
      const diffDays = Math.round((curr - last) / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        this.state.streak += 1;
        if (this.state.streak >= 3) {
          this.unlockAchievement('streak_3');
        }
      } else if (diffDays > 1) {
        this.state.streak = 1;
      }
      this.state.lastActiveDate = today;
      this.saveState();
    }
  }

  bindEvents() {
    // Som Toggle
    const soundBtn = document.getElementById('sound-toggle-btn');
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        const muted = sounds.toggleMute();
        soundBtn.textContent = muted ? '🔇' : '🔊';
      });
    }

    // Modal de Conquistas
    const achievementsBtn = document.getElementById('achievements-btn');
    if (achievementsBtn) {
      achievementsBtn.addEventListener('click', () => {
        sounds.playClick();
        this.openAchievementsModal();
      });
    }

    // Reset Progress
    const resetBtn = document.getElementById('reset-progress-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm("Deseja realmente reiniciar todo o seu progresso no jogo?")) {
          localStorage.removeItem(this.saveKey);
          location.reload();
        }
      });
    }

    // Modal Closes
    document.querySelectorAll('.modal-close-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        sounds.playClick();
        const modal = e.target.closest('.modal-overlay');
        if (modal) modal.classList.remove('active');
      });
    });

    // ── Mobile Sidebar Toggle ──────────────────────────────────────────────
    const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    const openSidebar = () => {
      sidebar?.classList.add('open');
      overlay?.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (sidebarToggleBtn) {
        sidebarToggleBtn.textContent = '✕';
        sidebarToggleBtn.setAttribute('aria-expanded', 'true');
      }
    };

    const closeSidebar = () => {
      sidebar?.classList.remove('open');
      overlay?.classList.remove('active');
      document.body.style.overflow = '';
      if (sidebarToggleBtn) {
        sidebarToggleBtn.textContent = '☰';
        sidebarToggleBtn.setAttribute('aria-expanded', 'false');
      }
    };

    if (sidebarToggleBtn) {
      sidebarToggleBtn.addEventListener('click', () => {
        const isOpen = sidebar?.classList.contains('open');
        isOpen ? closeSidebar() : openSidebar();
      });
    }

    if (overlay) {
      overlay.addEventListener('click', closeSidebar);
    }

    // Store close function for use in week navigation
    this._closeSidebar = closeSidebar;
  }

  renderAll() {
    this.renderPlayerHeader();
    this.renderSidebarWeeks();
    this.renderDaysRoadmap();
    this.renderCurrentMission();
    this.renderBadgesWidget();
  }

  // Calculate Level based on XP
  getCurrentRank() {
    let currentRank = GAME_DATA.ranks[0];
    for (let rank of GAME_DATA.ranks) {
      if (this.state.xp >= rank.minXp) {
        currentRank = rank;
      } else {
        break;
      }
    }
    return currentRank;
  }

  getNextRank() {
    const current = this.getCurrentRank();
    const nextIndex = GAME_DATA.ranks.findIndex(r => r.level === current.level) + 1;
    if (nextIndex < GAME_DATA.ranks.length) {
      return GAME_DATA.ranks[nextIndex];
    }
    return null;
  }

  addXp(amount) {
    const oldRank = this.getCurrentRank();
    this.state.xp += amount;

    const newRank = this.getCurrentRank();
    if (newRank.level > oldRank.level) {
      sounds.playLevelUp();
      alert(`🎉 LEVEL UP! Você subiu para o Nível ${newRank.level}: ${newRank.title}!`);
    }

    // Check achievement for Day 1
    if (this.state.completedDays.length >= 1) {
      this.unlockAchievement('first_step');
    }

    this.saveState();
    this.renderPlayerHeader();
  }

  unlockAchievement(badgeId) {
    if (!this.state.unlockedAchievements.includes(badgeId)) {
      this.state.unlockedAchievements.push(badgeId);
      const badge = GAME_DATA.achievements.find(a => a.id === badgeId);
      if (badge) {
        sounds.playBadge();
        this.addXp(badge.xp);
        alert(`🏆 CONQUISTA DESBLOQUEADA: ${badge.icon} ${badge.title} (+${badge.xp} XP)!`);
      }
      this.saveState();
      this.renderBadgesWidget();
    }
  }

  renderPlayerHeader() {
    const rank = this.getCurrentRank();
    const nextRank = this.getNextRank();

    document.getElementById('player-level-title').textContent = rank.title;
    document.getElementById('player-streak').textContent = `${this.state.streak} dias`;
    document.getElementById('player-xp-val').textContent = `${this.state.xp} XP`;

    const xpFill = document.getElementById('xp-fill');
    const xpSubText = document.getElementById('xp-subtext');

    if (nextRank) {
      const currentLevelMin = rank.minXp;
      const nextLevelMin = nextRank.minXp;
      const progressInLevel = this.state.xp - currentLevelMin;
      const totalNeededInLevel = nextLevelMin - currentLevelMin;
      const pct = Math.min(100, Math.max(0, (progressInLevel / totalNeededInLevel) * 100));

      xpFill.style.width = `${pct}%`;
      xpSubText.textContent = `${this.state.xp} / ${nextLevelMin} XP para Nível ${nextRank.level}`;
    } else {
      xpFill.style.width = '100%';
      xpSubText.textContent = 'Nível Máximo Alcançado! 👑';
    }
  }

  renderSidebarWeeks() {
    const container = document.getElementById('weeks-nav-list');
    if (!container) return;
    container.innerHTML = '';

    GAME_DATA.weeks.forEach(week => {
      const totalDays = week.days.length;
      const completedInWeek = week.days.filter(d => this.state.completedDays.includes(d.day)).length;

      const li = document.createElement('li');
      li.className = `chapter-nav-item ${week.id === this.state.currentWeekId ? 'active' : ''}`;
      li.innerHTML = `
        <div class="chapter-info">
          <span class="chapter-icon">${week.badge}</span>
          <span class="chapter-name">Semana ${week.id}</span>
        </div>
        <span class="chapter-progress-pill">${completedInWeek}/${totalDays}</span>
      `;

      li.addEventListener('click', () => {
        sounds.playClick();
        this.state.currentWeekId = week.id;
        this.state.currentDayNum = week.days[0].day;
        this.saveState();
        this.renderAll();
        // Close sidebar drawer on mobile after selecting a week
        if (this._closeSidebar) this._closeSidebar();
      });

      container.appendChild(li);
    });
  }

  renderDaysRoadmap() {
    const container = document.getElementById('days-roadmap-pills');
    if (!container) return;
    container.innerHTML = '';

    const currentWeek = GAME_DATA.weeks.find(w => w.id === this.state.currentWeekId);
    if (!currentWeek) return;

    currentWeek.days.forEach(dayObj => {
      const isCompleted = this.state.completedDays.includes(dayObj.day);
      const isActive = dayObj.day === this.state.currentDayNum;

      const div = document.createElement('div');
      div.className = `day-pill ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`;
      div.innerHTML = `
        <span class="day-pill-number">Dia ${dayObj.day}</span>
        <span class="day-pill-status">${isCompleted ? 'Feito' : (dayObj.isMinigame ? 'Desafio' : 'Missão')}</span>
      `;

      div.addEventListener('click', () => {
        sounds.playClick();
        this.state.currentDayNum = dayObj.day;
        this.saveState();
        this.renderDaysRoadmap();
        this.renderCurrentMission();
      });

      container.appendChild(div);
    });
  }

  getCurrentDayData() {
    for (let week of GAME_DATA.weeks) {
      const found = week.days.find(d => d.day === this.state.currentDayNum);
      if (found) return found;
    }
    return GAME_DATA.weeks[0].days[0];
  }

  renderCurrentMission() {
    const missionCard = document.getElementById('mission-card-container');
    if (!missionCard) return;

    const dayData = this.getCurrentDayData();
    const isCompleted = this.state.completedDays.includes(dayData.day);

    let html = `
      <div class="mission-header">
        <div class="mission-title-group">
          <span class="mission-subtitle">${dayData.subtitle}</span>
          <h2>Dia ${dayData.day}: ${dayData.title}</h2>
        </div>
        <div class="mission-xp-badge">+${dayData.xp} XP</div>
      </div>

      <div class="mission-section">
        <h3 class="section-title">📖 Teoria & Conceito</h3>
        <div class="theory-box">
          <p>${dayData.theory}</p>
        </div>
      </div>
    `;

    // Tasks section
    if (dayData.tasks && dayData.tasks.length > 0) {
      const dayProgress = this.state.taskProgress[dayData.day] || [];

      html += `
        <div class="mission-section">
          <h3 class="section-title">🛠️ Tarefas Práticas Recomendadas</h3>
          <ul class="tasks-list">
      `;

      dayData.tasks.forEach((taskText, idx) => {
        const isChecked = dayProgress.includes(idx);
        html += `
          <li class="task-item ${isChecked ? 'checked' : ''}" onclick="app.toggleTask(${dayData.day}, ${idx})">
            <div class="task-checkbox"></div>
            <span>${taskText}</span>
          </li>
        `;
      });

      html += `</ul></div>`;
    }

    // Minigame vs Quiz
    if (dayData.isMinigame) {
      html += `
        <div class="mission-section">
          <h3 class="section-title">🎮 Mini-jogo do Dia</h3>
          <div id="minigame-area" class="minigame-container">
            ${this.getMinigameHTML(dayData.minigameType)}
          </div>
        </div>
      `;
    } else if (dayData.quiz) {
      const quizAns = this.state.quizAnswers[dayData.day];
      html += `
        <div class="mission-section">
          <h3 class="section-title">❓ Quiz de Conhecimento</h3>
          <div class="quiz-box">
            <div class="quiz-question">${dayData.quiz.question}</div>
            <div class="quiz-options">
      `;

      dayData.quiz.options.forEach((optText, optIdx) => {
        let extraClass = '';
        if (quizAns) {
          if (optIdx === dayData.quiz.correct) extraClass = 'correct';
          else if (quizAns.optionIndex === optIdx) extraClass = 'wrong';
        }

        html += `
          <button class="quiz-option-btn ${extraClass}" 
                  ${quizAns ? 'disabled' : ''} 
                  onclick="app.answerQuiz(${dayData.day}, ${optIdx})">
            ${optText}
          </button>
        `;
      });

      html += `
            </div>
            <div class="quiz-explanation ${quizAns ? 'visible' : ''}">
              <strong>Explicação:</strong> ${dayData.quiz.explanation}
            </div>
          </div>
        </div>
      `;
    }

    // Complete Day Action Button
    html += `
      <div style="margin-top: 10px; display: flex; justify-content: flex-end;">
        <button class="btn-primary" ${isCompleted ? 'disabled' : ''} onclick="app.completeDay(${dayData.day})">
          ${isCompleted ? '✓ Missão Concluída' : 'Concluir Missão do Dia (+XP)'}
        </button>
      </div>
    `;

    missionCard.innerHTML = html;

    // Attach Minigame listeners if active
    if (dayData.isMinigame) {
      this.attachMinigameEvents(dayData.minigameType);
    }
  }

  toggleTask(dayNum, taskIdx) {
    sounds.playClick();
    if (!this.state.taskProgress[dayNum]) {
      this.state.taskProgress[dayNum] = [];
    }
    const list = this.state.taskProgress[dayNum];
    const index = list.indexOf(taskIdx);
    if (index > -1) {
      list.splice(index, 1);
    } else {
      list.push(taskIdx);
    }
    this.saveState();
    this.renderCurrentMission();
  }

  answerQuiz(dayNum, optionIdx) {
    const dayData = this.getCurrentDayData();
    if (!dayData.quiz) return;

    const isCorrect = (optionIdx === dayData.quiz.correct);
    if (isCorrect) {
      sounds.playCorrect();
      this.addXp(30);
    } else {
      sounds.playWrong();
    }

    this.state.quizAnswers[dayNum] = { optionIndex: optionIdx, isCorrect };
    this.saveState();
    this.renderCurrentMission();
  }

  completeDay(dayNum) {
    if (!this.state.completedDays.includes(dayNum)) {
      sounds.playLevelUp();
      this.state.completedDays.push(dayNum);

      const dayData = this.getCurrentDayData();
      this.addXp(dayData.xp);

      if (dayNum === 7) this.unlockAchievement('bug_hunter_s1');
      if (dayNum === 14) this.unlockAchievement('bug_report_pro');
      if (dayNum === 21) this.unlockAchievement('api_master');
      if (dayNum === 23) this.unlockAchievement('git_ninja');
      if (dayNum === 30) {
        this.unlockAchievement('qa_hero');
        this.openCertificateModal();
      }

      this.saveState();
      this.renderAll();
    }
  }

  renderBadgesWidget() {
    const container = document.getElementById('sidebar-badges-grid');
    if (!container) return;
    container.innerHTML = '';

    GAME_DATA.achievements.forEach(badge => {
      const isUnlocked = this.state.unlockedAchievements.includes(badge.id);
      const div = document.createElement('div');
      div.className = `badge-item ${isUnlocked ? 'unlocked' : ''}`;
      div.title = `${badge.title}: ${badge.desc}`;
      div.innerHTML = badge.icon;
      div.addEventListener('click', () => {
        sounds.playClick();
        alert(`🏆 ${badge.title}\n\n${badge.desc}\n\nRecompensa: +${badge.xp} XP\nStatus: ${isUnlocked ? 'Desbloqueado ✓' : 'Bloqueado 🔒'}`);
      });
      container.appendChild(div);
    });
  }

  openAchievementsModal() {
    const modal = document.getElementById('achievements-modal');
    if (!modal) return;

    const list = document.getElementById('modal-achievements-list');
    list.innerHTML = '';

    GAME_DATA.achievements.forEach(badge => {
      const isUnlocked = this.state.unlockedAchievements.includes(badge.id);
      const item = document.createElement('div');
      item.style.cssText = `
        display: flex; align-items: center; gap: 16px; padding: 12px;
        background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border);
        border-radius: var(--radius-md); opacity: ${isUnlocked ? '1' : '0.5'};
      `;
      item.innerHTML = `
        <div style="font-size: 2rem;">${badge.icon}</div>
        <div style="flex: 1;">
          <h4 style="font-weight: 700; color: ${isUnlocked ? 'var(--accent)' : 'var(--text-main)'};">${badge.title}</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted);">${badge.desc}</p>
        </div>
        <div style="font-weight: 800; color: var(--warning);">+${badge.xp} XP</div>
      `;
      list.appendChild(item);
    });

    modal.classList.add('active');
  }

  openCertificateModal() {
    const modal = document.getElementById('certificate-modal');
    if (!modal) return;
    document.getElementById('cert-player-name').textContent = this.state.playerName;
    document.getElementById('cert-date').textContent = new Date().toLocaleDateString('pt-BR');
    modal.classList.add('active');
  }

  /* ==========================================================================
     MINI-GAMES LOGIC
     ========================================================================== */

  getMinigameHTML(type) {
    if (type === 'bug_hunt') {
      return `
        <p>Encontre os 3 defeitos na loja online abaixo clicando sobre o erro:</p>
        <div class="fake-ecommerce">
          <div class="fake-header">
            <span class="fake-logo">🛍️ QA Store</span>
            <span>Carrinho: 1 item</span>
          </div>
          <div class="fake-products">
            <div class="fake-product-card">
              <div class="fake-product-img">🎧</div>
              <div class="fake-product-title">Headset Gamer Pro</div>
              <div class="fake-product-price">R$ 250,00</div>
              <button id="bug1-btn" class="bug-clickable" style="padding: 6px; background: #94a3b8; color: #fff; border:none; border-radius:4px;" disabled>
                Comprar (Botão Travado)
              </button>
            </div>
            <div class="fake-product-card">
              <div class="fake-product-img">🖱️</div>
              <div class="fake-product-title">Mouse Óptico RGB</div>
              <div id="bug2-price" class="fake-product-price bug-clickable">R$ -50,00 (Preço Negativo)</div>
              <button style="padding: 6px; background: #4f46e5; color: #fff; border:none; border-radius:4px;">Comprar</button>
            </div>
          </div>
          <div style="border-top: 1px solid #cbd5e1; padding-top: 10px; display:flex; justify-content:space-between; align-items:center;">
            <span>Quantidade de Itens:</span>
            <input id="bug3-input" type="number" value="-5" class="bug-clickable" style="width: 60px; padding: 4px;" />
          </div>
        </div>
        <div id="bug-hunt-counter" style="font-weight: 800; color: var(--accent);">Bugs Encontrados: 0 / 3</div>
      `;
    }

    if (type === 'bug_report') {
      return `
        <p>Classifique e Monte o Bug Report para o erro: <em>"Usuário clica em Finalizar Compra e a tela fica branca sem resposta."</em></p>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div>
            <label style="font-size: 0.85rem; font-weight:700;">Severidade (Impacto Técnico):</label>
            <select id="br-sev" style="width: 100%; padding: 8px; border-radius:6px; background:var(--bg-dark); color:#fff; border:1px solid var(--glass-border);">
              <option value="Baixa">Baixa (Estética)</option>
              <option value="Média">Média (Contornável)</option>
              <option value="Alta">Alta (Bloqueia Funcionalidade Principal)</option>
            </select>
          </div>
          <div>
            <label style="font-size: 0.85rem; font-weight:700;">Prioridade (Urgência de Negócio):</label>
            <select id="br-prio" style="width: 100%; padding: 8px; border-radius:6px; background:var(--bg-dark); color:#fff; border:1px solid var(--glass-border);">
              <option value="Baixa">Baixa (Pode esperar próxima release)</option>
              <option value="Alta">Alta (Corrigir imediatamente)</option>
            </select>
          </div>
          <button id="br-submit-btn" class="btn-primary" style="margin-top: 8px;">Enviar Bug Report</button>
          <div id="br-result" style="font-weight:700;"></div>
        </div>
      `;
    }

    if (type === 'postman') {
      return `
        <p>Execute requisições HTTP simuladas na API:</p>
        <div class="postman-sim">
          <div class="postman-bar">
            <select id="pm-method" class="postman-method">
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="DELETE">DELETE</option>
            </select>
            <input id="pm-url" type="text" class="postman-url" value="https://api.qaquest.io/v1/users" readonly />
            <button id="pm-send-btn" class="postman-send-btn">SEND 🚀</button>
          </div>
          <div id="pm-screen" class="postman-response-screen">Clique em SEND para testar a requisição...</div>
        </div>
      `;
    }

    if (type === 'final_project') {
      return `
        <div style="text-align: center; display: flex; flex-direction: column; gap: 16px;">
          <div style="font-size: 3rem;">🏆</div>
          <h3>Parabéns pela Jornada!</h3>
          <p>Você completou todos os módulos de estudo de QA. Clique abaixo para gerar seu Certificado oficial de Conclusão de 30 Dias!</p>
          <button class="btn-primary" onclick="app.openCertificateModal()">🎓 Visualizar Meu Certificado</button>
        </div>
      `;
    }

    return '';
  }

  attachMinigameEvents(type) {
    if (type === 'bug_hunt') {
      const updateCounter = () => {
        const found = this.minigameState.bugsFound.filter(Boolean).length;
        document.getElementById('bug-hunt-counter').textContent = `Bugs Encontrados: ${found} / 3`;
        if (found === 3) {
          sounds.playBadge();
          alert("🎉 Parabéns! Você encontrou os 3 bugs na interface!");
          this.completeDay(7);
        }
      };

      document.getElementById('bug1-btn')?.addEventListener('click', () => {
        sounds.playCorrect();
        this.minigameState.bugsFound[0] = true;
        alert("🐞 Bug #1 Encontrado: Botão de comprar desabilitado incorretamente!");
        updateCounter();
      });

      document.getElementById('bug2-price')?.addEventListener('click', () => {
        sounds.playCorrect();
        this.minigameState.bugsFound[1] = true;
        alert("🐞 Bug #2 Encontrado: Preço negativo no produto!");
        updateCounter();
      });

      document.getElementById('bug3-input')?.addEventListener('click', () => {
        sounds.playCorrect();
        this.minigameState.bugsFound[2] = true;
        alert("🐞 Bug #3 Encontrado: Quantidade permitindo valor negativo!");
        updateCounter();
      });
    }

    if (type === 'bug_report') {
      document.getElementById('br-submit-btn')?.addEventListener('click', () => {
        const sev = document.getElementById('br-sev').value;
        const prio = document.getElementById('br-prio').value;

        if (sev === 'Alta' && prio === 'Alta') {
          sounds.playCorrect();
          document.getElementById('br-result').innerHTML = '<span style="color: var(--accent);">✓ Excelente! Bug gravíssimo com impacto de tela branca possui Severidade Alta e Prioridade Alta!</span>';
          this.completeDay(14);
        } else {
          sounds.playWrong();
          document.getElementById('br-result').innerHTML = '<span style="color: var(--danger);">✖ Incorreto. Uma tela branca ao finalizar a compra impede a receita da empresa (Severidade Alta + Prioridade Alta). Tente novamente!</span>';
        }
      });
    }

    if (type === 'postman') {
      document.getElementById('pm-send-btn')?.addEventListener('click', () => {
        sounds.playClick();
        const method = document.getElementById('pm-method').value;
        const screen = document.getElementById('pm-screen');

        if (method === 'GET') {
          screen.textContent = `Status: 200 OK\nTime: 45ms\nBody:\n[\n  { "id": 1, "name": "Ana QA", "role": "Tester" },\n  { "id": 2, "name": "Carlos Dev", "role": "Developer" }\n]`;
        } else if (method === 'POST') {
          screen.textContent = `Status: 201 Created\nTime: 82ms\nBody:\n{\n  "id": 3,\n  "name": "Novo Usuario",\n  "createdAt": "${new Date().toISOString()}"\n}`;
        } else if (method === 'DELETE') {
          screen.textContent = `Status: 204 No Content\nTime: 38ms\nBody: (Empty)`;
        }

        this.minigameState.postmanRequests += 1;
        if (this.minigameState.postmanRequests >= 3) {
          this.completeDay(21);
        }
      });
    }
  }
}

// Instanciar App Global de forma infalível
let app;
function startQAQuest() {
  if (!app) {
    app = new QAQuestApp();
  }
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', startQAQuest);
} else {
  startQAQuest();
}

