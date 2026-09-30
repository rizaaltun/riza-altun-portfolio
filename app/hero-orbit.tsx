"use client";
import {Canvas,useFrame,useThree} from "@react-three/fiber";
import {Environment,Float} from "@react-three/drei";
import {useEffect,useRef,useState} from "react";
import type {Mesh,PerspectiveCamera} from "three";

function KineticObject(){
 const knot=useRef<Mesh>(null);
 const {camera,size}=useThree();
 useEffect(()=>{const c=camera as PerspectiveCamera;const halfAngle=Math.atan(Math.tan(c.fov*Math.PI/360)*Math.min(1,size.width/size.height));c.position.z=Math.max(6.5,2.6/Math.sin(halfAngle));c.updateProjectionMatrix()},[camera,size.width,size.height]);
 useFrame((state,delta)=>{if(!knot.current)return;knot.current.rotation.x+=delta*.16;knot.current.rotation.y+=delta*.22;knot.current.position.y=Math.sin(state.clock.elapsedTime*.7)*.12});
 return <Float speed={1.7} rotationIntensity={.6} floatIntensity={.8}><mesh ref={knot}><torusKnotGeometry args={[1.1,.32,120,20]}/><meshStandardMaterial color="#91ADC8" roughness={.28} metalness={.55}/></mesh></Float>;
}
function OrbitFallback(){return <svg className="orbit-fallback" viewBox="0 0 500 500" role="presentation"><g fill="none" stroke="currentColor" strokeWidth="18"><ellipse cx="250" cy="250" rx="165" ry="92" transform="rotate(32 250 250)"/><ellipse cx="250" cy="250" rx="165" ry="92" transform="rotate(148 250 250)"/><ellipse cx="250" cy="250" rx="78" ry="170"/></g></svg>}

export default function HeroOrbit(){
 const [supported,setSupported]=useState<boolean|null>(null);
 useEffect(()=>{try{const canvas=document.createElement("canvas");const gl=canvas.getContext("webgl2")||canvas.getContext("webgl");setSupported(Boolean(gl));gl?.getExtension("WEBGL_lose_context")?.loseContext()}catch{setSupported(false)}},[]);
 if(supported!==true)return <OrbitFallback/>;
 return <Canvas camera={{position:[0,0,6.5],fov:45}} dpr={[1,1.25]}><ambientLight intensity={1.2}/><directionalLight position={[3,3,3]} intensity={2.2}/><KineticObject/><Environment preset="city"/></Canvas>;
}
