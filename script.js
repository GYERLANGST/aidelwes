/* ---------- INTERACTIVE RED-NEON BG ---------- */
const canvas=document.createElement('canvas');
const ctx=canvas.getContext('2d');
const cyberBg=document.getElementById('cyberBg');
cyberBg.appendChild(canvas);

let w=canvas.width=innerWidth;
let h=canvas.height=innerHeight;
const particles=[];
const maxParticles=60;

class Dot{
  constructor(){
    this.x=Math.random()*w;
    this.y=Math.random()*h;
    this.size=Math.random()*2.5+1;
    this.speedX=Math.random()*.4-.2;
    this.speedY=Math.random()*.4-.2;
   this.color=Math.random()<.5?'#f8f6f9ff':'#dcfd03ff'; // biru-muda neon
    this.opacity=Math.random()*.5+.2;
  }
  update(){
    this.x+=this.speedX;
    this.y+=this.speedY;
    if(this.x<0||this.x>w) this.speedX*=-1;
    if(this.y<0||this.y>h) this.speedY*=-1;
  }
  draw(){
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
    ctx.globalAlpha=this.opacity;
    ctx.fillStyle=this.color;
    ctx.shadowBlur=15;
    ctx.shadowColor=this.color;
    ctx.fill();
    ctx.shadowBlur=0;
  }
}

function init(){
  for(let i=0;i<maxParticles;i++) particles.push(new Dot());
}
function animate(){
  ctx.clearRect(0,0,w,h);
  particles.forEach(p=>{p.update();p.draw();});
  requestAnimationFrame(animate);
}
init();animate();

/* mouse / touch interactive */
window.addEventListener('mousemove',e=>{
  const tx=e.clientX;
  const ty=e.clientY;
  particles.forEach(p=>{
    const dx=tx-p.x;
    const dy=ty-p.y;
    const dist=Math.hypot(dx,dy);
    if(dist<120){
      const angle=Math.atan2(dy,dx);
      const force=(120-dist)/120;
      p.x-=Math.cos(angle)*force*2;
      p.y-=Math.sin(angle)*force*2;
    }
  });
});
window.addEventListener('touchmove',e=>{
  const t=e.touches[0];
  window.dispatchEvent(new MouseEvent('mousemove',{clientX:t.clientX,clientY:t.clientY}));
});

addEventListener('resize',()=>{
  w=canvas.width=innerWidth;
  h=canvas.height=innerHeight;
});

/* ---------- REVEAL CARD ---------- */
const cards=document.querySelectorAll('.member-card');
const reveal=()=>{
  const trigger=window.innerHeight*.85;
  cards.forEach(c=>{
    if(c.getBoundingClientRect().top<trigger) c.classList.add('show');
  });
};
addEventListener('load',reveal);
addEventListener('scroll',reveal);