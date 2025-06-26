#define PI2 6.28318530718

uniform float uProgress;
varying vec2 vUv;

float circle(vec2 pt, vec2 center, float radius){
  pt -= center;
  float len = length(pt);
  return (len<radius) ? 1.0 : 0.0;
}

float arc(vec2 pt, vec2 center, float radius, float percent){
  float result = 0.0;
  vec2 d = pt - center;
  float len = length(d);
  float halfRadius = radius * 0.5;

  if ( len<radius && len>halfRadius){
    percent = clamp(percent, 0.0, 1.0);
    float arcAngle = PI2 * percent;
    float angle = mod( arcAngle - atan(d.y, d.x), PI2);
    float edgeWidth = radius * 0.05;
    result = (angle<arcAngle) ? smoothstep(halfRadius, halfRadius + edgeWidth, len) - smoothstep(radius-edgeWidth, radius, len) : 0.0;
  }

  return result;
}

void main (void)
{
  vec2 center = vec2(0.5);
  vec4 color = vec4(0.0);

  // Ring color: blue
  vec4 arcColor = vec4(0.0, 0.5, 1.0, 1.0); // (R,G,B,A)

  color += arc(vUv, center, 0.4, uProgress) * arcColor;

  if (color.a < 0.01) discard; // make fully transparent where no arc is drawn
  gl_FragColor = color;
}
