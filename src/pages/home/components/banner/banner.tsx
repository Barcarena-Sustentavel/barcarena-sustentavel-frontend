import { useEffect, useRef } from "react";
import "./banner.css"

const Banner: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    interface Point{
        x: number,
        y: number,
        r: number,
        colorFn: ((a: number) => string),
        alpha: number, 
        phase: number,
        sp: number
    }

    interface FloatItem{
        x: number,
        y: number,
        vy: number,
        al: number,
        sz: number,
        cFn: ((a: number) => string),
        tx: string
    }

    interface Particle{
        x: number,
        vx: number,
        y: number,
        vy: number,
        r: number,
        colorFn: ((a: number) => string),
        alpha: number
    }


    useEffect(() => {
        let animFrameId: number;
        let cancelled = false;

        const canvas = canvasRef.current;
        if (!canvas) return;
        let ctx = canvas.getContext('2d');
        if (!ctx) return;
        // var W, H, t = 0;
        let W: number, H: number, t: number = 0;
        let C = {
            green:  '#8DC63F',
            orange: '#E05A2B',
            gray:   '#C8D8EE',
            blue:   '#2A6CC4',
            greenA: function(a: number){ return 'rgba(141,198,63,'+a+')'; },
            orangeA:function(a: number){ return 'rgba(224,90,43,'+a+')'; },
            grayA:  function(a: number){ return 'rgba(200,216,238,'+a+')'; },
            blueA:  function(a: number){ return 'rgba(42,108,196,'+a+')'; },
        };

        /* stats de Barcarena — declarados no topo para estarem prontos no resize() */
        let ST=['154k hab','IDH 0.58','PIB +6.2%','42k emp','IDEB 5.1','ESF 74%',
                'R2=0.93','17 PA','74% agua','2024','Dt+4.4%','n=847',
                '6.200','3.8%','95% CI','29 ESF','b=0.70','s=0.08','p<0.01'];
        let fl: FloatItem[] = [];

        function resize(canvas: HTMLCanvasElement){
            W = canvas.width  = canvas.offsetWidth;
            H = canvas.height = canvas.offsetHeight;
            initAll();
        }

        const handleResize = () => {resize(canvas)};
        window.addEventListener('resize', handleResize);
        handleResize();

        function drawGrid(ctx: CanvasRenderingContext2D){
            var step = 60;
            ctx.lineWidth = 0.5;
            for(var x = 0; x < W; x += step){
            var a = (Math.sin(t*0.005 + x*0.015)*0.5+0.5)*0.06 + 0.02;
            ctx.strokeStyle = C.grayA(a);
            ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke();
            }
            for(var y = 0; y < H; y += step){
            var a2 = (Math.cos(t*0.004 + y*0.012)*0.5+0.5)*0.06 + 0.02;
            ctx.strokeStyle = C.grayA(a2);
            ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke();
            }
        }

        // const handleDrawGrid = () => { drawGrid(ctx) }

        var tsData: number[] = [];

        function handleInitTS(){ if (!ctx) return; initTS(ctx) };

        function initTS(ctx: CanvasRenderingContext2D){
            tsData = [];
            var v = 0.5;
            for(var i=0;i<80;i++){
            v += (Math.random()-0.48)*0.035;
            v = Math.max(0.1, Math.min(0.9, v));
            tsData.push(v);
            }
        }

        function drawTS(ctx: CanvasRenderingContext2D){
            var x0=W*0.03, x1=W*0.44, y0=H*0.08, y1=H*0.42;
            var n = tsData.length;
            var drawTo = Math.min(n, Math.floor(t/1.5)+1);

            /* eixos */
            ctx.strokeStyle = C.grayA(0.20); ctx.lineWidth=0.7;
            ctx.beginPath(); ctx.moveTo(x0,y0); ctx.lineTo(x0,y1); ctx.lineTo(x1,y1); ctx.stroke();

            /* ticks eixo Y */
            ctx.font='8px IBM Plex Mono,monospace'; ctx.fillStyle=C.grayA(0.30); ctx.textAlign='right';
            [0,25,50,75,100].forEach(function(v,i){
            var y = y1 - (v/100)*(y1-y0);
            ctx.fillText(v+'%', x0-4, y+3);
            ctx.strokeStyle=C.grayA(0.12); ctx.lineWidth=0.5;
            ctx.beginPath(); ctx.moveTo(x0,y); ctx.lineTo(x1,y); ctx.stroke();
            });
            ctx.textAlign='left';

            /* label */
            ctx.fillStyle=C.grayA(0.28); ctx.font='9px IBM Plex Mono,monospace';
            ctx.fillText('SÉRIE TEMPORAL — IDH', x0+2, y0-4);

            /* banda CI */
            ctx.beginPath();
            for(var i=0;i<drawTo;i++){
            var px=x0+(i/(n-1))*(x1-x0), ci=0.07;
            var py=y0+(1-tsData[i])*(y1-y0);
            i===0?ctx.moveTo(px,py-ci*(y1-y0)):ctx.lineTo(px,py-ci*(y1-y0));
            }
            for(var i=drawTo-1;i>=0;i--){
            var px=x0+(i/(n-1))*(x1-x0), ci=0.07;
            var py=y0+(1-tsData[i])*(y1-y0);
            ctx.lineTo(px,py+ci*(y1-y0));
            }
            ctx.closePath();
            ctx.fillStyle=C.greenA(0.07); ctx.fill();

            /* linha principal */
            ctx.beginPath();
            for(var i=0;i<drawTo;i++){
            var px=x0+(i/(n-1))*(x1-x0);
            var py=y0+(1-tsData[i])*(y1-y0);
            i===0?ctx.moveTo(px,py):ctx.lineTo(px,py);
            }
            var grd=ctx.createLinearGradient(x0,0,x1,0);
            grd.addColorStop(0,C.greenA(0.15));
            grd.addColorStop(0.5,C.greenA(0.55));
            grd.addColorStop(1,C.orangeA(0.55));
            ctx.strokeStyle=grd; ctx.lineWidth=1.8; ctx.stroke();

            /* ponto atual */
            if(drawTo>0){
            var lx=x0+((drawTo-1)/(n-1))*(x1-x0);
            var ly=y0+(1-tsData[drawTo-1])*(y1-y0);
            ctx.beginPath(); ctx.arc(lx,ly,3,0,Math.PI*2);
            ctx.fillStyle=C.orange; ctx.globalAlpha=0.9; ctx.fill();
            ctx.globalAlpha=1;
            }
        }

        var scatterPts: Point[] =[];
        function initScatter(){
            scatterPts=[];
            var ax=W*0.56, ay=H*0.42, pw=W*0.40, ph=H*0.34;
            var clusters=[
            {cx:0.15,cy:0.75,s:0.08,color:C.greenA,n:16},
            {cx:0.50,cy:0.45,s:0.09,color:C.grayA, n:14},
            {cx:0.80,cy:0.18,s:0.07,color:C.orangeA,n:12},
            ];
            clusters.forEach(function(cl){
            for(var i=0;i<cl.n;i++){
                scatterPts.push({
                x: ax+30+(cl.cx+(Math.random()-.5)*cl.s*2)*pw,
                y: ay-(cl.cy+(Math.random()-.5)*cl.s*2)*ph,
                r: Math.random()*2.5+1.2,
                colorFn: cl.color,
                alpha: Math.random()*0.4+0.4,
                phase: Math.random()*Math.PI*2,
                sp: 0.015+Math.random()*0.01,
                });
            }
            });
        }
        function drawScatter(ctx: CanvasRenderingContext2D){
            var ax=W*0.56, ay=H*0.42, pw=W*0.40, ph=H*0.34;

            ctx.strokeStyle=C.grayA(0.20); ctx.lineWidth=0.7;
            ctx.beginPath(); ctx.moveTo(ax,H*0.08); ctx.lineTo(ax,ay); ctx.lineTo(ax+pw,ay); ctx.stroke();
            ctx.fillStyle=C.grayA(0.28); ctx.font='9px IBM Plex Mono,monospace'; ctx.textAlign='left';
            ctx.fillText('SCATTER — PIB vs IDH', ax+2, H*0.06);

            /* eixo X labels */
            ctx.font='8px IBM Plex Mono,monospace'; ctx.fillStyle=C.grayA(0.25); ctx.textAlign='center';
            ['2019','2020','2021','2022','2023','2024'].forEach(function(l,i){
                var x=ax+30+i*((pw-30)/5);
                ctx.fillText(l, x, ay+12);
                ctx.strokeStyle=C.grayA(0.12); ctx.lineWidth=0.4;
                ctx.beginPath(); ctx.moveTo(x,ay); ctx.lineTo(x,ay+4); ctx.stroke();
            });
            ctx.textAlign='left';

            scatterPts.forEach(function(p: Point){
                p.phase+=p.sp;
                var pulse=1+Math.sin(p.phase)*0.2;
                ctx.beginPath(); ctx.arc(p.x,p.y,p.r*pulse,0,Math.PI*2);
                ctx.fillStyle=p.colorFn(p.alpha*(0.7+Math.sin(p.phase)*0.3)); ctx.fill();
                ctx.beginPath(); ctx.arc(p.x,p.y,p.r*pulse*3,0,Math.PI*2);
                ctx.fillStyle=p.colorFn(0.05); ctx.fill();
            });

            var prog=Math.min(1,t/120);
            var rx1=ax+30, ry1=ay-0.1*ph, rx2=ax+30+prog*(pw-30)*0.92, ry2=ry1-prog*ph*0.72;
            var rg=ctx.createLinearGradient(rx1,ry1,rx2,ry2);
            rg.addColorStop(0,C.grayA(0.1)); rg.addColorStop(0.4,C.greenA(0.5)); rg.addColorStop(1,C.orangeA(0.7));
            ctx.strokeStyle=rg; ctx.lineWidth=1.5; ctx.setLineDash([5,3]);
            ctx.beginPath(); ctx.moveTo(rx1,ry1); ctx.lineTo(rx2,ry2); ctx.stroke();
            ctx.setLineDash([]);
            if(prog>0.75){
            var fa=(prog-0.75)/0.25;
            ctx.fillStyle=C.greenA(fa*0.7); ctx.font='bold 10px IBM Plex Mono,monospace';
            ctx.fillText('R²=0.93', rx2-44, ry2-8);
            }
        }


        var particles: Particle[] =[];
        function initParticles(){
            particles=[];
            for(var i=0;i<35;i++){
            particles.push({
                x:Math.random()*W, y:Math.random()*H,
                vx:(Math.random()-.5)*0.18, vy:(Math.random()-.5)*0.18,
                r:Math.random()*1.2+0.4,
                colorFn:[C.greenA,C.orangeA,C.grayA,C.blueA][Math.floor(Math.random()*4)],
                alpha:Math.random()*0.18+0.06,
            });
            }
        }
        function drawParticles(ctx: CanvasRenderingContext2D){
            particles.forEach(function(p){
                p.x+=p.vx; p.y+=p.vy;
                if(p.x<0)p.x=W; if(p.x>W)p.x=0;
                if(p.y<0)p.y=H; if(p.y>H)p.y=0;
                ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
                ctx.fillStyle=p.colorFn(p.alpha); ctx.fill();
                });
        }

        /* stats subindo */
        function initFloats(){
            fl=[];
            var cnt=Math.max(16,Math.min(28,Math.floor(W/55)));
            var cFns=[C.greenA,C.orangeA,C.blueA,C.grayA];
            for(var i=0;i<cnt;i++){
            fl.push({
                x:Math.random()*W,
                y:H+Math.random()*H,
                vy:0.28+Math.random()*0.42,
                al:Math.random()*0.35+0.10,
                sz:Math.floor(Math.random()*3),
                cFn:cFns[Math.floor(Math.random()*cFns.length)],
                tx:ST[Math.floor(Math.random()*ST.length)]
            });
            }
        }
        function drawFloats(ctx: CanvasRenderingContext2D){
            var szs=['7px','9px','11px'];
            fl.forEach(function(f){
            f.y-=f.vy;
            if(f.y<-20){
                f.y=H+Math.random()*50; f.x=Math.random()*W;
                f.tx=ST[Math.floor(Math.random()*ST.length)];
                f.vy=0.28+Math.random()*0.42;
                f.al=Math.random()*0.35+0.10;
                f.cFn=[C.greenA,C.orangeA,C.blueA,C.grayA][Math.floor(Math.random()*4)];
            }
            var a=f.al*(f.y<H*0.15?f.y/(H*0.15):1);
            ctx.font=szs[f.sz]+' IBM Plex Mono,monospace';
            ctx.fillStyle=f.cFn(a);
            ctx.textAlign='center';
            ctx.fillText(f.tx,f.x,f.y);
            });
            ctx.textAlign='left';
        }

        function initAll(){ handleInitTS(); initScatter(); initParticles(); initFloats(); }
        initAll();

        function animate(){
            t++;
            if (cancelled) return; // ← para o loop se o componente desmontou
            if (!ctx) return;
            const start = performance.now();
            ctx.clearRect(0,0,W,H);
            drawGrid(ctx);
            drawFloats(ctx);
            drawTS(ctx);
            drawScatter(ctx);
            drawParticles(ctx);
            animFrameId = requestAnimationFrame(animate); // guarda o id
            const frameTime = performance.now() - start;
            if (frameTime > 16) console.warn(`Frame lento: ${frameTime.toFixed(1)}ms`);
        }
        animate();

        return () => {
            console.log('cleanup rodou');
            cancelled = true; // ← impede qualquer frame futuro
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animFrameId);
        };

    }, []);

  return (
    <section className="hero" id="inicio">
      <canvas id="heroCanvas" ref={canvasRef}></canvas>
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <div className="hero-tag">📍 Barcarena, Pará — Amazônia</div>

        <h1>
          Observatório do<br />
          <em>Desenvolvimento Sustentável</em><br />
          de Barcarena
        </h1>

        <p className="hero-sub">
          Análises estatísticas dos principais indicadores do desenvolvimento
          sustentável para uma tomada de decisão mais qualificada.
        </p>

        <div className="hero-btns">
          <a href="#dimensoes" className="btn-prim">Explorar Indicadores</a>
          <a href="#" className="btn-out">Saiba Mais →</a>
        </div>
      </div>

      <div className="scroll-hint">
        <span>Rolar</span>
        <svg viewBox="0 0 24 24">
          <path d="M12 16l-6-6h12z" />
        </svg>
      </div>
    </section>
  );
};

export default Banner;