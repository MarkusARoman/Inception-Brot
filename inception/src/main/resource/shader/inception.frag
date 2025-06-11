#version 330 core

// Output fragment color
out vec4 FragColor;

// Uniforms
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_scale;
uniform vec2 u_offset;
uniform int u_iterations;
uniform int u_depth;

// Returns an RGB color based on a smooth iter
vec3 getColor(float d) {
    float r = sin(0.3 * d + 0.0) * 0.5 + 0.5;
    float g = sin(0.3 * d + 2.0) * 0.5 + 0.5;
    float b = sin(0.3 * d + 4.0) * 0.5 + 0.5;
    return vec3(r, g, b);
}

void main() 
{
    vec2 uv = (gl_FragCoord.xy / u_resolution) * 2.0 - 1.0;
    uv.x *= u_resolution.x / u_resolution.y;
    vec2 base = uv / u_scale + u_offset;
    vec2 z = vec2(0.0);
    float smoothDepth = -1.0;

    // Nested Mandelbrot iteration
    for (int i = 0; i < u_iterations; i++) 
    {
        // Applies a dynamic offset at each depth
        for (int d = 0; d < u_depth; d++) 
        {
            float angle = u_time + float(d);
            vec2 c = base + vec2(sin(angle), cos(angle)) * 0.5;

            // Mandelbrot iteration step: z = z² + c
            float x = z.x * z.x - z.y * z.y + c.x;
            float y = 2.0 * z.x * z.y + c.y;
            z = vec2(x, y);

            // Escape condition: If magnitude exceeds 2
            // mag>=2 always escapes to infinity.
            float mag2 = dot(z, z);
            if (mag2 > 4.0) {
                // Smooth iter count for gradients
                float log_zn = log(mag2) / 2.0;
                float nu = log(log_zn / log(2.0)) / log(2.0);
                float smoothIter = float(i) + 1.0 - nu;

                // Combine depth and iter for richer color
                smoothDepth = smoothIter + float(d);

                // Break
                i = u_iterations;
                break;
            }
        }
    }

    // Escaped points -> smooth coloring, else -> black
    vec3 color = smoothDepth > 0.0 ? getColor(smoothDepth) : vec3(0.0);
    FragColor = vec4(color, 1.0);
}
