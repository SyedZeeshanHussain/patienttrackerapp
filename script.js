
  function getValue(){
    var name = document.getElementById("pt_Name").value;
    var age = document.getElementById("pt_Age").value;
    var gender = document.getElementsByName('gender');
    var age = document.getElementById("pt_Age").value;
    var disease = document.getElementById("disease").value;
    var main_div = document.getElementById("mainDiv");
        var card_div = document.createElement('div');
        var card_body = document.createElement('div');
        var nameValue = document.createTextNode(name+" ");
        var ageValue = document.createTextNode(age+" ");
        var maleValue = document.createTextNode("Male");
        var femaleValue = document.createTextNode("Female");
        var para = document.createElement('p');

        var diseaseValue = document.createTextNode(disease);

        card_body.appendChild(nameValue)
        card_body.appendChild(ageValue)

          if (gender[0].checked){
            card_body.appendChild(maleValue)
          }
          else card_body.appendChild(femaleValue)
          para.appendChild(diseaseValue)
          card_body.appendChild(para)
    
        card_body.setAttribute('id',name)
        card_body.setAttribute('id',age)
        card_div.appendChild(card_body)
        main_div.appendChild(card_div)
        card_body.setAttribute('class','card-body')
        card_div.setAttribute('class','card fade-in')

    }

  