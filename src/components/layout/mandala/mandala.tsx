import { useState } from "react";
import logo from "../../../assets/images/about/logo.png";

interface Dim {
  id: string;
  name: string;
  indicators: number;
  color: string;
  outerPath: string;
  innerPath: string;
  iconPath: string;
  iconTranslate: string;
  labelLines: { text: string; x: number; y: number }[];
  numX: number;
  numY: number;
}

const DIMS: Dim[] = [
  {
    id: "dim0",
    color: "#E07B3A",
    name: "Economia e Mercado de Trabalho",
    indicators: 13,
    outerPath: "M 303.534 30.023 A 270 270 0 0 1 470.830 90.914 L 410.723 164.481 A 175 175 0 0 0 302.291 125.015 Z",
    innerPath: "M 302.291 125.015 A 175 175 0 0 1 410.723 164.481 L 356.943 230.305 A 90 90 0 0 0 301.178 210.008 Z",
    iconTranslate: "translate(333.3,163.5)",
    iconPath: "M4 20 L10 12 L14 16 L20 6 M20 6 L16 6 M20 6 L20 10",
    labelLines: [
      { text: "ECONOMIA E",  x: 376.10, y: 79.92  },
      { text: "MERCADO DE",  x: 376.10, y: 90.92  },
      { text: "TRABALHO",    x: 376.10, y: 101.92 },
    ],
    numX: 350.11, numY: 162.34,
  },
  {
    id: "dim1",
    color: "#5DA84E",
    name: "Meio Ambiente e Saneamento",
    indicators: 6,
    outerPath: "M 476.245 95.457 A 270 270 0 0 1 565.262 249.639 L 471.929 267.358 A 175 175 0 0 0 414.233 167.426 Z",
    innerPath: "M 414.233 167.426 A 175 175 0 0 1 471.929 267.358 L 388.421 283.213 A 90 90 0 0 0 358.748 231.819 Z",
    iconTranslate: "translate(402.7,221.8)",
    iconPath: "M12 3 C12 3 4 10 4 15 C4 19 7.5 22 12 22 C16.5 22 20 19 20 15 C20 10 12 3 12 3Z M12 22 L12 14 M12 17 C9 15 7 14 6 16",
    labelLines: [
      { text: "MEIO AMBIENTE", x: 492.69, y: 183.25 },
      { text: "E SANEAMENTO",  x: 492.69, y: 194.25 },
    ],
    numX: 426.87, numY: 226.75,
  },
  {
    id: "dim2",
    color: "#4A9A6A",
    name: "Educação, Cultura, Esporte e Lazer",
    indicators: 6,
    outerPath: "M 566.489 256.600 A 270 270 0 0 1 535.574 431.928 L 452.687 385.509 A 175 175 0 0 0 472.724 271.870 Z",
    innerPath: "M 472.724 271.870 A 175 175 0 0 1 452.687 385.509 L 378.525 343.976 A 90 90 0 0 0 388.830 285.533 Z",
    iconTranslate: "translate(418.5,311.0)",
    iconPath: "M3 12 L12 5 L21 12 L21 20 L3 20 L3 12Z M9 20 L9 14 L15 14 L15 20",
    labelLines: [
      { text: "EDUCAÇÃO,",       x: 519.12, y: 327.64 },
      { text: "CULTURA,",        x: 519.12, y: 338.64 },
      { text: "ESPORTE E LAZER", x: 519.12, y: 349.64 },
    ],
    numX: 444.27, numY: 325.44,
  },
  {
    id: "dim3",
    color: "#D4873A",
    name: "Mobilidade",
    indicators: 5,
    outerPath: "M 532.040 438.049 A 270 270 0 0 1 395.659 552.487 L 362.001 463.649 A 175 175 0 0 0 450.396 389.476 Z",
    innerPath: "M 450.396 389.476 A 175 175 0 0 1 362.001 463.649 L 331.886 384.162 A 90 90 0 0 0 377.347 346.016 Z",
    iconTranslate: "translate(373.2,389.5)",
    iconPath: "M3 14 L3 10 C3 8 5 6 7 6 L17 6 C19 6 21 8 21 10 L21 14 M1 14 L23 14 M6 18 A2 2 0 1 0 10 18 A2 2 0 1 0 6 18 M14 18 A2 2 0 1 0 18 18 A2 2 0 1 0 14 18",
    labelLines: [
      { text: "MOBILIDADE", x: 443.02, y: 470.44 },
    ],
    numX: 394.17, numY: 412.23,
  },
  {
    id: "dim4",
    color: "#3A7DC0",
    name: "Ordenamento Territorial e Habitação",
    indicators: 14,
    outerPath: "M 389.016 554.904 A 270 270 0 0 1 210.984 554.904 L 242.304 465.216 A 175 175 0 0 0 357.696 465.216 Z",
    innerPath: "M 357.696 465.216 A 175 175 0 0 1 242.304 465.216 L 270.328 384.968 A 90 90 0 0 0 329.672 384.968 Z",
    iconTranslate: "translate(288.0,420.5)",
    iconPath: "M12 3 L20 9 L20 20 L4 20 L4 9 Z M9 20 L9 14 L15 14 L15 20 M12 3 L4 9",
    labelLines: [
      { text: "ORDENAMENTO",   x: 300.00, y: 511.50 },
      { text: "TERRITORIAL E", x: 300.00, y: 522.50 },
      { text: "HABITAÇÃO",     x: 300.00, y: 533.50 },
    ],
    numX: 300.00, numY: 446.50,
  },
  {
    id: "dim5",
    color: "#5BB87A",
    name: "Segurança",
    indicators: 17,
    outerPath: "M 204.341 552.487 A 270 270 0 0 1 67.960 438.049 L 149.604 389.476 A 175 175 0 0 0 237.999 463.649 Z",
    innerPath: "M 237.999 463.649 A 175 175 0 0 1 149.604 389.476 L 222.653 346.016 A 90 90 0 0 0 268.114 384.162 Z",
    iconTranslate: "translate(202.8,389.5)",
    iconPath: "M12 2 L20 6 L20 13 C20 17.5 16.5 21 12 22 C7.5 21 4 17.5 4 13 L4 6 Z M9 12 L11 14 L15 10",
    labelLines: [
      { text: "SEGURANÇA", x: 156.98, y: 470.44 },
    ],
    numX: 205.83, numY: 412.23,
  },
  {
    id: "dim6",
    color: "#48ABAA",
    name: "Saúde",
    indicators: 18,
    outerPath: "M 64.426 431.928 A 270 270 0 0 1 33.511 256.600 L 127.276 271.870 A 175 175 0 0 0 147.313 385.509 Z",
    innerPath: "M 147.313 385.509 A 175 175 0 0 1 127.276 271.870 L 211.170 285.533 A 90 90 0 0 0 221.475 343.976 Z",
    iconTranslate: "translate(157.5,311.0)",
    iconPath: "M12 21 C12 21 4 16 4 10 C4 6 7 3 10 3 C11 3 12 4 12 4 C12 4 13 3 14 3 C17 3 20 6 20 10 C20 16 12 21 12 21Z M12 10 L12 14 M10 12 L14 12",
    labelLines: [
      { text: "SAÚDE", x: 80.88, y: 338.64 },
    ],
    numX: 155.73, numY: 325.44,
  },
  {
    id: "dim7",
    color: "#5EB5D4",
    name: "Conectividade",
    indicators: 5,
    outerPath: "M 34.738 249.639 A 270 270 0 0 1 123.755 95.457 L 185.767 167.426 A 175 175 0 0 0 128.071 267.358 Z",
    innerPath: "M 128.071 267.358 A 175 175 0 0 1 185.767 167.426 L 241.252 231.819 A 90 90 0 0 0 211.579 283.213 Z",
    iconTranslate: "translate(173.3,221.8)",
    iconPath: "M5 12.5 C7.5 9.5 16.5 9.5 19 12.5 M8 15.5 C9.5 13.5 14.5 13.5 16 15.5 M11 18.5 C11.5 17.5 12.5 17.5 13 18.5 M12 20 A0.5 0.5 0 1 0 13 20",
    labelLines: [
      { text: "CONECTIVIDADE", x: 107.31, y: 188.75 },
    ],
    numX: 173.13, numY: 226.75,
  },
  {
    id: "dim8",
    color: "#3A65B0",
    name: "Instituições Locais",
    indicators: 6,
    outerPath: "M 129.170 90.914 A 270 270 0 0 1 296.466 30.023 L 297.709 125.015 A 175 175 0 0 0 189.277 164.481 Z",
    innerPath: "M 189.277 164.481 A 175 175 0 0 1 297.709 125.015 L 298.822 210.008 A 90 90 0 0 0 243.057 230.305 Z",
    iconTranslate: "translate(242.7,163.5)",
    iconPath: "M3 21 L21 21 M5 21 L5 10 M19 21 L19 10 M12 3 L20 10 L4 10 Z M9 21 L9 15 L15 15 L15 21",
    labelLines: [
      { text: "INSTITUIÇÕES", x: 223.90, y: 85.42 },
      { text: "LOCAIS",       x: 223.90, y: 96.42 },
    ],
    numX: 249.89, numY: 162.34,
  },
];

