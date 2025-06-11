# Inception-Brot
### Github Project a Day Streak (IV)

A GPU-powered, real-time fractal renderer using nested Mandelbrot iteration

### Two (Dibrot)
![image](https://github.com/user-attachments/assets/7e52ab4f-6e5e-41b7-b02b-25066f9e289e)

### 10 (Decabrot)
![image](https://github.com/user-attachments/assets/d5be1891-244a-4f1b-8f8b-fe0694d8fa74)

### 100 (Centibrot)
![image](https://github.com/user-attachments/assets/805c6f6d-6bb2-44ee-93c6-6d4e451d72e7)

### 1,000 (Kilobrot)
![image](https://github.com/user-attachments/assets/8fcc9332-c012-46ea-bf5a-ffdf556bd0bf)

<br>
<br>
<br>

## Built With
- **LWJGL 3** OpenGL bindings in Java
- **GLSL** Real-time pixel calc.
- **Java 17** backend management

<br>
<br>

## How it works

### Equation
Unlike the standard Mandelbrot:
```
z = z^2 + c;
```

This shader evolves 'c' over time:
```
vec2 c = base + vec2( sin(angle), cos(angle) ) * 0.5;
```
This way, you can see all the "nested" Mandelbrots, though the effect cancels out at high depths as seen above.
While you could avoid it, it predictably looks very messy.


### Color
Color is based on smooth iteration count and depth:
```
vec3 getColor(float d) {
    float r = sin(0.3 * d + 0.0) * 0.5 + 0.5;
    float g = sin(0.3 * d + 2.0) * 0.5 + 0.5;
    float b = sin(0.3 * d + 4.0) * 0.5 + 0.5;
    return vec3(r, g, b);
}
```

## License
MIT License. Feel free to use and modify for personal or academic projects. Attribution appreciated!

<br>
<br>

## Acknowledgments

### Inspired by
- The classic Mandelbrot set
- Generative visual art
