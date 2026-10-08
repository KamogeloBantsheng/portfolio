/**
 * ==========================================================================
 * VIBE-CODED PORTFOLIO CLIENT ENGINE
 * Developer: Kamogelo Bantsheng (Applications Developer)
 * Features:
 *   1. Dynamic Typing Engine
 *   2. Responsive Mobile Navigation & Active ScrollSpy
 *   3. Interactive Skills Filter Engine
 *   4. Developer CLI Terminal Simulator
 *   5. 1-Click Clipboard Utilities & Toast Notifications
 *   6. Curriculum Vitae Modal & Print Engine
 *   7. Direct Contact Form Handler
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. Dynamic Typing Animation for Roles
     -------------------------------------------------------------------------- */
  const dynamicRoleElem = document.getElementById('dynamicRole');
  if (dynamicRoleElem) {
    const roles = [
      'Applications Development',
      'Python & Java Systems',
      'Full-Stack Architecture',
      'Sol Plaatje University ICT Graduate',
      'Problem Solver & Builder'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    function typeRole() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        dynamicRoleElem.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 45;
      } else {
        dynamicRoleElem.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 90;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        typingSpeed = 2000; // Pause at end of word
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400; // Pause before typing new word
      }

      setTimeout(typeRole, typingSpeed);
    }

    setTimeout(typeRole, 500);
  }

  /* --------------------------------------------------------------------------
     2. Mobile Navigation & ScrollSpy
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
     3. Skills Filter Engine
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
     4. Interactive Terminal Engine (Developer CLI)
     -------------------------------------------------------------------------- */
  const terminalForm = document.getElementById('terminalForm');
  const terminalInput = document.getElementById('terminalInput');
  const terminalOutput = document.getElementById('terminalOutput');
  const clearTerminalBtn = document.getElementById('clearTerminalBtn');
  const termChips = document.querySelectorAll('.term-chip');

  const commandResponses = {
    help: `Available commands:
  • <span class="highlight-cmd">bio</span>        : Learn about Kamogelo's journey & focus
  • <span class="highlight-cmd">skills</span>     : Display technical stack
  • <span class="highlight-cmd">education</span>  : SPU qualifications & academic performance
  • <span class="highlight-cmd">projects</span>   : Active & flagship engineering projects
  • <span class="highlight-cmd">recruiters</span> : Fast-track information for hiring teams
  • <span class="highlight-cmd">contact</span>    : Direct channels (email, phone, LinkedIn)
  • <span class="highlight-cmd">clear</span>      : Clear the terminal console`,

    bio: `Kamogelo Bantsheng:
  • Applications Development Graduate from Sol Plaatje University (SPU)
  • Focus: Clean Software Design, Object-Oriented Architecture, Relational Databases
  • Work Ethic: High learning velocity, analytical discipline, continuous growth
  • Creed: "The best time to start was yesterday. The next best time is now."`,

    skills: `Technical Competencies:
  • Languages: Python, Java, JavaScript (ES6+), Visual Basic
  • Web: HTML5, CSS3, React, Component UI, Responsive Design
  • Databases: MySQL, Relational Schema Normalization, Query Optimization
  • Tools: Git, GitHub, VS Code, Figma, Agile Practices`,

    education: `Academic Credentials:
  • Advanced Diploma in ICT (Applications Development) — In Progress (Completing 2026), SPU
  • National Diploma in ICT (Applications Development) — Completed (2023 - 2025), SPU
  • Academic Record: Multiple distinctions, consistently 70%+ across programming modules`,

    projects: `Engineering Projects:
  1. Personal Developer Portfolio & CLI Platform (Production Live on GitHub Pages)
  2. Flagship Applications Development Project (In Active Architecture & Development)`,

    recruiters: `Recruiter Snapshot (South Africa):
  • Unemployed South African graduate with <2 years formal experience
  • Eligible for Graduate Development Programmes & Internships
  • Availability: From February 2027 (or immediate intake)
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
      appendTerminalLine(`Permission granted: Root developer access active.`, 'system-msg');
    } else if (cmd === 'date') {
      appendTerminalLine(`System Date: ${new Date().toUTCString()}`, 'system-msg');
    } else {
      appendTerminalLine(`Command not found: "${cmd}". Type <span class="highlight-cmd">'help'</span> for list of commands.`, 'system-msg');
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
      terminalOutput.innerHTML = '<div class="terminal-line system-msg">Console cleared. Type <span class="highlight-cmd">\'help\'</span> for commands.</div>';
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
     5. Copy Utilities & Toast Notifications
     -------------------------------------------------------------------------- */
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const toastNotification = document.getElementById('toastNotification');

  function showToast(message) {
    if (!toastNotification) return;
    toastNotification.textContent = message;
    toastNotification.classList.add('show');
    setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 2800);
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'kamogelobantsheng@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        copyEmailBtn.classList.add('copied');
        copyEmailBtn.querySelector('.copy-text').textContent = 'Copied!';
        showToast('Email copied: ' + email);

        setTimeout(() => {
          copyEmailBtn.classList.remove('copied');
          copyEmailBtn.querySelector('.copy-text').textContent = 'Copy';
        }, 2200);
      }).catch(() => {
        showToast('Direct email: kamogelobantsheng@gmail.com');
      });
    });
  }

  /* --------------------------------------------------------------------------
     6. CV Modal & Print Handler
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

  window.addEventListener('click', (e) => {
    if (e.target === cvModal) toggleModal(cvModal, false);
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      toggleModal(cvModal, false);
    }
  });

  /* --------------------------------------------------------------------------
     7. Contact Form Handler (Direct Mailto Link)
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

      const emailRecipient = 'kamogelobantsheng@gmail.com';
      const mailtoSubject = encodeURIComponent(`[Portfolio Inquiry] ${subject} - ${name}`);
      const mailtoBody = encodeURIComponent(
        `Hi Kamogelo,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`
      );

      const mailtoUrl = `mailto:${emailRecipient}?subject=${mailtoSubject}&body=${mailtoBody}`;

      if (formSuccessAlert) {
        formSuccessAlert.style.display = 'block';
      }

      showToast('Opening default email client...');
      window.location.href = mailtoUrl;

      contactForm.reset();
    });
  }

  /* --------------------------------------------------------------------------
     8. Dynamic Current Year
     -------------------------------------------------------------------------- */
  const currentYearElem = document.getElementById('currentYear');
  if (currentYearElem) {
    currentYearElem.textContent = new Date().getFullYear();
  }

});
