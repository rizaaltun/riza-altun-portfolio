/* Native canvas box with unmodified PDF textures and original photo interiors. */
class PirpirBox {
 constructor(canvas,assets){this.canvas=canvas;this.ctx=canvas.getContext('2d');this.assets=assets}
 draw(progress){
  const c=this.ctx,W=this.canvas.width,H=this.canvas.height;c.clearRect(0,0,W,H);
  const s=Math.min(W/3.1,H/4.2),oy=H*(.40+.20*Math.min(1,progress/.65));
  const yaw=.30-.08*progress;const P=(x,y,z)=>{const xx=x*Math.cos(yaw)+(y-1)*Math.sin(yaw),yy=-x*Math.sin(yaw)+(y-1)*Math.cos(yaw)+1;return [W/2+xx*s,oy+yy*s*.56-z*s*.86]};
  const poly=(pts,color)=>{c.beginPath();pts.forEach((p,i)=>i?c.lineTo(...p):c.moveTo(...p));c.closePath();c.fillStyle=color;c.fill();c.strokeStyle='rgba(110,65,10,.22)';c.lineWidth=W/1000;c.stroke()};
  const q=(x0,y0,x1,y1,z)=>[P(x0,y0,z),P(x1,y0,z),P(x1,y1,z),P(x0,y1,z)];
  const top=.24;const angle=Math.min(1,progress/.74)*Math.PI*.57;
  // Interior and fixed tray. Outside the physical box remains alpha transparent.
  poly(q(-1,0,1,2,0),'#f0e5cf');
  poly([P(-1,0,0),P(1,0,0),P(1,0,top),P(-1,0,top)],'#e9dfcf');
  // Only the supplied calendar and question-card artwork; no book or spread assets.
  if(this.assets.calendar)this.texture(this.assets.calendar,q(-.88,.18,.30,1.85,.03));
  if(this.assets.card)this.texture(this.assets.card,q(.10,.65,.84,1.83,.04));
  poly([P(-1,0,0),P(-1,0,top),P(-1,2,top),P(-1,2,0)],'#f09a16');
  poly([P(1,0,top),P(1,0,0),P(1,2,0),P(1,2,top)],'#e8890a');
  poly([P(-1,2,top),P(1,2,top),P(1,2,0),P(-1,2,0)],'#f8a51b');
  const backL=P(-1,0,top),backR=P(1,0,top);
  const y=2*Math.cos(angle),z=top+2*Math.sin(angle);
  const frontL=P(-1,y,z),frontR=P(1,y,z);const lid=[backL,backR,frontR,frontL];
  const outside=.56*Math.cos(angle)-.86*Math.sin(angle)>0;

  if(outside){poly(lid,'#00a995');this.texture(this.assets.cover,lid)}
  else {
   const g=c.createLinearGradient(backL[0],backL[1],frontL[0],frontL[1]);g.addColorStop(0,'#dedbd4');g.addColorStop(1,'#fffefa');poly(lid,g);
  }
  // Side tabs fold inward toward the lid center, never beyond its outside edges.
  const tuck=.10+.12*(1-Math.min(1,angle/1.8));
  for(const side of [-1,1]){const a=P(side,.12*Math.cos(angle),top+.12*Math.sin(angle)),b=P(side,1.87*Math.cos(angle),top+1.87*Math.sin(angle)),d=P(side-side*tuck,1.82*Math.cos(angle)+.16*Math.sin(angle),top+1.82*Math.sin(angle)-.16*Math.cos(angle)),e=P(side-side*tuck,.18*Math.cos(angle)+.16*Math.sin(angle),top+.18*Math.sin(angle)-.16*Math.cos(angle));if(!outside)poly([a,b,d,e],side<0?'#ddd8cc':'#eee9df')}
  // Printed front flap is attached to the moving lid, never to the base.
  const fy=y+.24*Math.sin(angle),fz=z-.24*Math.cos(angle);
  const flap=[frontL,frontR,P(1,fy,fz),P(-1,fy,fz)];
  if(angle<1.45){poly(flap,'#f7a519');this.texture(this.assets.flap,flap)}
  else{poly(flap,'#f4f0e7')}
 }
 texture(img,dest,source){
  const c=this.ctx;source=source||[[0,0],[img.width,0],[img.width,img.height],[0,img.height]];
  const point=(q,u,v)=>[(1-v)*((1-u)*q[0][0]+u*q[1][0])+v*((1-u)*q[3][0]+u*q[2][0]),(1-v)*((1-u)*q[0][1]+u*q[1][1])+v*((1-u)*q[3][1]+u*q[2][1])];
  const tri=(s,t)=>{let[a,b,d]=s,[e,f,g]=t,D=(b[0]-a[0])*(d[1]-a[1])-(d[0]-a[0])*(b[1]-a[1]);if(Math.abs(D)<1e-6)return;let A=((f[0]-e[0])*(d[1]-a[1])-(g[0]-e[0])*(b[1]-a[1]))/D,C=((g[0]-e[0])*(b[0]-a[0])-(f[0]-e[0])*(d[0]-a[0]))/D,B=((f[1]-e[1])*(d[1]-a[1])-(g[1]-e[1])*(b[1]-a[1]))/D,E=((g[1]-e[1])*(b[0]-a[0])-(f[1]-e[1])*(d[0]-a[0]))/D;
   c.save();let mid=[(e[0]+f[0]+g[0])/3,(e[1]+f[1]+g[1])/3],ex=p=>{let x=p[0]-mid[0],y=p[1]-mid[1],l=Math.hypot(x,y)||1;return[p[0]+x/l*.6,p[1]+y/l*.6]};c.beginPath();c.moveTo(...ex(e));c.lineTo(...ex(f));c.lineTo(...ex(g));c.closePath();c.clip();c.transform(A,B,C,E,e[0]-A*a[0]-C*a[1],e[1]-B*a[0]-E*a[1]);c.drawImage(img,0,0);c.restore()};
  c.save();c.beginPath();dest.forEach((p,i)=>i?c.lineTo(...p):c.moveTo(...p));c.closePath();c.clip();
  const n=12;for(let j=0;j<n;j++)for(let i=0;i<n;i++){let u=i/n,v=j/n,U=(i+1)/n,V=(j+1)/n,uv=[[u,v],[U,v],[U,V],[u,V]],s=uv.map(p=>point(source,...p)),t=uv.map(p=>point(dest,...p));tri([s[0],s[1],s[2]],[t[0],t[1],t[2]]);tri([s[0],s[2],s[3]],[t[0],t[2],t[3]])}c.restore();
 }
}
if(typeof module!=='undefined')module.exports=PirpirBox;
