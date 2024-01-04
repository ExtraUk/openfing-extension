async function main(){
    if(!document.getElementsByTagName('title').item(0).innerHTML.includes('Cursos') && !(document.getElementById('btnVisto') instanceof HTMLElement && !document.getElementsByTagName('title').item(0).innerHTML.includes('Inicio') && !document.getElementsByTagName('title').item(0).innerHTML.includes('Actualizaciones') && !document.getElementsByTagName('title').item(0).innerHTML.includes('FAQ'))){
        let list = document.getElementsByClassName('class-list__item');

        if(list){
            for(let i=0; i<list.length; i++){
                let str = list.item(i).getAttribute('href').split('courses/')[1];
                let key = str.slice(0,str.length-1);
                let button = document.createElement('button');
                const aux = list.item(i).lastChild;
                list.item(i).after(button);
                chrome.storage.sync.get(key, function(obj){
                    let state = obj[key];
                    if(state == 'w'){
                        button.textContent = 'Marcar como no visto';
                        button.setAttribute('class', 'marcarnovisto')
                    }
                    else{
                        button.textContent = 'Marcar como visto';
                        button.setAttribute('class', 'marcarvisto')
                    }
                    button.setAttribute('id', 'btnVisto')
                    button.addEventListener("click", () => {
                        if(state == 'w'){
                            chrome.storage.sync.set({ [key]: "u" }, function(){});
                            button.textContent = 'Marcar como visto';
                            button.setAttribute('class', 'marcarvisto')
                            state = 'u';
                        }
                        else{
                            chrome.storage.sync.set({ [key]: "w" }, function(){});
                            button.textContent = 'Marcar como no visto';
                            button.setAttribute('class', 'marcarnovisto')
                            state = 'w';
                        }
                    })
                })
            }
        }
    }
}


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.message == 'callMain') {
        main();
      }
  });