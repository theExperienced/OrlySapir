const ImprovedNoise = function () {
  
    let p = [151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,
      23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,
      174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,
      133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,
      89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,
      202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,
      248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,
      178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,
      14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,
      93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];
      
      for (let i=0; i < 256 ; i++) {
        
        p[256+i] = p[i];
        
      }
      
      function fade(t) {
        
        return t * t * t * (t * (t * 6 - 15) + 10);
        
      }
      
      function lerp(t, a, b) {
        
        return a + t * (b - a);
        
      }
      
      function grad(hash, x, y, z) {
        
        let h = hash & 15;
        let u = h < 8 ? x : y, v = h < 4 ? y : h == 12 || h == 14 ? x : z;
        return ((h&1) == 0 ? u : -u) + ((h&2) == 0 ? v : -v);
        
      }
      
      return {
        
        noise: function (x, y, z) {
          
          let floorX = Math.floor(x), floorY = Math.floor(y), floorZ = Math.floor(z);
          
          let X = floorX & 255, Y = floorY & 255, Z = floorZ & 255;
          
          x -= floorX;
          y -= floorY;
          z -= floorZ;
          
          let xMinus1 = x -1, yMinus1 = y - 1, zMinus1 = z - 1;
          
          let u = fade(x), v = fade(y), w = fade(z);
          
          let A = p[X]+Y, AA = p[A]+Z, AB = p[A+1]+Z, B = p[X+1]+Y, BA = p[B]+Z, BB = p[B+1]+Z;
          
          return lerp(w, lerp(v, lerp(u, grad(p[AA], x, y, z), 
          grad(p[BA], xMinus1, y, z)),
          lerp(u, grad(p[AB], x, yMinus1, z),
          grad(p[BB], xMinus1, yMinus1, z))),
          lerp(v, lerp(u, grad(p[AA+1], x, y, zMinus1),
          grad(p[BA+1], xMinus1, y, z-1)),
          lerp(u, grad(p[AB+1], x, yMinus1, zMinus1),
          grad(p[BB+1], xMinus1, yMinus1, zMinus1))));
          
        }
      }
    }
    
    
    
    
    
    
    
    
    class Perlin {
      constructor() {
        this.grad3 =    
        [[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0], 
        [1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1], 
        [0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]]; 
        this.p = [];
        for (let i=0; i<256; i++) {
          this.p[i] = Math.floor(Math.random()*256);
        }
        
        
        this.perm = []; 
        for(let i=0; i<512; i++) {
          this.perm[i]=this.p[i & 255];
        } 
        
        
        
        this.simplex = [ 
          [0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0], 
          [0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0], 
          [0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0], 
          [1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0], 
          [1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0], 
          [0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0], 
          [2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0], 
          [2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]; 
        }
        
        dot(g, x, y) { 
          return g[0]*x + g[1]*y;
        }
        
        noise(xin, yin) { 
          let n0, n1, n2; 
          
          let F2 = 0.5*(Math.sqrt(3.0)-1.0); 
          let s = (xin+yin)*F2; 
          let i = Math.floor(xin+s); 
          let j = Math.floor(yin+s); 
          let G2 = (3.0-Math.sqrt(3.0))/6.0; 
          let t = (i+j)*G2; 
          let X0 = i-t; 
          let Y0 = j-t; 
          let x0 = xin-X0; 
          let y0 = yin-Y0; 
          
          
          let i1, j1; 
          if(x0>y0) {i1=1; j1=0;} 
          else {i1=0; j1=1;}      
          
          
          
          let x1 = x0 - i1 + G2; 
          let y1 = y0 - j1 + G2; 
          let x2 = x0 - 1.0 + 2.0 * G2; 
          let y2 = y0 - 1.0 + 2.0 * G2; 
          
          let ii = i & 255; 
          let jj = j & 255; 
          let gi0 = this.perm[ii+this.perm[jj]] % 12; 
          let gi1 = this.perm[ii+i1+this.perm[jj+j1]] % 12; 
          let gi2 = this.perm[ii+1+this.perm[jj+1]] % 12; 
          
          let t0 = 0.5 - x0*x0-y0*y0; 
          if(t0<0) n0 = 0.0; 
          else { 
            t0 *= t0; 
            n0 = t0 * t0 * this.dot(this.grad3[gi0], x0, y0);  
          } 
          let t1 = 0.5 - x1*x1-y1*y1; 
          if(t1<0) n1 = 0.0; 
          else { 
            t1 *= t1; 
            n1 = t1 * t1 * this.dot(this.grad3[gi1], x1, y1); 
          }
          let t2 = 0.5 - x2*x2-y2*y2; 
          if(t2<0) n2 = 0.0; 
          else { 
            t2 *= t2; 
            n2 = t2 * t2 * this.dot(this.grad3[gi2], x2, y2); 
          } 
          
          
          return 70.0 * (n0 + n1 + n2); 
        }
      }
      
      
      
const perlin = new Perlin();





///////////////3d NOISE


const perlinNoise3d = (function() {

  // Based on http://mrl.nyu.edu/~perlin/noise/
  // Adapting from runemadsen/rune.noise.js
  // Which was adapted from P5.js
  // Which was adapted from PApplet.java
  // which was adapted from toxi
  // which was adapted from the german demo group farbrausch as used in their demo "art": http://www.farb-rausch.de/fr010src.zip

  var PERLIN_YWRAPB = 4;
  var PERLIN_YWRAP = 1<<PERLIN_YWRAPB;
  var PERLIN_ZWRAPB = 8;
  var PERLIN_ZWRAP = 1<<PERLIN_ZWRAPB;
  var PERLIN_SIZE = 4095;

  var SINCOS_PRECISION = 0.5;
  var SINCOS_LENGTH = Math.floor(360 / SINCOS_PRECISION);
  var sinLUT = new Array(SINCOS_LENGTH);
  var cosLUT = new Array(SINCOS_LENGTH);
  var DEG_TO_RAD = Math.PI/180.0;
  for (var i = 0; i < SINCOS_LENGTH; i++) {
      sinLUT[i] = Math.sin(i * DEG_TO_RAD * SINCOS_PRECISION);
      cosLUT[i] = Math.cos(i * DEG_TO_RAD * SINCOS_PRECISION);
  }

  var perlin_PI = SINCOS_LENGTH;
      perlin_PI >>= 1;

  var Noise = function() {
    this.perlin_octaves = 4; // default to medium smooth
    this.perlin_amp_falloff = 0.5; // 50% reduction/octave
    this.perlin = null;
  }

  Noise.prototype = {

    noiseSeed: function(seed) {

      // Linear Congruential Generator
      // Variant of a Lehman Generator
      var lcg = (function() {
        // Set to values from http://en.wikipedia.org/wiki/Numerical_Recipes
        // m is basically chosen to be large (as it is the max period)
        // and for its relationships to a and c
        var m = 4294967296,
        // a - 1 should be divisible by m's prime factors
        a = 1664525,
         // c and m should be co-prime
        c = 1013904223,
        seed, z;
        return {
          setSeed : function(val) {
            // pick a random seed if val is undefined or null
            // the >>> 0 casts the seed to an unsigned 32-bit integer
            z = seed = (val == null ? Math.random() * m : val) >>> 0;
          },
          getSeed : function() {
            return seed;
          },
          rand : function() {
            // define the recurrence relationship
            z = (a * z + c) % m;
            // return a float in [0, 1)
            // if z = m then z / m = 0 therefore (z % m) / m < 1 always
            return z / m;
          }
        };
      }());

      lcg.setSeed(seed);
      this.perlin = new Array(PERLIN_SIZE + 1);
      for (var i = 0; i < PERLIN_SIZE + 1; i++) {
        this.perlin[i] = lcg.rand();
      }
      return this;
    },

    get: function(x,y,z) {

      y = y || 0;
      z = z || 0;

      if(this.perlin == null) {
        this.perlin = new Array(PERLIN_SIZE + 1);
        for (var i = 0; i < PERLIN_SIZE + 1; i++) {
          this.perlin[i] = Math.random();
        }
      }

      if (x<0) { x=-x; }
      if (y<0) { y=-y; }
      if (z<0) { z=-z; }

      var xi=Math.floor(x), yi=Math.floor(y), zi=Math.floor(z);
      var xf = x - xi;
      var yf = y - yi;
      var zf = z - zi;
      var rxf, ryf;

      var r=0;
      var ampl=0.5;

      var n1,n2,n3;

      var noise_fsc = function(i) {
        // using cosine lookup table
        return 0.5*(1.0-cosLUT[Math.floor(i*perlin_PI)%SINCOS_LENGTH]);
      };

      for (var o=0; o<this.perlin_octaves; o++) {
        var of=xi+(yi<<PERLIN_YWRAPB)+(zi<<PERLIN_ZWRAPB);

        rxf= noise_fsc(xf);
        ryf= noise_fsc(yf);

        n1  = this.perlin[of&PERLIN_SIZE];
        n1 += rxf*(this.perlin[(of+1)&PERLIN_SIZE]-n1);
        n2  = this.perlin[(of+PERLIN_YWRAP)&PERLIN_SIZE];
        n2 += rxf*(this.perlin[(of+PERLIN_YWRAP+1)&PERLIN_SIZE]-n2);
        n1 += ryf*(n2-n1);

        of += PERLIN_ZWRAP;
        n2  = this.perlin[of&PERLIN_SIZE];
        n2 += rxf*(this.perlin[(of+1)&PERLIN_SIZE]-n2);
        n3  = this.perlin[(of+PERLIN_YWRAP)&PERLIN_SIZE];
        n3 += rxf*(this.perlin[(of+PERLIN_YWRAP+1)&PERLIN_SIZE]-n3);
        n2 += ryf*(n3-n2);

        n1 += noise_fsc(zf)*(n2-n1);

        r += n1*ampl;
        ampl *= this.perlin_amp_falloff;
        xi<<=1;
        xf*=2;
        yi<<=1;
        yf*=2;
        zi<<=1;
        zf*=2;

        if (xf>=1.0) { xi++; xf--; }
        if (yf>=1.0) { yi++; yf--; }
        if (zf>=1.0) { zi++; zf--; }
      }
      return r;
    }

  }

  return Noise;

})();