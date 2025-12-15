// RMK WIDGET - GITHUB CDN VERSION
// URL: https://cdn.jsdelivr.net/gh/username/rmk-widget/widget.js
// Created: 2024
 
(function() {
    'use strict';
    
    console.log('🚀 RMK Widget v1.0 Loaded');
    
    // ========== CONFIGURATION ==========
    const VERSION = '1.0.0';
    const API_URL = 'https://rmk.co.id/wp-json/wp/v2/posts';
    
    // ========== INJECT CSS ==========
    const injectCSS = () => {
        const css = `
        /* RMK Widget Styles */
        .rmk-widget-container {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            max-width: 1200px;
            margin: 40px auto;
            padding: 0 20px;
            box-sizing: border-box;
        }
        
        .rmk-widget-title {
            text-align: center;
            font-size: 2.5rem;
            color: #2c3e50;
            margin-bottom: 40px;
            font-weight: 800;
            position: relative;
            padding-bottom: 15px;
        }
        
        .rmk-widget-title::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 100px;
            height: 4px;
            background: linear-gradient(90deg, #0073aa, #00a8ff);
            border-radius: 2px;
        }
        
        .rmk-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 30px;
            margin-bottom: 50px;
        }
        
        @media (max-width: 1024px) {
            .rmk-grid { grid-template-columns: repeat(2, 1fr); }
        }
        
        @media (max-width: 768px) {
            .rmk-grid { grid-template-columns: 1fr; }
        }
        
        .rmk-post {
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
            border: 1px solid rgba(0, 0, 0, 0.05);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            cursor: pointer;
            position: relative;
            height: 100%;
            display: flex;
            flex-direction: column;
        }
        
        .rmk-post:hover {
            transform: translateY(-12px) scale(1.02);
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
        }
        
        .rmk-post::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #0073aa, #00a8ff);
            z-index: 2;
        }
        
        .rmk-image {
            width: 100%;
            height: 220px;
            object-fit: cover;
            display: block;
            transition: transform 0.5s ease;
        }
        
        .rmk-post:hover .rmk-image {
            transform: scale(1.05);
        }
        
        .rmk-content {
            padding: 25px;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
        }
        
        .rmk-post-title {
            font-size: 1.4rem;
            font-weight: 700;
            color: #2c3e50;
            margin: 0 0 15px 0;
            line-height: 1.4;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
        
        .rmk-excerpt {
            font-size: 1rem;
            color: #666;
            line-height: 1.6;
            margin-bottom: 25px;
            flex-grow: 1;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
        
        .rmk-meta {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 20px;
            font-size: 0.9rem;
            color: #888;
        }
        
        .rmk-date {
            display: flex;
            align-items: center;
            gap: 5px;
        }
        
        .rmk-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            background: linear-gradient(135deg, #0073aa, #005f87);
            color: white;
            padding: 14px 25px;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            font-size: 1rem;
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
            width: 100%;
            position: relative;
            overflow: hidden;
        }
        
        .rmk-btn:hover {
            background: linear-gradient(135deg, #005f87, #004a6e);
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(0, 115, 170, 0.3);
        }
        
        .rmk-btn::after {
            content: '→';
            margin-left: 5px;
            transition: transform 0.3s ease;
        }
        
        .rmk-btn:hover::after {
            transform: translateX(5px);
        }
        
        /* Loading State */
        .rmk-loading {
            text-align: center;
            padding: 80px 20px;
            grid-column: 1 / -1;
        }
        
        .rmk-spinner {
            border: 5px solid rgba(0, 115, 170, 0.1);
            border-top: 5px solid #0073aa;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            animation: rmkSpin 1.2s linear infinite;
            margin: 0 auto 25px;
        }
        
        @keyframes rmkSpin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .rmk-loading p {
            font-size: 1.2rem;
            color: #666;
            font-weight: 500;
        }
        
        /* Error State */
        .rmk-error {
            text-align: center;
            padding: 60px 30px;
            background: linear-gradient(135deg, #fff5f5, #fff);
            border-radius: 16px;
            border: 2px dashed #fed7d7;
            color: #c53030;
            grid-column: 1 / -1;
        }
        
        .rmk-error h3 {
            font-size: 1.5rem;
            margin-bottom: 15px;
        }
        
        .rmk-retry-btn {
            background: #c53030;
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 50px;
            font-weight: 600;
            cursor: pointer;
            margin-top: 20px;
            transition: background 0.3s;
        }
        
        .rmk-retry-btn:hover {
            background: #9b2c2c;
        }
        
        /* Pagination */
        .rmk-pagination {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 20px;
            margin-top: 60px;
            flex-wrap: wrap;
        }
        
        .rmk-page-btn {
            padding: 14px 35px;
            background: linear-gradient(135deg, #0073aa, #005f87);
            color: white;
            border: none;
            border-radius: 50px;
            cursor: pointer;
            font-weight: 600;
            font-size: 1rem;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 10px;
            min-width: 150px;
            justify-content: center;
        }
        
        .rmk-page-btn:hover:not(:disabled) {
            background: linear-gradient(135deg, #005f87, #004a6e);
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(0, 115, 170, 0.3);
        }
        
        .rmk-page-btn:disabled {
            background: #e0e0e0;
            color: #999;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
        }
        
        .rmk-page-info {
            font-size: 1.1rem;
            color: #666;
            background: #f8f9fa;
            padding: 12px 35px;
            border-radius: 50px;
            border: 2px solid #eaeaea;
            min-width: 180px;
            text-align: center;
            font-weight: 600;
        }
        
        /* ========== MODAL POPUP ========== */
        .rmk-modal-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(10px);
            z-index: 9998;
            animation: rmkFadeIn 0.3s ease;
        }
        
        .rmk-modal {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 95%;
            max-width: 1000px;
            max-height: 90vh;
            background: white;
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 40px 80px rgba(0, 0, 0, 0.5);
            z-index: 9999;
            animation: rmkModalSlideIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .rmk-modal.active,
        .rmk-modal-overlay.active {
            display: block;
        }
        
        @keyframes rmkFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes rmkModalSlideIn {
            from {
                opacity: 0;
                transform: translate(-50%, -45%) scale(0.95);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
        }
        
        .rmk-modal-close {
            position: absolute;
            top: 25px;
            right: 25px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, #0073aa, #005f87);
            color: white;
            border: none;
            font-size: 28px;
            cursor: pointer;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        }
        
        .rmk-modal-close:hover {
            background: linear-gradient(135deg, #005f87, #004a6e);
            transform: rotate(90deg) scale(1.1);
        }
        
        .rmk-modal-body {
            padding: 60px;
            overflow-y: auto;
            max-height: 85vh;
        }
        
        .rmk-modal-title {
            color: #2c3e50;
            font-size: 2.8rem;
            font-weight: 800;
            margin: 0 0 30px 0;
            line-height: 1.2;
        }
        
        .rmk-modal-image {
            width: 100%;
            height: auto;
            max-height: 500px;
            object-fit: cover;
            border-radius: 16px;
            margin-bottom: 40px;
            box-shadow: 0 15px 40px rgba(0,0,0,0.15);
        }
        
        .rmk-modal-content {
            font-size: 1.2rem;
            line-height: 1.8;
            color: #444;
        }
        
        .rmk-modal-content p {
            margin-bottom: 25px;
        }
        
        .rmk-modal-actions {
            display: flex;
            gap: 20px;
            margin-top: 50px;
            padding-top: 30px;
            border-top: 2px solid #f0f0f0;
            flex-wrap: wrap;
        }
        
        .rmk-modal-link {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            background: linear-gradient(135deg, #0073aa, #005f87);
            color: white;
            padding: 18px 45px;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 700;
            font-size: 1.1rem;
            transition: all 0.3s ease;
        }
        
        .rmk-modal-link:hover {
            background: linear-gradient(135deg, #005f87, #004a6e);
            transform: translateY(-3px);
            box-shadow: 0 15px 35px rgba(0, 115, 170, 0.3);
        }
        
        @media (max-width: 768px) {
            .rmk-modal-body { padding: 30px; }
            .rmk-modal-title { font-size: 2rem; }
            .rmk-modal-actions { flex-direction: column; }
            .rmk-widget-title { font-size: 2rem; }
            .rmk-modal-link { width: 100%; justify-content: center; }
        }
        `;
        
        if (!document.querySelector('#rmk-widget-styles')) {
            const styleEl = document.createElement('style');
            styleEl.id = 'rmk-widget-styles';
            styleEl.textContent = css;
            document.head.appendChild(styleEl);
        }
    };
    
    // ========== CREATE MODAL ==========
    const createModal = () => {
        if (document.querySelector('#rmk-modal')) return;
        
        const modalHTML = `
            <div class="rmk-modal-overlay" id="rmk-modal-overlay"></div>
            <div class="rmk-modal" id="rmk-modal">
                <button class="rmk-modal-close" id="rmk-modal-close">×</button>
                <div class="rmk-modal-body" id="rmk-modal-body"></div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Event listeners
        document.getElementById('rmk-modal-close').addEventListener('click', closeModal);
        document.getElementById('rmk-modal-overlay').addEventListener('click', closeModal);
        
        // Close on ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });
    };
    
    // ========== MODAL FUNCTIONS ==========
    const openModal = (post) => {
        createModal();
        
        const modalBody = document.getElementById('rmk-modal-body');
        const modalOverlay = document.getElementById('rmk-modal-overlay');
        const modal = document.getElementById('rmk-modal');
        
        // Format date
        let dateText = '';
        if (post.date) {
            const date = new Date(post.date);
            dateText = date.toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
        
        // Create content
        let content = '';
        
        if (post.image) {
            content += `<img src="${post.image}" alt="${post.title}" class="rmk-modal-image">`;
        }
        
        content += `
            ${dateText ? `<div style="color:#0073aa; font-weight:600; margin-bottom:15px;">📅 ${dateText}</div>` : ''}
            <h1 class="rmk-modal-title">${post.title}</h1>
            <div class="rmk-modal-content">${post.content}</div>
            <div class="rmk-modal-actions">
                <a href="${post.link}" target="_blank" class="rmk-modal-link">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
                    </svg>
                    Baca di Website Asli
                </a>
                <button onclick="closeModal()" style="background:transparent; color:#666; border:3px solid #eaeaea; padding:18px 45px; border-radius:50px; font-weight:700; font-size:1.1rem; cursor:pointer; transition:all 0.3s;">
                    Tutup Modal
                </button>
            </div>
        `;
        
        modalBody.innerHTML = content;
        modalOverlay.classList.add('active');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    
    const closeModal = () => {
        const modalOverlay = document.getElementById('rmk-modal-overlay');
        const modal = document.getElementById('rmk-modal');
        
        if (modalOverlay) modalOverlay.classList.remove('active');
        if (modal) modal.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    // ========== WIDGET CORE ==========
    class RMKWidget {
        constructor(container, options = {}) {
            this.container = typeof container === 'string' 
                ? document.getElementById(container) 
                : container;
            
            if (!this.container) {
                console.error('❌ Container not found');
                return;
            }
            
            this.config = {
                perPage: options.perPage || 6,
                category: options.category || '5',
                title: options.title || '📰 Berita Terbaru',
                showDate: options.showDate !== false,
                version: VERSION
            };
            
            this.currentPage = 1;
            this.totalPages = 1;
            this.posts = [];
            
            console.log(`🚀 RMK Widget v${VERSION} initializing`);
            this.init();
        }
        
        async init() {
            injectCSS();
            this.renderLoading();
            await this.loadPosts();
        }
        
        renderLoading() {
            this.container.innerHTML = `
                <div class="rmk-widget-container">
                    <h1 class="rmk-widget-title">${this.config.title}</h1>
                    <div class="rmk-grid">
                        <div class="rmk-loading">
                            <div class="rmk-spinner"></div>
                            <p>Memuat berita terbaru...</p>
                        </div>
                    </div>
                </div>
            `;
        }
        
        renderError(error) {
            this.container.innerHTML = `
                <div class="rmk-widget-container">
                    <h1 class="rmk-widget-title">${this.config.title}</h1>
                    <div class="rmk-error">
                        <h3>⚠️ Gagal Memuat Berita</h3>
                        <p>${error.message || 'Terjadi kesalahan saat mengambil data.'}</p>
                        <button class="rmk-retry-btn" onclick="widget.loadPosts()">
                            Coba Lagi
                        </button>
                    </div>
                </div>
            `;
        }
        
        async loadPosts(page = 1) {
            try {
                console.log(`📡 Fetching page ${page}...`);
                
                const params = new URLSearchParams({
                    _embed: 'true',
                    per_page: this.config.perPage.toString(),
                    page: page.toString(),
                    categories: this.config.category
                });
                
                const response = await fetch(`${API_URL}?${params}`);
                
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                
                this.posts = await response.json();
                this.totalPages = parseInt(response.headers.get('X-WP-TotalPages')) || 1;
                this.currentPage = page;
                
                console.log(`✅ Loaded ${this.posts.length} posts`);
                this.renderPosts();
                this.renderPagination();
                
            } catch (error) {
                console.error('❌ Error loading posts:', error);
                this.renderError(error);
            }
        }
        
        renderPosts() {
            if (!this.posts || this.posts.length === 0) {
                this.container.innerHTML = `
                    <div class="rmk-widget-container">
                        <h1 class="rmk-widget-title">${this.config.title}</h1>
                        <div class="rmk-error">
                            <h3>Tidak ada berita ditemukan</h3>
                            <p>Belum ada postingan untuk ditampilkan.</p>
                        </div>
                    </div>
                `;
                return;
            }
            
            let postsHTML = '<div class="rmk-grid">';
            
            this.posts.forEach(post => {
                // Get featured image
                let imageUrl = '';
                let imageAlt = post.title?.rendered || 'Post Image';
                
                if (post._embedded?.['wp:featuredmedia']?.[0]) {
                    const media = post._embedded['wp:featuredmedia'][0];
                    imageUrl = media.source_url;
                    if (media.alt_text) imageAlt = media.alt_text;
                }
                
                // Create excerpt
                let excerpt = '';
                if (post.excerpt?.rendered) {
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = post.excerpt.rendered;
                    excerpt = tempDiv.textContent || tempDiv.innerText || '';
                    excerpt = excerpt.replace(/\s+/g, ' ').trim();
                    if (excerpt.length > 150) {
                        excerpt = excerpt.substring(0, 150) + '...';
                    }
                }
                
                // Format date
                let dateHTML = '';
                if (this.config.showDate && post.date) {
                    const date = new Date(post.date);
                    const dateStr = date.toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    });
                    dateHTML = `
                        <div class="rmk-meta">
                            <span class="rmk-date">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="#888">
                                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                                </svg>
                                ${dateStr}
                            </span>
                        </div>
                    `;
                }
                
                const postData = {
                    title: post.title?.rendered || 'Tidak ada judul',
                    content: post.content?.rendered || '<p>Tidak ada konten.</p>',
                    image: imageUrl,
                    link: post.link,
                    date: post.date,
                    excerpt: excerpt
                };
                
                postsHTML += `
                    <div class="rmk-post" onclick="openModal(${JSON.stringify(postData).replace(/"/g, '&quot;')})">
                        ${imageUrl ? `<img src="${imageUrl}" alt="${imageAlt}" class="rmk-image" loading="lazy">` : ''}
                        <div class="rmk-content">
                            <h3 class="rmk-post-title">${postData.title}</h3>
                            ${dateHTML}
                            <p class="rmk-excerpt">${excerpt || 'Tidak ada deskripsi...'}</p>
                            <button class="rmk-btn" onclick="event.stopPropagation(); openModal(${JSON.stringify(postData).replace(/"/g, '&quot;')})">
                                Baca Selengkapnya
                            </button>
                        </div>
                    </div>
                `;
            });
            
            postsHTML += '</div>';
            
            this.container.innerHTML = `
                <div class="rmk-widget-container">
                    <h1 class="rmk-widget-title">${this.config.title}</h1>
                    ${postsHTML}
                </div>
            `;
        }
        
        renderPagination() {
            const container = this.container.querySelector('.rmk-widget-container');
            if (!container) return;
            
            const paginationHTML = `
                <div class="rmk-pagination">
                    <button class="rmk-page-btn" id="rmk-prev-btn" ${this.currentPage <= 1 ? 'disabled' : ''}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
                        </svg>
                        Sebelumnya
                    </button>
                    <span class="rmk-page-info">Halaman ${this.currentPage} dari ${this.totalPages}</span>
                    <button class="rmk-page-btn" id="rmk-next-btn" ${this.currentPage >= this.totalPages ? 'disabled' : ''}>
                        Selanjutnya
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                        </svg>
                    </button>
                </div>
            `;
            
            container.insertAdjacentHTML('beforeend', paginationHTML);
            
            // Add event listeners
            const prevBtn = container.querySelector('#rmk-prev-btn');
            const nextBtn = container.querySelector('#rmk-next-btn');
            
            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    if (this.currentPage > 1) {
                        this.loadPosts(this.currentPage - 1);
                    }
                });
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    if (this.currentPage < this.totalPages) {
                        this.loadPosts(this.currentPage + 1);
                    }
                });
            }
        }
        
        updateConfig(newConfig) {
            this.config = { ...this.config, ...newConfig };
            this.currentPage = 1;
            this.loadPosts();
        }
    }
    
    // ========== GLOBAL EXPORTS ==========
    window.RMKWidget = RMKWidget;
    window.openModal = openModal;
    window.closeModal = closeModal;
    
    // Auto-initialize widgets with data attributes
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('[data-rmk-widget]').forEach(container => {
            if (!container.dataset.initialized) {
                const widget = new RMKWidget(container, {
                    perPage: container.dataset.perPage || 6,
                    category: container.dataset.category || '5',
                    title: container.dataset.title || '📰 Berita Terbaru',
                    showDate: container.dataset.showDate !== 'false'
                });
                
                container.dataset.initialized = 'true';
                container.widget = widget; // Store reference
                
                console.log('✅ Auto-initialized widget');
            }
        });
    });
    
    // Manual initialization function
    window.initRMKWidget = (containerId, options = {}) => {
        const widget = new RMKWidget(containerId, options);
        const container = document.getElementById(containerId);
        if (container) {
            container.widget = widget;
        }
        return widget;
    };
    
    console.log('✅ RMK Widget script ready');
})();
