// RMK WIDGET - NO TITLE VERSION
// URL: https://cdn.jsdelivr.net/gh/Roofiq09/newsandpromotion@main/widget.js
// Updated: 2024 - No title, responsive design

(function() {
    'use strict';
    
    console.log('🚀 RMK Widget v1.2 Loaded - No Title Version');
    
    // ========== INJECT CSS ==========
    const injectCSS = () => {
        const css = `
        /* RMK Widget Styles v1.2 - No Title */
        .rmk-widget-container {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            max-width: 1200px;
            margin: 20px auto;
            padding: 0 15px;
            box-sizing: border-box;
        }
        
        /* ========== GRID SYSTEM ========== */
        /* DESKTOP: 3 columns */
        .rmk-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 25px;
            margin-bottom: 30px;
        }
        
        /* TABLET: 2 columns */
        @media (max-width: 1024px) {
            .rmk-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 20px;
            }
        }
        
        /* MOBILE: 1 column */
        @media (max-width: 768px) {
            .rmk-grid {
                grid-template-columns: 1fr;
                gap: 15px;
            }
        }
        
        /* ========== POST CARD ========== */
        .rmk-post {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
            border: 1px solid rgba(0, 0, 0, 0.05);
            transition: all 0.3s ease;
            cursor: pointer;
            height: 100%;
            display: flex;
            flex-direction: column;
        }
        
        .rmk-post:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.12);
        }
        
        /* ========== IMAGE FIXED SIZE ========== */
        .rmk-image-container {
            width: 100%;
            position: relative;
            overflow: hidden;
            background: #f8f9fa;
        }
        
        /* ASPECT RATIO 16:9 - SAMA SEMUA */
        .rmk-image-container::before {
            content: '';
            display: block;
            padding-top: 56.25%; /* 16:9 Aspect Ratio */
        }
        
        .rmk-image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            transition: transform 0.5s ease;
        }
        
        .rmk-post:hover .rmk-image {
            transform: scale(1.05);
        }
        
        /* Fallback jika gambar tidak ada */
        .rmk-image-placeholder {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #f5f5f5, #e0e0e0);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #666;
            font-size: 0.9rem;
        }
        
        /* ========== CONTENT ========== */
        .rmk-content {
            padding: 20px;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
        }
        
        .rmk-post-title {
            font-size: 1.2rem;
            font-weight: 600;
            color: #2c3e50;
            margin: 0 0 12px 0;
            line-height: 1.4;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
        
        .rmk-excerpt {
            font-size: 0.95rem;
            color: #666;
            line-height: 1.5;
            margin-bottom: 20px;
            flex-grow: 1;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
        
        .rmk-meta {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 15px;
            font-size: 0.85rem;
            color: #888;
        }
        
        .rmk-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: #0073aa;
            color: white;
            padding: 10px 20px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 500;
            font-size: 0.9rem;
            border: none;
            cursor: pointer;
            transition: all 0.2s ease;
            width: 100%;
        }
        
        .rmk-btn:hover {
            background: #005f87;
        }
        
        /* ========== LOADING & ERROR ========== */
        .rmk-loading {
            text-align: center;
            padding: 60px 20px;
            grid-column: 1 / -1;
        }
        
        .rmk-spinner {
            border: 4px solid rgba(0, 115, 170, 0.1);
            border-top: 4px solid #0073aa;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: rmkSpin 1s linear infinite;
            margin: 0 auto 20px;
        }
        
        @keyframes rmkSpin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .rmk-error {
            text-align: center;
            padding: 40px 20px;
            background: #fff5f5;
            border-radius: 12px;
            border: 1px solid #fed7d7;
            color: #c53030;
            grid-column: 1 / -1;
        }
        
        /* ========== PAGINATION ========== */
        .rmk-pagination {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 15px;
            margin-top: 40px;
            flex-wrap: wrap;
        }
        
        .rmk-page-btn {
            padding: 10px 25px;
            background: #0073aa;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 500;
            font-size: 0.9rem;
            transition: all 0.2s ease;
        }
        
        .rmk-page-btn:hover:not(:disabled) {
            background: #005f87;
        }
        
        .rmk-page-btn:disabled {
            background: #e0e0e0;
            color: #999;
            cursor: not-allowed;
        }
        
        .rmk-page-info {
            font-size: 0.9rem;
            color: #666;
            background: #f8f9fa;
            padding: 8px 20px;
            border-radius: 6px;
            border: 1px solid #eaeaea;
        }
        
        /* ========== MODAL POPUP ========== */
        .rmk-modal-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.85);
            z-index: 9998;
        }
        
        .rmk-modal {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 95%;
            max-width: 900px;
            max-height: 85vh;
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
            z-index: 9999;
        }
        
        .rmk-modal.active,
        .rmk-modal-overlay.active {
            display: block;
        }
        
        .rmk-modal-close {
            position: absolute;
            top: 15px;
            right: 15px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #0073aa;
            color: white;
            border: none;
            font-size: 20px;
            cursor: pointer;
            z-index: 10000;
        }
        
        .rmk-modal-body {
            padding: 40px;
            overflow-y: auto;
            max-height: 75vh;
        }
        
        .rmk-modal-image {
            width: 100%;
            height: auto;
            max-height: 400px;
            object-fit: cover;
            border-radius: 12px;
            margin-bottom: 25px;
        }
        
        @media (max-width: 768px) {
            .rmk-modal-body { padding: 25px; }
            .rmk-modal-image { max-height: 250px; }
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
        
        document.getElementById('rmk-modal-close').addEventListener('click', closeModal);
        document.getElementById('rmk-modal-overlay').addEventListener('click', closeModal);
        
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
        
        let content = '';
        
        if (post.image) {
            content += `<img src="${post.image}" alt="${post.title}" class="rmk-modal-image">`;
        }
        
        content += `
            <h2 style="color:#2c3e50; font-size:1.8rem; margin:0 0 20px 0;">${post.title}</h2>
            <div style="font-size:1rem; line-height:1.6; color:#444;">${post.content}</div>
            <div style="margin-top:30px;">
                <a href="${post.link}" target="_blank" style="display:inline-block; background:#0073aa; color:white; padding:12px 25px; border-radius:6px; text-decoration:none;">
                    Baca di Situs Asli
                </a>
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
                showDate: options.showDate !== false
            };
            
            this.currentPage = 1;
            this.totalPages = 1;
            
            console.log('🚀 RMK Widget Initializing - No Title');
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
                    <div class="rmk-grid">
                        <div class="rmk-loading">
                            <div class="rmk-spinner"></div>
                            <p>Memuat berita...</p>
                        </div>
                    </div>
                </div>
            `;
        }
        
        async loadPosts(page = 1) {
            try {
                const params = new URLSearchParams({
                    _embed: 'true',
                    per_page: this.config.perPage.toString(),
                    page: page.toString(),
                    categories: this.config.category
                });
                
                const response = await fetch(`https://rmk.co.id/wp-json/wp/v2/posts?${params}`);
                
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                
                const posts = await response.json();
                this.totalPages = parseInt(response.headers.get('X-WP-TotalPages')) || 1;
                this.currentPage = page;
                
                this.renderPosts(posts);
                this.renderPagination();
                
            } catch (error) {
                console.error('Error:', error);
                this.container.innerHTML = `
                    <div class="rmk-widget-container">
                        <div class="rmk-error">
                            <p>Gagal memuat berita</p>
                            <button onclick="widget.loadPosts()" style="background:#0073aa; color:white; border:none; padding:10px 20px; border-radius:4px; margin-top:10px; cursor:pointer;">
                                Coba Lagi
                            </button>
                        </div>
                    </div>
                `;
            }
        }
        
        renderPosts(posts) {
            if (!posts || posts.length === 0) {
                this.container.innerHTML = `
                    <div class="rmk-widget-container">
                        <div class="rmk-error">
                            <p>Tidak ada berita ditemukan</p>
                        </div>
                    </div>
                `;
                return;
            }
            
            let postsHTML = '<div class="rmk-grid">';
            
            posts.forEach(post => {
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
                    if (excerpt.length > 100) {
                        excerpt = excerpt.substring(0, 100) + '...';
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
                            <span>📅 ${dateStr}</span>
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
                
                // Image HTML with fixed aspect ratio
                let imageHTML = '';
                if (imageUrl) {
                    imageHTML = `
                        <div class="rmk-image-container">
                            <img src="${imageUrl}" alt="${imageAlt}" class="rmk-image" loading="lazy">
                        </div>
                    `;
                } else {
                    imageHTML = `
                        <div class="rmk-image-container">
                            <div class="rmk-image-placeholder">
                                Tidak ada gambar
                            </div>
                        </div>
                    `;
                }
                
                postsHTML += `
                    <div class="rmk-post" onclick="openModal(${JSON.stringify(postData).replace(/"/g, '&quot;')})">
                        ${imageHTML}
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
                        ← Sebelumnya
                    </button>
                    <span class="rmk-page-info">Halaman ${this.currentPage} dari ${this.totalPages}</span>
                    <button class="rmk-page-btn" id="rmk-next-btn" ${this.currentPage >= this.totalPages ? 'disabled' : ''}>
                        Selanjutnya →
                    </button>
                </div>
            `;
            
            container.insertAdjacentHTML('beforeend', paginationHTML);
            
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
    }
    
    // ========== GLOBAL EXPORTS ==========
    window.RMKWidget = RMKWidget;
    window.openModal = openModal;
    window.closeModal = closeModal;
    
    // Auto-initialize
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('[data-rmk-widget]').forEach(container => {
            if (!container.dataset.initialized) {
                const widget = new RMKWidget(container, {
                    perPage: container.dataset.perPage || 6,
                    category: container.dataset.category || '5',
                    showDate: container.dataset.showDate !== 'false'
                });
                
                container.dataset.initialized = 'true';
                container.widget = widget;
            }
        });
    });
    
    // Manual initialization
    window.initRMKWidget = (containerId, options = {}) => {
        const widget = new RMKWidget(containerId, options);
        const container = document.getElementById(containerId);
        if (container) {
            container.widget = widget;
        }
        return widget;
    };
    
    console.log('✅ RMK Widget No Title Ready');
})();
