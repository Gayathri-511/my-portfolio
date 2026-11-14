// Shared site-wide links. Blog is hidden from navigation until posts are ready
// (its routes still exist in App.jsx).

export const RESUME_URL = `${import.meta.env.BASE_URL}Gayathri_RK_Business_Analyst_Resume.pdf`;

export const NAV_LINKS = [
  { label: 'Work', to: '/#work', hash: true },
  { label: 'Skills', to: '/skills' },
  { label: 'Playground', to: '/playground' },
  { label: 'About', to: '/about' },
];

export const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rk-gayathri/' },
  { label: 'Medium', href: 'https://medium.com/@rkgayathri18' },
];

export const EMAIL = 'rkgayathri18@gmail.com';

// Opens a new Gmail message addressed to Gayathri (works without a desktop mail app).
export const EMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}`;
