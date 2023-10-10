import { createEffect } from 'solid-js'

function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement, multiplier = 1) {
  const width = (canvas.clientWidth * multiplier) | 0
  const height = (canvas.clientHeight * multiplier) | 0
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width
    canvas.height = height
    return true
  }
  return false
}

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
  if (success) {
    return shader
  }

  gl.deleteShader(shader)
}

function createProgram(
  gl: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
) {
  const program = gl.createProgram()
  if (!program) return
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  const success = gl.getProgramParameter(program, gl.LINK_STATUS)
  if (success) {
    return program
  }

  gl.deleteProgram(program)
}

function resize(canvas: HTMLCanvasElement) {
  const { offsetWidth, offsetHeight } = document.documentElement

  canvas.width = offsetWidth
  canvas.height = offsetHeight
}

function BackGround() {
  createEffect(() => {
    const canvas = document.querySelector('canvas') as HTMLCanvasElement
    const gl = canvas.getContext('webgl')

    resize(canvas)
    window.addEventListener('resize', () => resize(canvas))

    const vertexShaderSource = `attribute vec4 a_position;

    void main() {
      gl_Position = a_position;
    }`
    const fragmentShaderSource = `#ifdef GL_ES
    precision mediump float;
    #endif
    
    uniform float u_time;
    
    float random2d(vec2 coord) {
      return fract(sin(dot(coord.xy, vec2(12.9898, 78.233))) * 43758.5453);
    }
    
    void main() {
      vec2 coord = gl_FragCoord.xy * 0.01;
      coord -= u_time + vec2(sin(coord.y), cos(coord.x));
    
      float r1 = fract(random2d(floor(coord)) + u_time / 60.0);
      float r2 = fract(random2d(floor(coord)) + u_time / 40.0);
    
      r1 *= 0.4 - length(fract(coord));
    
      gl_FragColor = vec4(r1 * 4.0, r1 * r2 * 4.0, 0.0, 1.0);
    }`

    let startTime = Date.now()

    requestAnimationFrame(render)

    function render() {
      if (!gl) return
      const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
      const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)
      if (!vertexShader || !fragmentShader) return

      const program = createProgram(gl, vertexShader, fragmentShader)
      if (!program) return

      const positionLocation = gl.getAttribLocation(program, 'a_position')
      const resolutionLocation = gl.getUniformLocation(program, 'u_resolution')
      const timeLocation = gl.getUniformLocation(program, 'u_time')

      const positionBuffer = gl.createBuffer()

      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

      const matrix = [-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0]

      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(matrix), gl.STATIC_DRAW)

      resizeCanvasToDisplaySize(canvas)

      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

      gl.clearColor(1.0, 1.0, 1.0, 1.0)
      gl.clear(gl.COLOR_BUFFER_BIT)

      gl.useProgram(program)

      gl.enableVertexAttribArray(positionLocation)

      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height)
      gl.uniform1f(timeLocation, (Date.now() - startTime) / 1000.0)

      gl.drawArrays(gl.TRIANGLES, 0, 6)

      requestAnimationFrame(render)
    }
  })

  return <canvas />
}

export default BackGround
