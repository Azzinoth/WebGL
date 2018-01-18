class RawModel {
// 	glm::vec3 min = glm::vec3 (0.0);
// 	glm::vec3 max = glm::vec3(0.0);

	constructor(vaoID, vertexCount) {
		this.vaoID = vaoID;
		this.vertexCount = vertexCount;
	}

	getVaoID() {
		return this.vaoID;
	}

	getBoundingboxMin() {
		return this.min;
	}

	setBoundingboxMin(min) {
		this.min = min;
	}

	getBoundingboxMax() {
		return this.max;
	}

	setBoundingboxMax(max) {
		this.max = max;
	}

	getVertexCount() {
		return this.vertexCount;
	}
}