   function cadastrar(event){ event.preventDefault();
 
            const nome = document.getElementById("intup-nome").value;
            event.preventDefault();
            alert("Dados do " + nome + " cadastrados !");
            document.getElementById("form-cadastro").reset();
 
       }
       
   