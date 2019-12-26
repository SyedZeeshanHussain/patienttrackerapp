
  function getValue(){
    var name = document.getElementById("pt_Name").value;
    var main_div = document.getElementById("mainDiv")
        var card_div = document.createElement('div')
        var card_body = document.createElement('div')
       
        var nameValue = document.createTextNode(name)
        card_body.appendChild(nameValue)
        card_body.setAttribute('id',name)
        card_div.appendChild(card_body)
        main_div.appendChild(card_div)
        card_body.setAttribute('class','card-body')
        card_div.setAttribute('class','card fade-in')
  }