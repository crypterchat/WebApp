dark_css = """
/* ── DARK MODE ── */
.dark body {
  background: #121212;
  color: #e0e0e0;
}
.dark .topbar {
  background: #0d47a1;
}
.dark nav {
  background: #121212;
  border-bottom: 1px solid #333;
}
.dark .nav-inner a {
  color: #e0e0e0;
}
.dark .nav-inner .active {
  color: #90caf9;
}
.dark .search-pill {
  background: #1e1e1e;
  border-color: #333;
  color: #aaa;
}
.dark .nav-icon-btn svg, .dark .theme-toggle svg {
  stroke: #e0e0e0;
}
.dark .logo {
  color: #fff;
}
.dark .hero-slide-inner {
  background: #1e1e1e;
  border-color: #333;
}
.dark .slide-title {
  color: #fff;
}
.dark .slide-body {
  color: #bbb;
}
.dark .card {
  background: #1e1e1e;
  border-color: #333;
}
.dark .card-title {
  color: #fff;
}
.dark .card-body, .dark .card-quote {
  color: #aaa;
}
.dark .feature-title {
  color: #fff;
}
.dark .feature-body {
  color: #aaa;
}
.dark .code-grid {
  background: #1e1e1e;
}
.dark .code-text h2 {
  color: #fff;
}
.dark .code-text p {
  color: #aaa;
}
.dark .stat-num {
  color: #fff;
}
.dark .stat-label {
  color: #aaa;
}
.dark .blog-card {
  background: #1e1e1e;
  border-color: #333;
}
.dark .blog-title {
  color: #fff;
}
.dark .blog-excerpt {
  color: #aaa;
}
.dark footer {
  background: #121212;
  border-top-color: #333;
}
.dark .footer-col h4 {
  color: #aaa;
}
.dark .footer-col a {
  color: #ccc;
}
.dark .footer-bottom {
  border-top-color: #333;
}
.dark .social-btn {
  background: #1e1e1e;
  border-color: #333;
}
.dark .social-btn svg {
  stroke: #ccc;
  fill: #ccc;
}
"""

with open("app/globals.css", "a") as f:
    f.write(dark_css)
