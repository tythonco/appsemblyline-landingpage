function Typer (element, scenes) {
  var config = { erase: 60, type: 80, break: 800 };
  var status = 'ready';
  var state = '';
  var currentSceneIndex = 0
  
  function type () {
    if (status !== 'playing') {
        return;
    }
    
    var scene = scenes[currentSceneIndex];
    
    if (state === scene) {
        return setTimeout(erase, config.break);
    }
    
    state = scene.substr(0, state.length + 1);
    element.textContent = state;
    
    setTimeout(type, config.type);
  }
  
  function erase () {
    if (status !== 'playing') {
        return;
    }
    
    if (state === '' || currentSceneIndex === scenes.length-1) {
        currentSceneIndex++;
      
      if (currentSceneIndex === scenes.length) {
        return stop();
      }
      
      return type();
    }
  
    state = state.substr(0, state.length - 1);
    element.textContent = state;
    
    setTimeout(erase, config.erase);
  }
  
  function stop () {
    status = 'ready';
  }
  
  function play () {
    if (status === 'ready') {
        status = 'playing';
        type();
    }
  }
  
  return { play: play, stop: stop };
}
var headerTyper = document.getElementById('header-typer');
var player = Typer(headerTyper, ['Development','Deployments','Backups','Simplified']);
setTimeout(player.play, 300);