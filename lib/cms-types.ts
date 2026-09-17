export type NavLink = {
  label: string;
  url: string;
  isExternal?: boolean | null;
  id?: string;
};

export type Navigation = {
  links?: NavLink[] | null;
  githubUrl?: string | null;
  npmUrl?: string | null;
};

export type FooterLink = {
  label: string;
  url: string;
  id?: string;
};

export type FooterColumn = {
  title: string;
  links?: FooterLink[] | null;
  id?: string;
};

export type Footer = {
  brandDescription?: string | null;
  socialLinks?: {
    github?: string | null;
    twitter?: string | null;
    npm?: string | null;
    discord?: string | null;
  } | null;
  columns?: FooterColumn[] | null;
  bottomLinks?: FooterLink[] | null;
  copyright?: string | null;
};

export type BlogPost = {
  id: string;
  title: string;
  slug?: string | null;
  excerpt?: string | null;
  tag?: string | null;
  date?: string | null;
  author?: string | null;
  thumbColor?: string | null;
  thumbIcon?: string | null;
};

export type CaseStudy = {
  id: string;
  title: string;
  body?: string | null;
  isQuote?: boolean | null;
  linkUrl?: string | null;
  linkText?: string | null;
  svgCode?: string | null;
};

export type Feature = {
  id: string;
  title: string;
  body?: string | null;
  iconColor?: string | null;
  iconSvg?: string | null;
};

export type HeroSlide = {
  eyebrow: string;
  title: string;
  body: string;
  linkText: string;
  linkUrl: string;
  visualType?: string | null;
  id?: string;
};

export type Stat = {
  number: string;
  label: string;
  id?: string;
};

export type CtaData = {
  title?: string | null;
  body?: string | null;
  primaryBtnText?: string | null;
  primaryBtnUrl?: string | null;
  secondaryBtnText?: string | null;
  secondaryBtnUrl?: string | null;
};

export type CodeBlockData = CtaData & {
  codeTitle?: string | null;
  code?: string | null;
};
