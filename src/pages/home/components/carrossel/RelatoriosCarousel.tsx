import React, { useState, useEffect, useRef, useCallback } from 'react';
import "./RelatoriosCarousel.css"
import { getArtigoDimensao } from '../../../admin/create/artigo/crudArtigo.tsx';

interface CarCard {
  dimClass: string;
  iconColor: string;
  icon: React.ReactNode;
  category: string;
  title: string;
  dimensao: string;
  date: string;
  pdfHref: string;
}

const DownloadIcon = () => (
  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <line x1="6" y1="1" x2="6" y2="8"/>
    <polyline points="3,5 6,8 9,5"/>
    <line x1="1" y1="11" x2="11" y2="11"/>
  </svg>
);

interface RelatoriosCarouselProps {
  dimensoesTitulo: Record<string, string> | null;
}

const RelatoriosCarousel: React.FC<RelatoriosCarouselProps> = ({ dimensoesTitulo }) => {

    if (!dimensoesTitulo) return null;

    const cards: CarCard[] = [
    {
        dimClass: 'car-dim-economia',
        iconColor: '#d4594c',
        category: 'Economia e Mercado de Trabalho',
        title: `Relatório de ${dimensoesTitulo["emprego"]} — Barcarena 2024`,
        date: '2025',
        dimensao: 'emprego',
        pdfHref: '/pdfs/economia-mercado-trabalho.pdf',
        icon: (
        <svg className="car-dim-icon" viewBox="0 0 36 36" fill="none" stroke="#d4594c" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4,26 12,16 18,20 28,8"/>
            <polyline points="24,8 28,8 28,12"/>
            <line x1="4" y1="30" x2="32" y2="30"/>
        </svg>
        ),
    },
    {
        dimClass: 'car-dim-ambiente',
        iconColor: '#c4b840',
        category: 'Meio Ambiente e Saneamento',
        title: `Relatório de ${dimensoesTitulo["meioAmbiente"]} — Barcarena 2024`,
        date: '2025',
        dimensao: 'meioAmbiente',
        pdfHref: '/pdfs/meio-ambiente-saneamento.pdf',
        icon: (
        <svg className="car-dim-icon" viewBox="0 0 36 36" fill="none" stroke="#c4b840" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="18,3 24,13 12,13"/>
            <polygon points="18,9 25,21 11,21"/>
            <line x1="18" y1="21" x2="18" y2="27"/>
            <polygon points="8,8 13,17 3,17"/>
            <line x1="8" y1="17" x2="8" y2="22"/>
            <polygon points="28,8 33,17 23,17"/>
            <line x1="28" y1="17" x2="28" y2="22"/>
            <line x1="2" y1="27" x2="34" y2="27"/>
        </svg>
        ),
    },
    {
        dimClass: 'car-dim-educacao',
        iconColor: '#4a7fd4',
        category: 'Educação, Cultura, Esporte e Lazer',
        title: `Relatório de ${dimensoesTitulo["educacao"]} — Barcarena 2024`,
        date: '2025',
        dimensao: 'educacao',
        pdfHref: '/pdfs/educacao.pdf',
        icon: (
        <svg className="car-dim-icon" viewBox="0 0 36 36" fill="none" stroke="#4a7fd4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 14 L18 7 L32 14 L18 21 Z"/>
            <path d="M26 17.5 L26 25 C26 25 22 28 18 28 C14 28 10 25 10 25 L10 17.5"/>
            <line x1="32" y1="14" x2="32" y2="22"/>
        </svg>
        ),
    },
    {
        dimClass: 'car-dim-mobilidade',
        iconColor: '#d4b840',
        category: 'Mobilidade',
        title: `Relatório de ${dimensoesTitulo["mobilidade"]} — Barcarena 2024`,
        date: '2025',
        dimensao: 'mobilidade',
        pdfHref: '/pdfs/mobilidade.pdf',
        icon: (
        <svg className="car-dim-icon" viewBox="0 0 36 36" fill="none" stroke="#d4b840" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="12" width="26" height="14" rx="3"/>
            <line x1="5" y1="18" x2="31" y2="18"/>
            <line x1="14" y1="12" x2="14" y2="26"/>
            <circle cx="11" cy="28" r="2"/>
            <circle cx="25" cy="28" r="2"/>
        </svg>
        ),
    },
    {
        dimClass: 'car-dim-territorio',
        iconColor: '#4ecdc4',
        category: 'Ordenamento Territorial e Habitação',
        title: `Relatório de ${dimensoesTitulo["ordenamento"]} — Barcarena 2024`,
        date: '2025',
        dimensao: 'ordenamento',
        pdfHref: '/pdfs/ordenamento.pdf',
        icon: (
        <svg className="car-dim-icon" viewBox="0 0 36 36" fill="none" stroke="#4ecdc4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 5 L32 15 L32 31 L4 31 L4 15 Z"/>
            <rect x="13" y="21" width="10" height="10"/>
            <polyline points="4,15 18,5 32,15"/>
        </svg>
        ),
    },
    {
        dimClass: 'car-dim-seguranca',
        iconColor: '#5abf80',
        category: 'Segurança',
        title: `Relatório de ${dimensoesTitulo["seguranca"]} — Barcarena 2024`,
        date: '2025',
        dimensao: 'seguranca',
        pdfHref: '/pdfs/seguranca.pdf',
        icon: (
        <svg className="car-dim-icon" viewBox="0 0 36 36" fill="none" stroke="#5abf80" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 4 L30 9 L30 19 C30 25 24 30 18 32 C12 30 6 25 6 19 L6 9 Z"/>
            <circle cx="18" cy="18" r="5"/>
            <line x1="18" y1="13" x2="18" y2="11"/>
            <line x1="18" y1="23" x2="18" y2="25"/>
            <line x1="13" y1="18" x2="11" y2="18"/>
            <line x1="23" y1="18" x2="25" y2="18"/>
        </svg>
        ),
    },
    {
        dimClass: 'car-dim-saude',
        iconColor: '#c46060',
        category: 'Saúde',
        title: `Relatório de ${dimensoesTitulo["saude"]} — Barcarena 2024`,
        date: '2025',
        dimensao: 'saude',
        pdfHref: '/pdfs/saude.pdf',
        icon: (
        <svg className="car-dim-icon" viewBox="0 0 36 36" fill="none" stroke="#c46060" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 30 C18 30 6 22 6 14 C6 9 10 6 14 6 C16 6 18 8 18 8 C18 8 20 6 22 6 C26 6 30 9 30 14 C30 22 18 30 18 30Z"/>
            <line x1="18" y1="14" x2="18" y2="22"/>
            <line x1="14" y1="18" x2="22" y2="18"/>
        </svg>
        ),
    },
    {
        dimClass: 'car-dim-conectiv',
        iconColor: '#6080c4',
        category: 'Conectividade',
        title: `Relatório de ${dimensoesTitulo["conectividade"]} — Barcarena 2024`,
        date: '2025',
        dimensao: 'conectividade',
        pdfHref: '/pdfs/conectividade.pdf',
        icon: (
        <svg className="car-dim-icon" viewBox="0 0 36 36" fill="none" stroke="#6080c4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 13 C10 7 26 7 32 13"/>
            <path d="M8 18 C12 13 24 13 28 18"/>
            <path d="M12 23 C14 20 22 20 24 23"/>
            <circle cx="18" cy="29" r="2" fill="#6080c4" stroke="none"/>
        </svg>
        ),
    },
    {
        dimClass: 'car-dim-instituic',
        iconColor: '#E05A2B',
        category: 'Instituições Locais',
        title: `Relatório de ${dimensoesTitulo["instituicoes"]} — Barcarena 2024`,
        date: '2025',
        dimensao: 'instituicoes',
        pdfHref: '/pdfs/instituicoes.pdf',
        icon: (
        <svg className="car-dim-icon" viewBox="0 0 36 36" fill="none" stroke="#E05A2B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="31" x2="32" y2="31"/>
            <rect x="10" y="18" width="5" height="13"/>
            <rect x="21" y="18" width="5" height="13"/>
            <rect x="13" y="9" width="10" height="9"/>
            <polyline points="4,18 18,6 32,18"/>
        </svg>
        ),
    },
    ];

    const VISIBLE = 3;
    const CARDS = cards.length;
    const SPEED = 0.35;
    const totalDots = CARDS - VISIBLE + 1;
  const [current, setCurrent] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const bgRef      = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const outerRef   = useRef<HTMLDivElement>(null);
  const timerRef   = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Parallax ──────────────────────────────────────────────
  const updateParallax = useCallback(() => {
    const bg      = bgRef.current;
    const section = sectionRef.current;
    if (!bg || !section) return;
    const rect     = section.getBoundingClientRect();
    const viewH    = window.innerHeight;
    const progress = (rect.top + rect.height / 2 - viewH / 2) / viewH;
    const offset   = progress * rect.height * SPEED;
    bg.style.transform = `translateY(${offset}px)`;
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', updateParallax, { passive: true });
    window.addEventListener('resize', updateParallax);
    updateParallax();
    return () => {
      window.removeEventListener('scroll', updateParallax);
      window.removeEventListener('resize', updateParallax);
    };
  }, [updateParallax]);

  // ── Carrossel ─────────────────────────────────────────────
  const getStep = () => {
    if (!outerRef.current) return 0;
    return outerRef.current.offsetWidth / VISIBLE;
  };

  const go = useCallback((n: number) => {
    const next = Math.max(0, Math.min(n, CARDS - VISIBLE));
    setCurrent(next);
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${next * getStep()}px)`;
    }
  }, []);

  const kick = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent(c => {
        const next = c < CARDS - VISIBLE ? c + 1 : 0;
        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(-${next * getStep()}px)`;
        }
        return next;
      });
    }, 5000);
  }, []);

  useEffect(() => {
    kick();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [kick]);

  const prev = () => { go(current - 1); kick(); };
  const next = () => { go(current + 1); kick(); };

  return (
    <>
      <div style={{ background: 'var(--light)', padding: '3.5rem 3rem 2.5rem', textAlign: 'center' }}>
        <div className="sec-eyebrow">Publicações Recentes</div>
        <h2 className="sec-title">Relatórios & Pesquisas</h2>
        <p className="sec-sub">Baixe um artigo curto sobre uma das dimensões</p>
      </div>

      <section className="car-section" id="galeria" ref={sectionRef}>

        <div className="car-parallax-clip">
          <div className="car-parallax-bg" ref={bgRef}></div>
        </div>

        <div className="car-wrap">
          <div className="car-outer" ref={outerRef}>
            <div className="car-track" ref={trackRef}>
              {cards.map((card, i) => (
                <div className="car-card" key={i}>
                  <div className={`car-img ${card.dimClass}`}>
                    <div className="car-icon-wrap">
                      {card.icon}
                    </div>
                  </div>
                  <div className="car-body">
                    <div className="car-cat" style={{ color: card.iconColor }}>
                      {card.category}
                    </div>
                    <div className="car-title">{card.title}</div>
                    <div className="car-meta">
                      <span className="car-date">{card.date}</span>
                      <a className="car-download" onClick={(e) => {
                            e.preventDefault();
                            getArtigoDimensao(dimensoesTitulo[card.dimensao])
                        }}>
                        <DownloadIcon /> Baixar PDF
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="car-controls">
            <button className="car-btn" type="button" onClick={prev} disabled={current === 0}>
              &#8249;
            </button>
            <div className="car-dots-wrap">
              {Array.from({ length: totalDots }).map((_, i) => (
                <button
                  key={i}
                  className={`car-dot${i === current ? ' active' : ''}`}
                  onClick={() => { go(i); kick(); }}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
            <button className="car-btn" type="button" onClick={next} disabled={current === totalDots - 1}>
              &#8250;
            </button>
          </div>
        </div>

      </section>
    </>
  );
};

export default RelatoriosCarousel;