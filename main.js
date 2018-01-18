//console.log('TEST!');
let engine = new Engine();

let identityMatrix = new Float32Array(16);
mat4.identity(identityMatrix);
let angle = 0;

let gameLoop = function () {
    angle = performance.now() / 1000 / 6 * 2 * Math.PI;
    mat4.rotate(engine.yRotationMatrix, identityMatrix, angle, [0, 1, 0]);
    mat4.rotate(engine.xRotationMatrix, identityMatrix, angle / 4, [1, 0, 0]);


    mat4.identity(engine.worldMatrix);
    
    let tansMat = new Float32Array(16);
    mat4.translate(tansMat, identityMatrix, [0.0, 0.0, -3.5]);
    mat4.mul(engine.worldMatrix, engine.worldMatrix, tansMat);

    let rotMat = new Float32Array(16);
    //mat4.mul(engine.worldMatrix, engine.yRotationMatrix, engine.xRotationMatrix);
    mat4.mul(rotMat, engine.yRotationMatrix, engine.xRotationMatrix);
    mat4.mul(engine.worldMatrix, engine.worldMatrix, rotMat);

    
    
    

    engine.standratShader.loadTransformationMatrix(engine.worldMatrix);
    //gl.uniformMatrix4fv(engine.matWorldUniformLocation, gl.FALSE, engine.worldMatrix);

    gl.clearColor(0.75, 0.85, 0.8, 1.0);
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
    gl.drawElements(gl.TRIANGLES, engine.boxIndices.length, gl.UNSIGNED_SHORT, 0);

    requestAnimationFrame(gameLoop);
};
requestAnimationFrame(gameLoop);

// gameLoop = setInterval(gameLoop, 17);
// let time = 0;
// function gameLoop() {
//     time += 17;
//     angle = time / 1000 / 6 * 2 * Math.PI;
//     mat4.rotate(engine.yRotationMatrix, identityMatrix, angle, [0, 1, 0]);
//     mat4.rotate(engine.xRotationMatrix, identityMatrix, angle / 4, [1, 0, 0]);
//     mat4.mul(engine.worldMatrix, engine.yRotationMatrix, engine.xRotationMatrix);
//     gl.uniformMatrix4fv(engine.matWorldUniformLocation, gl.FALSE, engine.worldMatrix);

//     gl.clearColor(0.75, 0.85, 0.8, 1.0);
//     gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
//     gl.drawElements(gl.TRIANGLES, engine.boxIndices.length, gl.UNSIGNED_SHORT, 0);
// }