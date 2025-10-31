/**
 * Mobile Font Size Toggle
 * Lightweight vanilla JS solution for adjusting reading font size on mobile
 * No dependencies - integrates with existing theme system
 */

(function() {
    'use strict';
    
    const FONT_SIZES = {
        small: { multiplier: 0.9, label: 'Small' },
        medium: { multiplier: 1.0, label: 'Medium' },
        large: { multiplier: 1.15, label: 'Large' },
        xlarge: { multiplier: 1.3, label: 'X-Large' }
    };
    
    const DEFAULT_SIZE = 'medium';
    const STORAGE_KEY = 'fontSize';
    
    class FontSizeToggle {
        constructor() {
            this.currentSize = this.loadSize();
            this.init();
        }
        
        loadSize() {
            try {
                const saved = localStorage.getItem(STORAGE_KEY);
                return (saved && FONT_SIZES[saved]) ? saved : DEFAULT_SIZE;
            } catch (e) {
                return DEFAULT_SIZE;
            }
        }
        
        saveSize(size) {
            try {
                localStorage.setItem(STORAGE_KEY, size);
            } catch (e) {
                console.warn('Could not save font size preference');
            }
        }
        
        applySize(size) {
            const multiplier = FONT_SIZES[size].multiplier;
            document.documentElement.style.setProperty('--font-size-multiplier', multiplier);
            this.currentSize = size;
            this.updateButtons();
            console.log(`Font size applied: ${size} (${multiplier}x)`);
        }
        
        setSize(size) {
            if (!FONT_SIZES[size]) return;
            this.applySize(size);
            this.saveSize(size);
            console.log(`Font size set and saved: ${size}`);
        }
        
        updateButtons() {
            document.querySelectorAll('.font-size-option').forEach(btn => {
                const btnSize = btn.dataset.size;
                btn.classList.toggle('active', btnSize === this.currentSize);
                btn.setAttribute('aria-pressed', btnSize === this.currentSize);
            });
        }
        
        createToggle() {
            const li = document.createElement('li');
            li.className = 'font-toggle-container';
            
            const button = document.createElement('button');
            button.className = 'font-toggle';
            button.setAttribute('aria-label', 'Adjust font size');
            button.setAttribute('aria-expanded', 'false');
            button.innerHTML = '<span class="font-icon"><i class="fas fa-text-height"></i></span>';
            
            const dropdown = document.createElement('div');
            dropdown.className = 'font-dropdown';
            dropdown.setAttribute('role', 'menu');
            
            Object.entries(FONT_SIZES).forEach(([key, { label }]) => {
                const optionBtn = document.createElement('button');
                optionBtn.className = 'font-size-option';
                optionBtn.dataset.size = key;
                optionBtn.textContent = label;
                optionBtn.setAttribute('role', 'menuitem');
                optionBtn.setAttribute('aria-pressed', key === this.currentSize);
                
                optionBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.setSize(key);
                });
                
                dropdown.appendChild(optionBtn);
            });
            
            // Toggle dropdown
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const isOpen = dropdown.classList.contains('show');
                dropdown.classList.toggle('show');
                button.setAttribute('aria-expanded', !isOpen);
            });
            
            // Close on outside click
            document.addEventListener('click', () => {
                dropdown.classList.remove('show');
                button.setAttribute('aria-expanded', 'false');
            });
            
            li.appendChild(button);
            li.appendChild(dropdown);
            
            return li;
        }
        
        init() {
            // Apply saved size immediately
            this.applySize(this.currentSize);
            
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.insertToggle());
            } else {
                this.insertToggle();
            }
        }
        
        insertToggle() {
            // Insert after theme toggle in nav
            const nav = document.querySelector('nav ul');
            const themeToggleLi = nav?.querySelector('.theme-toggle')?.parentElement;
            
            if (nav && themeToggleLi) {
                const toggle = this.createToggle();
                // Insert after theme toggle
                themeToggleLi.insertAdjacentElement('afterend', toggle);
                this.updateButtons();
                console.log('Font toggle inserted successfully');
            } else {
                console.error('Could not find nav or theme toggle');
            }
        }
    }
    
    // Initialize when script loads
    const fontToggle = new FontSizeToggle();
    console.log('FontSizeToggle initialized');
})();