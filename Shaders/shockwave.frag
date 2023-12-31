uniform sampler2D sceneTex;
uniform float time;
uniform float zoom;
uniform float explosion_x;
uniform float explosion_y;

void main() 
{ 
  vec2 uv = gl_TexCoord[0].xy;
  vec2 texCoord = uv;

  vec3 shockParams = vec3(10.0, 0.8, 0.01);
  for(int i=0; i<2; i++) // amount of waves
  {
    float distance = distance(uv, vec2(explosion_x,explosion_y))/zoom;
    if ( (distance <= (time-(i*0.1f) + shockParams.z)) && 
         (distance >= (time-(i*0.1f) - shockParams.z)) ) 
    {
      float diff = (distance - time); 
      float powDiff = 1.0 - pow(abs(diff*shockParams.x), shockParams.y); 
      float diffTime = diff  * powDiff; 
      vec2 diffUV = normalize(uv + vec2(explosion_x,explosion_y));
      texCoord = uv + (diffUV * diffTime);
    } 
  }  
  gl_FragColor = texture2D(sceneTex, texCoord);
}