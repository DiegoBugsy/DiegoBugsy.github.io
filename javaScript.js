'use strict';

const btnEncriptar = document.querySelector('.btn--encriptar');
const btnDesencriptar = document.querySelector('.btn--desencriptar');
const btnCopiar = document.querySelector('.btn--copiar');
const mensajeEncriptacion = document.querySelector('.mensaje-encriptacion');
const parrafoSimple = document.querySelector('.parrafo-simple');
const parrafoEncriptado = document.querySelector('.parrafo-encriptado');

const alertaCopy = document.querySelector('.alerta--copy');

//DESAPARACER  PORTADA DE LA SECCIÓN DE DESENCRIPTACIÓN
const desaparece = function () {
  if (parrafoSimple.value != 0) mensajeEncriptacion.style.display = 'none';
};

btnEncriptar.addEventListener('click', desaparece);
btnDesencriptar.addEventListener('click', desaparece);

//Cadena de valores encriptados
const valores = [
  ['ai', 'a'],
  ['enter', 'e'],
  ['imes', 'i'],
  ['ober', 'o'],
  ['ufat', 'u'],
];
//funcion que se realiza cuando no se cumple parrafoSimple.value != 0

const contrario = function () {
  parrafoEncriptado.style.display = 'none';
  mensajeEncriptacion.style.display = 'flex';
  parrafoEncriptado.value = ' ';
};
//Funcion CODIFICAR

const codificar = function () {
  if (parrafoSimple.value != 0) {
    let textoSimple = ' ';
    let existe = false;
    for (let i = 0; i < parrafoSimple.value.length; i++) {
      for (let j = 0; j < valores.length; j++) {
        if (parrafoSimple.value[i] == valores[j][1]) {
          textoSimple += parrafoSimple.value[i].replace(
            valores[j][1],
            valores[j][0]
          );
          existe = true;
        }
      }
      if (!existe) textoSimple += parrafoSimple.value[i];
      existe = false;
    }
    parrafoEncriptado.value = textoSimple;
    parrafoEncriptado.style.display = 'block';
  } else {
    contrario();
  }
};
//DETECTOR DE EVENTOS
btnEncriptar.addEventListener('click', codificar);

//Funcion DECODIFICAR

const decodificar = function () {
  if (parrafoSimple.value != 0) {
    let textoSimple = parrafoSimple.value;
    for (let i = 0; i < valores.length; i++) {
      if (parrafoSimple.value.includes(valores[i][0])) {
        textoSimple = textoSimple.replaceAll(valores[i][0], valores[i][1]);
      }
    }
    parrafoEncriptado.value = textoSimple;
    parrafoEncriptado.style.display = 'block';
  } else {
    contrario();
  }
};
//DETECTOR DE EVENTOS
btnDesencriptar.addEventListener('click', decodificar);

//Funcion COPIAR

const copiar = function () {
  if (parrafoEncriptado.value != 0) {
    let contador = 0;
    let contenidoE = parrafoEncriptado.value;
    parrafoEncriptado.focus();
    parrafoEncriptado.select();
    navigator.clipboard.writeText(contenidoE);
    //Texto de confirmacion de copia
    const alert = function () {
      alertaCopy.classList.add('alerta-copy--click');
      contador++;
      if (contador === 7) {
        clearInterval(intervalo);
        alertaCopy.classList.remove('alerta-copy--click');
      }
    };
    let intervalo = setInterval(alert, 300);
  }
};

//DETECTOR DE EVENTOS
btnCopiar.addEventListener('click', copiar);
