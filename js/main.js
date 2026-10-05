/**
 * ==========================================================================
 * PORTFOLIO CLIENT-SIDE INTERACTIVITY ENGINE
 * Developer: Kamogelo Bantsheng (Applications Developer)
 * Features:
 *   1. Dynamic Typing Animation
 *   2. Dark/Light Theme Engine with LocalStorage persistence
 *   3. Responsive Mobile Menu & Active ScrollSpy Navigation
 *   4. Interactive Skills Filtering Tabs
 *   5. Interactive Dev Terminal (Simulated CLI)
 *   6. 1-Click Clipboard Utilities & Toast Notifications
 *   7. Interactive CV Viewer & PDF Print Engine
 *   8. Project Architecture Blueprint Modal Injections
 *   9. Direct Contact Form Mailto Handler
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. Theme Engine (Dark & Light Mode)
     -------------------------------------------------------------------------- */
  const themeToggle = document.getElementById('themeToggle');
  const htmlElement = document.documentElement;

  // Retrieve stored theme or honor system preference
  const savedTheme = localStorage.getItem('kb_portfolio_theme') || 
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

  htmlElement.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      htmlElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('kb_portfolio_theme', nextTheme);
      showToast(`Switched to ${nextTheme} theme`);
    });
  }

  /* --------------------------------------------------------------------------
     2. Dynamic Typing Animation for Roles
     -------------------------------------------------------------------------- */
  const dynamicRoleElem = document.getElementById('dynamicRole');
  if (dynamicRoleElem) {
    const roles = [
      'Applications Developer',
      'SPU ICT Graduate',
      'Python & Java Programmer',
      'Future Tech Leader',
      'Problem Solver & Builder'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeRole() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        dynamicRoleElem.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        dynamicRoleElem.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        typingSpeed = 1800; // Pause at end of word
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400; // Pause before typing new word
      }

      setTimeout(typeRole, typingSpeed);
    }

    setTimeout(typeRole, 600);
  }

  /* --------------------------------------------------------------------------
     3. Mobile Navigation & ScrollSpy
     -------------------------------------------------------------------------- */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-open');
        mobileMenuBtn.setAttribute('aria-expanded', false);
      });
    });
  }

  // ScrollSpy Active Link Tracking
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollPosition = window.pageYOffset + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  /* --------------------------------------------------------------------------
     4. Skills Filter Engine
     -------------------------------------------------------------------------- */
  const filterTabs = document.querySelectorAll('.filter-tab');
  const skillCards = document.querySelectorAll('.skill-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterVal = tab.getAttribute('data-filter');

      skillCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filterVal === 'all' || categories.includes(filterVal)) {
          card.classList.remove('is-hidden');
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });

  /* --------------------------------------------------------------------------
     5. Interactive Terminal Engine (Simulated Dev CLI)
     -------------------------------------------------------------------------- */
  const terminalForm = document.getElementById('terminalForm');
  const terminalInput = document.getElementById('terminalInput');
  const terminalOutput = document.getElementById('terminalOutput');
  const clearTerminalBtn = document.getElementById('clearTerminalBtn');
  const termChips = document.querySelectorAll('.term-chip');

  const commandResponses = {
    help: `Available commands:
  • <span class="highlight-cmd">bio</span>        : Learn about Kamogelo's journey & focus
  • <span class="highlight-cmd">skills</span>     : Display technical competencies
  • <span class="highlight-cmd">education</span>  : Sol Plaatje University qualifications
  • <span class="highlight-cmd">projects</span>   : Active labs & upcoming repositories
  • <span class="highlight-cmd">recruiters</span> : Fast-track information for hiring teams
  • <span class="highlight-cmd">contact</span>    : Direct email, phone, and LinkedIn
  • <span class="highlight-cmd">clear</span>      : Clear the console window`,

    bio: `Kamogelo Bantsheng:
  • Purpose-driven ICT Graduate from Sol Plaatje University (SPU)
  • Specializing in Applications Development, Object-Oriented Design, and Relational Systems
  • Mindset: Problem solver, high learning velocity, and committed mentor
  • Motto: "The best time to start was yesterday. The next best time is now."`,

    skills: `Technical Stack:
  • Languages: Python, Java, JavaScript (ES6+), Visual Basic
  • Web: HTML5, CSS3, React, Responsive Layouts, UI Components
  • Databases: MySQL, Relational Database Normalization, SQL
  • Tooling: Git, GitHub, VS Code, Figma, Agile Practices`,

    education: `Academic Credentials:
  • Advanced Diploma in ICT (Applications Development) — In Progress (Completing 2026), Sol Plaatje University
  • National Diploma in ICT (Applications Development) — Completed (2023 - 2025), Sol Plaatje University
  • Distinction track: Scored 70%+ consistently across software and database modules`,

    projects: `Active Labs & Roadmap:
  1. Personal Digital Portfolio & Interactive CV (Live & GitHub Pages Ready)
  2. CampusSync: University Student Academic Manager (In Development • React/MySQL)
  3. Socio-Economic Data Explorer (Active Lab • Python/Pandas)
  4. Enterprise Commerce & Inventory API (Architecture Stage • Java/MySQL)`,

    recruiters: `Recruitment Eligibility (South Africa):
  • Unemployed South African graduate with <2 years formal experience
  • Eligible for Graduate Development Programmes & Internships
  • Availability: Ready for start from February 2027 (or immediate intake)
  • Location: Kimberley, Northern Cape (Open to Relocation / Remote Work)`,

    contact: `Direct Contact Channels:
  • Email: <a href="mailto:kamogelobantsheng@gmail.com" class="highlight-cmd">kamogelobantsheng@gmail.com</a>
  • Phone / WhatsApp: <a href="tel:+27730045462" class="highlight-cmd">+27 73 004 5462</a>
  • LinkedIn: linkedin.com/in/kamogelo-bantsheng-676451348
  • GitHub: github.com/KamogeloBantsheng`
  };

  function executeTerminalCommand(cmdRaw) {
    const cmd = cmdRaw.trim().toLowerCase();
    if (!cmd) return;

    // Echo user input
    appendTerminalLine(`kamogelo@spu:~$ ${cmdRaw}`, 'user-cmd');

    if (cmd === 'clear') {
      terminalOutput.innerHTML = '';
      return;
    }

    if (commandResponses[cmd]) {
      appendTerminalLine(commandResponses[cmd], 'system-msg');
    } else if (cmd === 'sudo') {
      appendTerminalLine(`Permission denied: Kamogelo is already in full control! 🚀`, 'system-msg');
    } else if (cmd === 'date') {
      appendTerminalLine(`Current System Time: ${new Date().toLocaleString()}`, 'system-msg');
    } else {
      appendTerminalLine(`Command not found: "${cmd}". Type <span class="highlight-cmd">'help'</span> for available commands.`, 'system-msg');
    }

    // Scroll to bottom
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  function appendTerminalLine(content, className = '') {
    const line = document.createElement('div');
    line.className = `terminal-line ${className}`;
    line.innerHTML = content;
    terminalOutput.appendChild(line);
  }

  if (terminalForm && terminalInput) {
    terminalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = terminalInput.value;
      executeTerminalCommand(val);
      terminalInput.value = '';
    });
  }

  if (clearTerminalBtn) {
    clearTerminalBtn.addEventListener('click', () => {
      terminalOutput.innerHTML = '<div class="terminal-line system-msg">Terminal cleared. Type <span class="highlight-cmd">\'help\'</span> for commands.</div>';
    });
  }

  termChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (terminalInput) terminalInput.value = cmd;
      executeTerminalCommand(cmd);
    });
  });

  /* --------------------------------------------------------------------------
     6. Copy Utilities & Toast Notifications
     -------------------------------------------------------------------------- */
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const toastNotification = document.getElementById('toastNotification');

  function showToast(message) {
    if (!toastNotification) return;
    toastNotification.textContent = message;
    toastNotification.classList.add('show');
    setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 3000);
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'kamogelobantsheng@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        copyEmailBtn.classList.add('copied');
        copyEmailBtn.querySelector('.copy-text').textContent = 'Copied!';
        showToast('Email address copied to clipboard: ' + email);

        setTimeout(() => {
          copyEmailBtn.classList.remove('copied');
          copyEmailBtn.querySelector('.copy-text').textContent = 'Copy';
        }, 2500);
      }).catch(() => {
        showToast('Direct email: kamogelobantsheng@gmail.com');
      });
    });
  }

  /* --------------------------------------------------------------------------
     7. CV Modal & Print Handler
     -------------------------------------------------------------------------- */
  const cvModal = document.getElementById('cvModal');
  const openCvBtn = document.getElementById('openCvBtn');
  const closeCvBtn = document.getElementById('closeCvBtn');
  const closeCvFooterBtn = document.getElementById('closeCvFooterBtn');
  const printCvBtn = document.getElementById('printCvBtn');

  function toggleModal(modal, show) {
    if (!modal) return;
    if (show) {
      modal.classList.add('is-active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    } else {
      modal.classList.remove('is-active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (openCvBtn && cvModal) {
    openCvBtn.addEventListener('click', () => toggleModal(cvModal, true));
  }
  if (closeCvBtn && cvModal) {
    closeCvBtn.addEventListener('click', () => toggleModal(cvModal, false));
  }
  if (closeCvFooterBtn && cvModal) {
    closeCvFooterBtn.addEventListener('click', () => toggleModal(cvModal, false));
  }
  if (printCvBtn) {
    printCvBtn.addEventListener('click', () => {
      window.print();
    });
  }

  /* --------------------------------------------------------------------------
     8. Project Architecture Modal Engine
     -------------------------------------------------------------------------- */
  const projectModal = document.getElementById('projectModal');
  const projectModalTitle = document.getElementById('projectModalTitle');
  const projectModalBody = document.getElementById('projectModalBody');
  const closeProjectModalBtn = document.getElementById('closeProjectModalBtn');
  const closeProjectFooterBtn = document.getElementById('closeProjectFooterBtn');
  const openProjectButtons = document.querySelectorAll('.open-project-modal');

  const projectSpecs = {
    campussync: {
      title: 'CampusSync • University Academic Organizer Architecture',
      html: `
        <div style="line-height: 1.65; color: var(--text-secondary);">
          <h4 style="color: var(--text-primary); margin-bottom: 0.5rem; font-family: var(--font-display);">System Problem Statement</h4>
          <p style="margin-bottom: 1rem;">
            Sol Plaatje University students often juggle multiple modular assignments, group meetings, and continuous assessment tests with disparate notification mechanisms. CampusSync is architected as an all-in-one student productivity workspace.
          </p>
          <h4 style="color: var(--text-primary); margin-bottom: 0.5rem; font-family: var(--font-display);">Planned Architectural Stack</h4>
          <ul style="margin-left: 1.25rem; margin-bottom: 1rem; list-style: disc;">
            <li><strong>Frontend:</strong> React, Component-based state with hooks, responsive CSS Grid</li>
            <li><strong>Backend API:</strong> Python FastAPI / Node.js lightweight REST endpoints</li>
            <li><strong>Database:</strong> MySQL relational database structured in Third Normal Form (3NF)</li>
            <li><strong>Prototyping:</strong> Figma UI wireframes with mobile accessibility standards</li>
          </ul>
          <h4 style="color: var(--text-primary); margin-bottom: 0.5rem; font-family: var(--font-display);">Key Database Entities</h4>
          <p style="font-family: var(--font-mono); font-size: 0.85rem; background: var(--terminal-bg); padding: 0.75rem; border-radius: 8px; color: #38bdf8;">
            Users(id, student_no, email, password_hash) <br>
            Modules(id, module_code, module_name, credits) <br>
            Assessments(id, module_id, title, due_date, weight_pct, completed) <br>
            TeamCollaboration(id, assessment_id, user_id, role)
          </p>
        </div>
      `
    },
    dataexplorer: {
      title: 'Socio-Economic Data Explorer • Research Scope',
      html: `
        <div style="line-height: 1.65; color: var(--text-secondary);">
          <h4 style="color: var(--text-primary); margin-bottom: 0.5rem; font-family: var(--font-display);">Analytical Objective</h4>
          <p style="margin-bottom: 1rem;">
            Investigating public educational and youth employment indicators in South Africa. The lab demonstrates Python data science pipelines, data hygiene techniques, and statistical visualization.
          </p>
          <h4 style="color: var(--text-primary); margin-bottom: 0.5rem; font-family: var(--font-display);">Data Pipeline Phases</h4>
          <ol style="margin-left: 1.25rem; margin-bottom: 1rem;">
            <li><strong>Extraction:</strong> Ingesting CSV/JSON statistics from open datasets (Stats SA / data portals)</li>
            <li><strong>Cleansing:</strong> Imputing missing metrics, detecting outliers, normalizing timestamps</li>
            <li><strong>Transformation:</strong> Grouping by provinces (e.g. Northern Cape) and computing year-over-year growth</li>
            <li><strong>Visualization:</strong> Matplotlib and Seaborn interactive heatmaps and trend lines</li>
          </ol>
          <h4 style="color: var(--text-primary); margin-bottom: 0.5rem; font-family: var(--font-display);">Key Skills Demonstrated</h4>
          <p>Pandas DataFrame manipulation, vectorization, statistical correlations, and communicating technical findings clearly.</p>
        </div>
      `
    },
    inventoryapi: {
      title: 'Secure Commerce & Inventory API • Blueprint',
      html: `
        <div style="line-height: 1.65; color: var(--text-secondary);">
          <h4 style="color: var(--text-primary); margin-bottom: 0.5rem; font-family: var(--font-display);">Architecture Principles</h4>
          <p style="margin-bottom: 1rem;">
            An enterprise-grade Java back-end demonstrating Object-Oriented principles, SOLID design, and data transaction integrity (ACID guarantees).
          </p>
          <h4 style="color: var(--text-primary); margin-bottom: 0.5rem; font-family: var(--font-display);">Component Hierarchy</h4>
          <ul style="margin-left: 1.25rem; margin-bottom: 1rem; list-style: disc;">
            <li><strong>Controller Layer:</strong> Handles HTTP request validation and status response codes</li>
            <li><strong>Service Layer:</strong> Encapsulates business logic, inventory thresholds, and discounts</li>
            <li><strong>DAO / Repository:</strong> JDBC / JPA abstraction with parameterized queries against SQL injection</li>
            <li><strong>Exception Handling:</strong> Centralized error handling with structured JSON payloads</li>
          </ul>
        </div>
      `
    }
  };

  openProjectButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const projKey = btn.getAttribute('data-project');
      const spec = projectSpecs[projKey];
      if (spec && projectModal) {
        projectModalTitle.textContent = spec.title;
        projectModalBody.innerHTML = spec.html;
        toggleModal(projectModal, true);
      }
    });
  });

  if (closeProjectModalBtn && projectModal) {
    closeProjectModalBtn.addEventListener('click', () => toggleModal(projectModal, false));
  }
  if (closeProjectFooterBtn && projectModal) {
    closeProjectFooterBtn.addEventListener('click', () => toggleModal(projectModal, false));
  }

  // Backdrop click to close modals
  window.addEventListener('click', (e) => {
    if (e.target === cvModal) toggleModal(cvModal, false);
    if (e.target === projectModal) toggleModal(projectModal, false);
  });

  // ESC key to close modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      toggleModal(cvModal, false);
      toggleModal(projectModal, false);
    }
  });

  /* --------------------------------------------------------------------------
     9. Contact Form Handler (Direct Mailto Link)
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  const formSuccessAlert = document.getElementById('formSuccessAlert');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('senderName').value;
      const email = document.getElementById('senderEmail').value;
      const subject = document.getElementById('senderSubject').value;
      const message = document.getElementById('senderMessage').value;

      // Construct mailto link
      const emailRecipient = 'kamogelobantsheng@gmail.com';
      const mailtoSubject = encodeURIComponent(`[Portfolio Inquiry] ${subject} - ${name}`);
      const mailtoBody = encodeURIComponent(
        `Hi Kamogelo,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`
      );

      const mailtoUrl = `mailto:${emailRecipient}?subject=${mailtoSubject}&body=${mailtoBody}`;

      // Show friendly confirmation
      if (formSuccessAlert) {
        formSuccessAlert.style.display = 'block';
      }

      showToast('Opening default email client...');
      window.location.href = mailtoUrl;

      // Reset form
      contactForm.reset();
    });
  }

  /* --------------------------------------------------------------------------
     10. Dynamic Current Year
     -------------------------------------------------------------------------- */
  const currentYearElem = document.getElementById('currentYear');
  if (currentYearElem) {
    currentYearElem.textContent = new Date().getFullYear();
  }

});
