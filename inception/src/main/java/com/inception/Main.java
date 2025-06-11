package com.inception;

public class Main 
{
    private final Window window;
    private final Shader shader;
    private final Quad quad;

    public Main() 
    {
        window = new Window("Nested Mandelbrot Set");
        window.create();

        // Shader and Quad
        shader = new Shader("inception");
        shader.compile();

        quad = new Quad();

        loop();

        // Cleanup
        quad.delete();
        shader.delete();
        window.destroy();
    }

    private void loop() 
    {
        while (!window.shouldClose()) 
        {
            window.clear();

            shader.use();
            shader.setUniform2f("u_resolution", (float)window.getWidth(), (float)window.getHeight());
            shader.setUniform1f("u_time", (float)(System.currentTimeMillis() % 100000L) / 1000f);
            shader.setUniform1f("u_scale", 1f);
            shader.setUniform2f("u_offset", -0.5f, 0.0f);
            shader.setUniform1i("u_iterations", 100);
            shader.setUniform1i("u_depth", 1000);

            quad.render();

            window.refresh();;
        }
    }

    public static void main(String[] args) 
    {
        new Main();
    }
}
