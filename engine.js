let canvas = document.createElement('canvas');
let gl = canvas.getContext('webgl2');
document.body.appendChild(canvas);

class Engine {
    constructor() {    
        // this.canvas = document.createElement('canvas');
        // this.gl = this.canvas.getContext('webgl2');
        // document.body.appendChild(this.canvas);
        
        let html = document.documentElement;
        this.screenWidth = html.clientWidth;
        this.screenHeight = html.clientHeight;
        
        canvas.width = this.screenWidth;
        canvas.height = this.screenHeight;

        gl.viewport(0, 0, this.screenWidth, this.screenHeight);

        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);
        gl.frontFace(gl.CCW);
        gl.cullFace(gl.BACK);

        // this.vs = 
        // "#version 300 es\n" +
		// "in vec3 a_position;\n" +
		
		// "uniform float uPointSize;\n" +
		// "void main(void) {\n" +
		// "	gl_PointSize = uPointSize;\n" +
		// "	gl_Position = vec4(a_position, 1.0);\n" +
        // "}";
        
        // this.fs = 
        // "#version 300 es\n" +
		// "precision mediump float;\n" +
		
		// "out vec4 finalColor;\n" +
		// "void main(void) {\n" +
		// "	finalColor = vec4(0.0, 0.0, 0.0, 1.0);\n" +
        // "}";

        this.vs = 
        [
        'precision mediump float;',
        '',
        'attribute vec3 vertPosition;',
        'attribute vec3 vertColor;',
        'varying vec3 fragColor;',
        'uniform mat4 mWorld;',
        'uniform mat4 mView;',
        'uniform mat4 mProj;',
        '',
        'void main()',
        '{',
        '  fragColor = vertColor;',
        '  gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);',
        '}'
        ].join('\n');
        
        this.fs =
        [
        'precision mediump float;',
        '',
        'varying vec3 fragColor;',
        'void main()',
        '{',
        '  gl_FragColor = vec4(fragColor, 1.0);',
        '}'
        ].join('\n');
        

        //this.standratShaderProg = new ShaderProgram(this.vs, this.fs, "");;
        this.standratShader = new StandartShader();

        // Get Location of Uniforms and Attributes.
        // gl.useProgram(this.standratShaderProg.programID);
        // this.aPositionLoc = gl.getAttribLocation(this.standratShaderProg.programID,"a_position");
        // this.uPointSizeLoc = gl.getUniformLocation(this.standratShaderProg.programID,"uPointSize");
        // gl.useProgram(null);

        //
        // Create buffer
        //
        // var boxVertices = 
        // [ // X, Y, Z           R, G, B
        //     // Top
        //     -1.0, 1.0, -1.0,   0.5, 0.5, 0.5,
        //     -1.0, 1.0, 1.0,    0.5, 0.5, 0.5,
        //     1.0, 1.0, 1.0,     0.5, 0.5, 0.5,
        //     1.0, 1.0, -1.0,    0.5, 0.5, 0.5,

        //     // Left
        //     -1.0, 1.0, 1.0,    0.75, 0.25, 0.5,
        //     -1.0, -1.0, 1.0,   0.75, 0.25, 0.5,
        //     -1.0, -1.0, -1.0,  0.75, 0.25, 0.5,
        //     -1.0, 1.0, -1.0,   0.75, 0.25, 0.5,

        //     // Right
        //     1.0, 1.0, 1.0,    0.25, 0.25, 0.75,
        //     1.0, -1.0, 1.0,   0.25, 0.25, 0.75,
        //     1.0, -1.0, -1.0,  0.25, 0.25, 0.75,
        //     1.0, 1.0, -1.0,   0.25, 0.25, 0.75,

        //     // Front
        //     1.0, 1.0, 1.0,    1.0, 0.0, 0.15,
        //     1.0, -1.0, 1.0,    1.0, 0.0, 0.15,
        //     -1.0, -1.0, 1.0,    1.0, 0.0, 0.15,
        //     -1.0, 1.0, 1.0,    1.0, 0.0, 0.15,

        //     // Back
        //     1.0, 1.0, -1.0,    0.0, 1.0, 0.15,
        //     1.0, -1.0, -1.0,    0.0, 1.0, 0.15,
        //     -1.0, -1.0, -1.0,    0.0, 1.0, 0.15,
        //     -1.0, 1.0, -1.0,    0.0, 1.0, 0.15,

        //     // Bottom
        //     -1.0, -1.0, -1.0,   0.5, 0.5, 1.0,
        //     -1.0, -1.0, 1.0,    0.5, 0.5, 1.0,
        //     1.0, -1.0, 1.0,     0.5, 0.5, 1.0,
        //     1.0, -1.0, -1.0,    0.5, 0.5, 1.0,
        // ];

