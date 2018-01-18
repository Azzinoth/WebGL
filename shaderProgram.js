class ShaderProgram {
	constructor(vertexText,fragmentText, attributes) {
		this.vertexShaderID = this.loadShader(vertexText, gl.VERTEX_SHADER);
		this.fragmentShaderID = this.loadShader(fragmentText, gl.FRAGMENT_SHADER);
		this.attributes = attributes;

		this.programID = gl.createProgram();
		gl.attachShader(this.programID, this.vertexShaderID);
		gl.attachShader(this.programID, this.fragmentShaderID);
		this.bindAttributes();
		gl.linkProgram(this.programID);
		//gl.validateProgram(this.programID); // too slow ?

        gl.detachShader(this.programID, this.vertexShaderID);
        gl.detachShader(this.programID, this.fragmentShaderID);
        
		gl.deleteShader(this.vertexShaderID);
		gl.deleteShader(this.fragmentShaderID);
    }

	getUniformLocation(uniformName) {
		return gl.getUniformLocation(this.programID, uniformName);
	}

	start() {
		gl.useProgram(this.programID);
	}

	stop() {
		gl.useProgram(0);
	}

	cleanUp() {
		stop();
		//gl.detachShader(this.programID, this.vertexShaderID);
		//GL_ERROR(glDetachShader(programID, fragmentShaderID));
		//GL_ERROR(glDeleteShader(vertexShaderID));
		//GL_ERROR(glDeleteShader(fragmentShaderID));
		gl.deleteProgram(this.programID);
	}

	bindAttributes() {
		for (let i = 0; i < this.attributes.length; i++) {
			this.bindAttribute(i, this.attributes[i]);
		}
	}

	bindAttribute(attribute, variableName) {
		//gl.bindAttribLocation(this.programID, attribute, variableName);
		gl.enableVertexAttribArray(0);
	}

	// void loadFloat(GLuint& location, GLfloat& value) {
	// 	GL_ERROR(glUniform1f(location, value));
	// }

	// void loadInt(GLuint& location, GLint value) {
	// 	GL_ERROR(glUniform1i(location, value));
	// }

	// void loadVector(GLuint& location, glm::vec3& vector) {
	// 	GL_ERROR(glUniform3f(location, vector.x, vector.y, vector.z));
	// }

	// void loadVector(GLuint& location, glm::vec4& vector) {
	// 	GL_ERROR(glUniform4f(location, vector.x, vector.y, vector.z, vector.w));
	// }

	// void load2DVector(GLuint& location, glm::vec2& vector) {
	// 	GL_ERROR(glUniform2f(location, vector.x, vector.y));
	// }

	// void loadBool(GLuint& location, bool& value) {
	// 	GLfloat fValue = 0.0f;
	// 	if (value) fValue = 1.0f;
	// 	GL_ERROR(glUniform1f(location, fValue));
	// }

	loadMatrix(location, matrix) {
		gl.uniformMatrix4fv(location, gl.FALSE, matrix);
	}

	loadShader(shaderText, shaderType) {
		let shaderID = gl.createShader(shaderType);
		gl.shaderSource(shaderID, shaderText);
		gl.compileShader(shaderID);
        
        if(!gl.getShaderParameter(shaderID, gl.COMPILE_STATUS)){
			console.error("Error compiling shader : " + shaderText, gl.getShaderInfoLog(shaderID));
			gl.deleteShader(shaderID);
			return null;
		}

		return shaderID;
	}
};