export default function Mandala() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="mandala-container">
      <svg
        id="mandala-svg"
        viewBox="0 0 600 600"
        xmlns="http://www.w3.org/2000/svg"
        className="mandala-svg"
        role="img"
        aria-label="Mandala com as 9 dimensões do ODSB"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle cx="300" cy="300" r="274" fill="rgba(255,255,255,0.04)" stroke="#e0e8f0" strokeWidth="1" />

        {DIMS.map((dim, i) => {
          const isHov = hovered === i;
          const isDim = hovered !== null && hovered !== i;

          return (
            <g
              key={dim.id}
              className="dim-slice"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ opacity: isDim ? 0.55 : 1, transition: "opacity 200ms" }}
            >
              <path
  d={dim.outerPath}
  className="outer-slice"
  fill={dim.color}
  stroke="white"
  strokeWidth="2"
  style={{
    filter: isHov ? "brightness(1.15)" : "none",
    opacity: isHov ? 0.85 : 1,
    transition: "opacity 200ms, filter 200ms",
    // ← sem transform: scale aqui
  }}
/>

<path
  d={dim.innerPath}
  className="inner-slice"
  fill={dim.color}
  stroke="white"
  strokeWidth="1.5"
  style={{
    filter: isHov ? "brightness(1.1)" : "none",
    opacity: isHov ? 0.95 : 0.8,
    transition: "opacity 200ms, filter 200ms",
    // ← sem transform: scale aqui
  }}
/>

              <g transform={dim.iconTranslate} opacity="0.9" style={{ pointerEvents: "none" }}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={dim.iconPath} />
                </svg>
              </g>
            </g>
          );
        })}

        {/* Labels */}
        {DIMS.map((dim) =>
          dim.labelLines.map((line, li) => (
            <text
              key={`${dim.id}-label-${li}`}
              x={line.x}
              y={line.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="Sora, sans-serif"
              fontSize="10"
              fontWeight="700"
              fill="white"
              style={{ pointerEvents: "none", textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
            >
              {line.text}
            </text>
          ))
        )}

        {/* Números */}
        {DIMS.map((dim) => (
          <text
            key={`${dim.id}-num`}
            x={dim.numX}
            y={dim.numY}
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="IBM Plex Mono, monospace"
            fontSize="12"
            fontWeight="700"
            fill="white"
            opacity="0.95"
            style={{ pointerEvents: "none" }}
          >
            {dim.indicators}
          </text>
        ))}

        {/* Centro */}
        <circle cx="300" cy="300" r="92" fill="none" stroke="#4a5a6a" strokeWidth="10" />
        <circle cx="300" cy="300" r="86" fill="white" stroke="#e0e8f0" strokeWidth="2" />
        <image href={logo} x="258" y="262" width="84" height="84" />
      </svg>

      {/* Tooltip */}
      <div className={`mandala-tooltip${hovered !== null ? " visible" : ""}`}>
      </div>
    </div>
  );
}
