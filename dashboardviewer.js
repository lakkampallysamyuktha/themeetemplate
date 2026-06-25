// dashboardviewer.js — Orange / Black / White Theme

(function() {
  'use strict';

  // ── User from localStorage ──
  const user = JSON.parse(localStorage.getItem('its_user') || '{}');
  const username = user.username || 'Viewer';
  const email = user.email || 'viewer@stackly.org';
  const initials = username.charAt(0).toUpperCase();

  document.getElementById('userName').textContent = username;
  document.getElementById('userEmail').textContent = email;
  document.getElementById('greetName').textContent = `Hello, ${username}!`;
  document.getElementById('greetEmail').textContent = `${email} · Viewer`;
  document.getElementById('userAvatar').textContent = initials;
  document.getElementById('profileAvatar').textContent = initials;
  document.getElementById('profileName').textContent = username;
  document.getElementById('profileEmail').textContent = email;

  // ── Navigation ──
  const navItems = document.querySelectorAll('.nav-item');
  const pages = document.querySelectorAll('.page');
  const pageTitle = document.getElementById('pageTitle');
  const titles = {
    overview: 'Overview',
    energy: 'System Status',
    sites: 'Global Network',
    reports: 'Reports',
    gallery: 'Gallery',
    news: 'News',
    learn: 'Learn',
    profile: 'My Profile',
    settings: 'Settings'
  };

  navItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      const target = this.dataset.page;

      navItems.forEach(n => n.classList.remove('active'));
      this.classList.add('active');

      pages.forEach(p => p.classList.remove('active'));
      const pg = document.getElementById('page-' + target);
      if (pg) pg.classList.add('active');

      pageTitle.textContent = titles[target] || target;

      if (window.innerWidth <= 768) closeSidebar();
    });
  });

  // ── Mobile Sidebar ──
  const sidebar = document.getElementById('sidebar');
  const hamburger = document.getElementById('hamburger');
  const overlay = document.getElementById('overlay');
  const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');

  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (hamburger) {
      hamburger.classList.add('open');
      const icon = hamburger.querySelector('i');
      if (icon) icon.className = 'ph ph-x';
    }
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    if (hamburger) {
      hamburger.classList.remove('open');
      const icon = hamburger.querySelector('i');
      if (icon) icon.className = 'ph ph-list';
    }
  }

  hamburger?.addEventListener('click', () => {
    sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
  });

  overlay?.addEventListener('click', closeSidebar);
  sidebarCloseBtn?.addEventListener('click', closeSidebar);

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && sidebar.classList.contains('open')) closeSidebar();
  });

  // ── Live System Feed ──
  const feedData = [
    { name: 'US-East Datacenter', val: 'Latency normal', on: true },
    { name: 'EU-West Datacenter', val: 'Traffic steady', on: true },
    { name: 'US-West Datacenter', val: 'Cache sync complete', on: true },
    { name: 'EU-Central Datacenter', val: 'Patching scheduled', on: true },
    { name: 'AP-South Datacenter', val: 'Uptime 99.99%', on: true },
    { name: 'AP-East Datacenter', val: 'Backup verified', on: true },
    { name: 'Singapore Datacenter', val: 'Failover tested', on: false }
  ];

  const feedEl = document.getElementById('energyFeed');

  function renderFeed() {
    if (!feedEl) return;
    const now = new Date();
    const t = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
    feedEl.innerHTML = feedData.map(f => {
      return `<div class="feed-item">
        <div class="feed-dot ${f.on ? 'on' : 'off'}"></div>
        <span class="feed-label">${f.name}</span>
        <span class="feed-val">${f.val}</span>
        <span class="feed-time">${t}</span>
      </div>`;
    }).join('');
  }

  renderFeed();
  setInterval(renderFeed, 5000);

})();