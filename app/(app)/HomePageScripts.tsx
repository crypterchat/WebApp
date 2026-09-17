"use client";

import { useEffect, useState } from "react";
import SearchModal from "../components/SearchModal";

export default function HomePageScripts() {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    // ── HAMBURGER ──
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    
    if (hamburger && mobileNav) {
      const toggleNav = () => mobileNav.classList.toggle('open');
      hamburger.addEventListener('click', toggleNav);
      
      const closeNav = (e: MouseEvent) => {
        if (!hamburger.contains(e.target as Node) && !mobileNav.contains(e.target as Node)) {
          mobileNav.classList.remove('open');
        }
      };
      document.addEventListener('click', closeNav);
      
      return () => {
        hamburger.removeEventListener('click', toggleNav);
        document.removeEventListener('click', closeNav);
      };
    }
  }, []);

  useEffect(() => {
    // ── SLIDER ──
    const slides = document.querySelectorAll('.hero-slide');
    const dots   = document.querySelectorAll('.slider-dot');
    const prevBtn = document.getElementById('sliderPrev');
    const nextBtn = document.getElementById('sliderNext');
    let current  = 0;
    let timer: NodeJS.Timeout;

    if (slides.length === 0) return;

    function goTo(idx: number) {
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = (idx + slides.length) % slides.length;
      slides[current].classList.add('active');
      dots[current].classList.add('active');
    }

    function nextSlide() { goTo(current + 1); }
    function prevSlide() { goTo(current - 1); }
    function startTimer() {
      clearInterval(timer);
      timer = setInterval(nextSlide, 5000);
    }

    prevBtn?.addEventListener('click', () => { prevSlide(); startTimer(); });
    nextBtn?.addEventListener('click', () => { nextSlide(); startTimer(); });
    
    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        const idx = parseInt((e.target as HTMLElement).getAttribute('data-idx') || '0');
        goTo(idx);
        startTimer();
      });
    });

    startTimer();
    
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // ── SEARCH MODAL TRIGGERS ──
    const searchPills = document.querySelectorAll('.search-pill');
    
    const openSearch = () => setSearchOpen(true);
    
    searchPills.forEach(pill => {
      pill.addEventListener('click', openSearch);
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      searchPills.forEach(pill => {
        pill.removeEventListener('click', openSearch);
      });
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    // ── THEME TOGGLE ──
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const isDark = localStorage.getItem('theme') === 'dark';
    if (isDark) {
      document.documentElement.classList.add('dark');
    }

    const toggleTheme = () => {
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      }
    };

    themeToggles.forEach(toggle => {
      toggle.addEventListener('click', toggleTheme);
    });

    return () => {
      themeToggles.forEach(toggle => {
        toggle.removeEventListener('click', toggleTheme);
      });
    };
  }, []);

  return <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />;
}
