import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'calculadora';

  // VARIABLES
  valorIntroducido1 = "";
  valorIntroducido2 = "";
  operadorActivo = false;
  operador = "";
  resultado = "";

  // Funcion para gestionar la entrada de números
  // ¿Como funciona?
  // -(1.) Si el operador no estaba activo previamente el nuevo numero se almacena en la variable 1
  // -(2.) Si el operador estaba activo previamente entonces:
  //    -(2.1.) Si no existe un resultado anterior, el nuevo numero se almacena en la variable 1
  //    -(2.2.) Si no existe un resultado anterior y la variable 1 está ocupada, el nuevo numero se almacena en la variable 2
  //    -(2.3.) Si existe un resultado anterior, se agrega el NUEVO número en la variable 2 ya que la variable 1 está ocupada por el resultado (desde la función "addOp()" se almacena el resultado en la variable 1)
  // - (*1.) Detecta si te intentan introducir más puntos
  // - (*2.) Si el operador NO está activo pero hay resultados anteriores, se resetean las variables para introducir los datos nuevos
  addNum(newValor:string){
    if(this.tieneMasPuntos(newValor) == false){ // (*1.)
      if(this.operadorActivo == false){ // (1.)
        if(this.resultado != ""){ // (*2.)
          this.valorIntroducido1 = "";
          this.valorIntroducido2 = "";
          this.operador = "";
          this.resultado = "";
        }
        // Esto es para añadir un 0 antes del punto si la primera tecla que se clicka es el punto
        if(newValor == "." && this.valorIntroducido1 == ""){
          this.valorIntroducido1 += "0"+newValor;
        }else{
          this.valorIntroducido1 += newValor;
        }
          
  
      }else if(this.operadorActivo == true){ // (2.)
        if(this.resultado == ""){ 
            if(this.valorIntroducido1 == ""){ // (2.1.)
  
                // Esto es para hacer que el primer numero sea negativo si se clicka "-" antes que el numero
                if(this.operador == "-"){
                    this.valorIntroducido1 += "-";
                }
  
                this.valorIntroducido1 += newValor;
                this.operadorActivo = false; // se desactiva para seguir añadiendo datos desde el otro if de arriba
            }else{ // (2.2.)
              this.valorIntroducido2 += newValor;
            }
          }else{ // (2.3.)
            this.valorIntroducido2 += newValor;
        }
      }

    }

  }
  
  operacion(new1:string, new2:string, newOper:string):number{
      switch (newOper) {
          case '+':
              return parseFloat(new1)+parseFloat(new2);
          case '-':
              return parseFloat(new1)-parseFloat(new2);
          case 'x':
              return parseFloat(new1)*parseFloat(new2);
          case '/':
              return parseFloat(new1)/parseFloat(new2);
          default:
            return -1;
      }
  };

  // Funcion para gestionar las teclas de operación
  addOp(newOperador:string){
    // Almacena el operador solo si hay datos en la variable "valorIntroducido1"
    if(this.valorIntroducido1 != ""){
      this.operador = newOperador;
      this.operadorActivo = true;
    }
    // Si se clicka "-" antes del primer numero, se almacena para volver negativo ese numero
    if(this.valorIntroducido1 == "" && newOperador == "-"){
      this.valorIntroducido1= newOperador;
    }

    // Si se clicka un operador y habia un resultado guardado, el resultado pasa a la variable "valorIntroducido1" y limpia la variable "valorIntroducido2" para que se pueda usar con el nuevo numero
    if(this.resultado != ""){
      this.valorIntroducido1 = this.resultado;
      this.valorIntroducido2 = "";
      this.resultado = "";
    }
  };

  igual(){
    if (this.operadorActivo == true){
        // Si hay valores en la variable "valorIntroducido1" entonces se opera
        if (this.valorIntroducido1 != ""){
            this.resultado = String(this.operacion(this.valorIntroducido1, this.valorIntroducido2, this.operador));
            this.operadorActivo = false;
        }
    }
  };

  borrar(){
    this.valorIntroducido1 = "";
    this.valorIntroducido2 = "";
    this.resultado = "";
    this.operador = "";
    this.operadorActivo = false;
  };

  // Esto es para detectar si se intenta añadir más veces un punto
  tieneMasPuntos(newValor:string):boolean{
    // Detecta si estás en la primera o segunda variable del numero y entonces determina si intentas añadir un punto mas veces
    if(this.valorIntroducido2 == ""){
      if(this.valorIntroducido1.includes(".") && newValor == "."){
        alert("No se pueden añadir mas puntos");
        return true;
      }else{
        return false;
      }
    }else{
      if(this.valorIntroducido2.includes(".") && newValor == "."){
        alert("No se pueden añadir mas puntos");
        return true;
      }else{
        return false;
      }
    }
  }

}