        var boxVertices = 
        [ // X, Y, Z
            // Top
            -1.0, 1.0, -1.0,
            -1.0, 1.0, 1.0,
            1.0, 1.0, 1.0,
            1.0, 1.0, -1.0,

            // Left
            -1.0, 1.0, 1.0,
            -1.0, -1.0, 1.0,
            -1.0, -1.0, -1.0,
            -1.0, 1.0, -1.0,

            // Right
            1.0, 1.0, 1.0,
            1.0, -1.0, 1.0,
            1.0, -1.0, -1.0,
            1.0, 1.0, -1.0,

            // Front
            1.0, 1.0, 1.0,
            1.0, -1.0, 1.0,
            -1.0, -1.0, 1.0,
            -1.0, 1.0, 1.0,

            // Back
            1.0, 1.0, -1.0,
            1.0, -1.0, -1.0,
            -1.0, -1.0, -1.0,
            -1.0, 1.0, -1.0,

            // Bottom
            -1.0, -1.0, -1.0,
            -1.0, -1.0, 1.0,
            1.0, -1.0, 1.0,
            1.0, -1.0, -1.0,
        ];

        this.boxIndices =
        [
            // Top
            0, 1, 2,
            0, 2, 3,

            // Left
            5, 4, 6,
            6, 4, 7,

            // Right
            8, 9, 10,
            8, 10, 11,

            // Front
            13, 12, 14,
            15, 14, 12,

            // Back
            16, 17, 18,
            16, 18, 19,

            // Bottom
            21, 20, 22,
            22, 20, 23
        ];

        var boxVertexBufferObject = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, boxVertexBufferObject);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(boxVertices), gl.STATIC_DRAW);

        var boxIndexBufferObject = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, boxIndexBufferObject);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.boxIndices), gl.STATIC_DRAW);

        //var positionAttribLocation = gl.getAttribLocation(this.standratShaderProg.programID, 'vertPosition');
        //var colorAttribLocation = gl.getAttribLocation(this.standratShaderProg.programID, 'vertColor');
        gl.vertexAttribPointer(
            0, // Attribute location
            3, // Number of elements per attribute
            gl.FLOAT, // Type of elements
            gl.FALSE,
            3 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
            0 // Offset from the beginning of a single vertex to this attribute
        );

        // gl.vertexAttribPointer(
        //     positionAttribLocation, // Attribute location
        //     3, // Number of elements per attribute
        //     gl.FLOAT, // Type of elements
        //     gl.FALSE,
        //     6 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
        //     0 // Offset from the beginning of a single vertex to this attribute
        // );
        // gl.vertexAttribPointer(
        //     colorAttribLocation, // Attribute location
        //     3, // Number of elements per attribute
        //     gl.FLOAT, // Type of elements
        //     gl.FALSE,
        //     6 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
        //     3 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
        // );

        // gl.enableVertexAttribArray(0);
        //gl.enableVertexAttribArray(positionAttribLocation);
        //gl.enableVertexAttribArray(colorAttribLocation);

        //Activate the Shader
        //gl.useProgram(this.standratShaderProg.programID);
        this.standratShader.start();


        //this.matWorldUniformLocation = gl.getUniformLocation(this.standratShaderProg.programID, 'mWorld');
        //this.matViewUniformLocation = gl.getUniformLocation(this.standratShaderProg.programID, 'mView');
        //this.matProjUniformLocation = gl.getUniformLocation(this.standratShaderProg.programID, 'mProj');
    
        this.worldMatrix = new Float32Array(16);
        this.viewMatrix = new Float32Array(16);
        this.projMatrix = new Float32Array(16);
        mat4.identity(this.worldMatrix);
        mat4.lookAt(this.viewMatrix, [0, 0, -8], [0, 0, 0], [0, 1, 0]);
        mat4.perspective(this.projMatrix, glMatrix.toRadian(45), this.screenWidth / this.screenHeight, 0.1, 1000.0);
        
        this.standratShader.loadTransformationMatrix(this.worldMatrix);
        this.standratShader.loadProjectionMatrix(this.projMatrix);
        this.standratShader.loadViewMatrix(this.viewMatrix);

        // gl.uniformMatrix4fv(this.matWorldUniformLocation, gl.FALSE, this.worldMatrix);
        // gl.uniformMatrix4fv(this.matViewUniformLocation, gl.FALSE, this.viewMatrix);
        // gl.uniformMatrix4fv(this.matProjUniformLocation, gl.FALSE, this.projMatrix);
    
        this.xRotationMatrix = new Float32Array(16);
        this.yRotationMatrix = new Float32Array(16);
    }
    
    beginFrame() {
        //gl.clearColor(0.75, 0.85, 0.8, 1.0);
        //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        
        // gl.uniform1f(this.uPointSizeLoc, 50.0);		//Store data to the shader's uniform variable uPointSize
        // //how its down without VAOs
        // gl.bindBuffer(gl.ARRAY_BUFFER, this.bufVerts);					//Tell gl which buffer we want to use at the moment
        // gl.enableVertexAttribArray(this.aPositionLoc);					//Enable the position attribute in the shader
        // gl.vertexAttribPointer(this.aPositionLoc, 3, gl.FLOAT, false, 0, 0);	//Set which buffer the attribute will pull its data from
        // gl.bindBuffer(gl.ARRAY_BUFFER, null);						//Done setting up the buffer
        
        // gl.drawArrays(gl.POINTS, 0, 2);
    }
}