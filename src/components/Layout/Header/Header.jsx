import React, { useEffect, useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import styles from './Header.module.scss';
import Link from 'next/link';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverBanner, setIsOverBanner] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 判断是否滚动超过了基本阈值
      setIsScrolled(window.scrollY > 20);

      // 判断是否超过了Banner区域
      const banner = document.getElementById('banner');
      if (banner) {
        const bannerHeight = banner.offsetHeight;
        setIsOverBanner(window.scrollY < bannerHeight * 0.7);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // 初始检查
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 当菜单打开时，禁止body滚动以防止背景内容滚动
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // 监听窗口尺寸变化，在桌面尺寸时自动关闭移动菜单
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [menuOpen]);

  return (
    <header
      className={`
      ${styles.header} 
      ${isScrolled ? styles.scrolled : ''}
      ${isOverBanner ? styles.transparent : ''}
    `}
    >
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">iGEM Team 2025</Link>
        </div>

        <button
          className={`${styles.mobileMenuToggle} ${menuOpen ? styles.active : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
        >
          <span className={styles.icon}></span>
        </button>

        <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
          <ul className={styles.navList}>
            <li>
              <Link href="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/team" onClick={() => setMenuOpen(false)}>
                Team
              </Link>
            </li>
            <li>
              <Link href="/project" onClick={() => setMenuOpen(false)}>
                Project
              </Link>
            </li>
            <li>
              <Link href="/results" onClick={() => setMenuOpen(false)}>
                Results
              </Link>
            </li>
          </ul>

          <button
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
