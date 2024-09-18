import styles from '../styles/BackgroundGalaxy.module.scss'
import ReactDOM from 'react-dom'
import { useRef } from 'react';
import { useEffect } from 'react';
import * as gsap from 'gsap';

class Circle {
  pos: Point;
  radius: number;
  color: string;
  active?: number;
  draw: () => void;
  constructor(pos:Point,rad:number,color:string,ctx:CanvasRenderingContext2D){
    this.pos = pos;
    this.radius = rad;
    this.color = color;
    this.draw = function() {
      if(!this.active) return;
      ctx.beginPath();
      ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = 'rgba(156,217,249,'+ this.active+')';
      ctx.fill();
  };
  }
};

type Point = {
  x: number;
  y: number;
  originX?: number;
  originY?: number;
  circle?: Circle;
  closest?: Point[];
  active?: number;
};

function BackgroundGalaxy(){
  const largeHeaderRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const largeHeader = largeHeaderRef.current;
    if (canvas && largeHeader) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        var width = window.innerWidth;
        var height = window.innerHeight;
        var target = {x:width/2,y:height/2};
        var animateHeader:boolean = true;

        canvas.width = width;
        canvas.height = height;

        var points: Point[] = [];
        //------------------------------//
        //add points
        //------------------------------//
        const getDistance = (p1: Point, p2: Point) => {
          return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
        }
        const drawLines = (p:Point) => {
          if(!p.active) return;
          for(var i in p.closest!) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p.closest[i].x, p.closest[i].y);
              ctx.strokeStyle = 'rgba(156,217,249,'+ p.active+')';
              ctx.stroke();
          }
      }
        const initHeader = ()=>{
          //create points
          for (var x = 0;x < width;x = x + width/20) {
            for(var y = 0; y < height; y = y + height/20) {
              var px = x + Math.random()*width/20;
              var py = y + Math.random()*height/20;
              var p = {x: px, originX: px, y: py, originY: py };
              points.push(p);
            }
          }
          //find 5 neibor for each point
          for(var i = 0; i < points.length; i++) {
            var closest = [];
            var p1 = points[i];
            for(var j = 0; j < points.length; j++) {
              var p2 = points[j]
              if(!(p1 === p2)) {
                var placed = false;
                for(var k = 0; k < 5; k++) {
                  if(!placed) {
                    if(closest[k] === undefined) {
                      closest[k] = p2;
                      placed = true;
                    }
                  }
                }
                for(var l = 0; l < 5; l++) {
                  if(!placed) {
                    if(getDistance(p1, p2) < getDistance(p1, closest[l])) {
                      closest[l] = p2;
                      placed = true;
                    }
                  }
                }
              }
            }
            p1.closest = closest;
          }
          for(const index in points) {
            let c:Circle = new Circle(points[index], 2+Math.random()*2, 'rgba(255,255,255,0.3)',ctx);
            points[index].circle = c;
          }
        }
        const mouseMove = (e:MouseEvent) => {
          var posX =0,posY = 0;
          if (e.pageX || e.pageY) {
              posX = e.pageX;
              posY = e.pageY;
          }
          else if (e.clientX || e.clientY)    {
              posX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
              posY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
          }
          target.x = posX;
          target.y = posY;
        }
        //------------------------------//
        //init anime
        //------------------------------//
        const animate = () => {
          if(animateHeader) {
              ctx.clearRect(0,0,width,height);
              for(var i in points) {
                  // detect points in range
                  if(Math.abs(getDistance(target, points[i])) < 4000) {
                    points[i].active = 0.3;
                    points[i].circle!.active = 0.6;
                  } else if(Math.abs(getDistance(target, points[i])) < 10000) {
                    points[i].active = 0.1;
                    points[i].circle!.active = 0.3;
                  } else if(Math.abs(getDistance(target, points[i])) < 20000) {
                    points[i].active = 0.02;
                    points[i].circle!.active = 0.1;
                  } else {
                    points[i].active = 0;
                    points[i].circle!.active = 0;
                  }
                  drawLines(points[i]);
                  points[i].circle!.draw();
              }
          }
          requestAnimationFrame(animate);
        }
        const shiftPoint = (p:Point) => {
          gsap.TweenLite.to(p, 1+1*Math.random(), {x:p.originX!-50+Math.random()*100,
              y: p.originY!-50+Math.random()*100, ease:gsap.Circ.easeInOut,
              onComplete: function() {
                  shiftPoint(p);
              }});
        }
        const initAnimation = ()=>{
          animate();
          for(var i in points) {
              shiftPoint(points[i]);
          }
        }
        //------------------------------//
        //addListeners
        //------------------------------//
        const scrollCheck = () => {
          if(document.body.scrollTop > height) animateHeader = false;
          else animateHeader = true;
        }

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            largeHeader.style.height = height+'px';
            canvas.width = width;
            canvas.height = height;
        }

        const addListeners = () => {
          if(!('ontouchstart' in window)) {
              window.addEventListener('mousemove', mouseMove);
          }
          window.addEventListener('scroll', scrollCheck);
          window.addEventListener('resize', resize);
        }
        initHeader();
        initAnimation();
        addListeners();
      }
    }
  },[])

  return ReactDOM.createPortal(
    <div ref={largeHeaderRef} className={styles.largeHeader}>
      <canvas ref={canvasRef}></canvas>
    </div>,
    document.body
  )
}

export default BackgroundGalaxy