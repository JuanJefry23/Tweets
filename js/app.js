//Variables
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
let tweets = [];

//Eventos
eventListeners();
function eventListeners() {
  //Cuando el usuario agrega un nuevo tweet
  formulario.addEventListener("submit", agregarTweet);

  //Cuando el documento esta listo
  document.addEventListener("DOMContentLoaded", () => {
    tweets = JSON.parse(localStorage.getItem("tweets")) || [];

    console.log(tweets);

    crearHTML();
  });
}

//Funciones
function agregarTweet(e) {
  e.preventDefault();

  //Textarea donde el usuario escribe
  const tweet = formulario.querySelector("#tweet").value;

  //Validación...
  if (tweet === "") {
    mostrarError("Un mensaje no puede ir vacio");

    return; //Evita que se ejecuten más lineas de código
  }

  const tweetObj = {
    id: Date.now(),
    tweet: tweet,
  };

  //Añadir el arreglo de tweets
  tweets = [...tweets, tweetObj];

  //Una vez agregado vamos a crear el HTML
  crearHTML();

  //Reiniciar el formulario
  formulario.reset();
}

//Mostrar mensaje de error
function mostrarError(error) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = error;
  mensajeError.classList.add("error");

  //Insertarlo en el contenido
  const contenido = document.querySelector("#contenido");
  const todosErrores = document.querySelectorAll(".error");

  //Esto impide que el mensaje de error se muestre mas de una vez al mismo tiempo
  if (todosErrores.length === 0) {
    contenido.appendChild(mensajeError);
  }

  //Elimina la alerta después de 3 segundos
  setTimeout(() => {
    mensajeError.remove();
  }, 3000);
}

function crearHTML() {
  //Limpiar el HTML
  limpiarHTML();

  if (tweets.length > 0) {
    tweets.forEach((tweet) => {
      //Agregar un boton de eliminar
      const btnEliminar = document.createElement("a");
      btnEliminar.classList.add("borrar-tweet");
      btnEliminar.innerText = "X";

      //Añadimos la función eliminar
      btnEliminar.onclick = () => {
        borrarTweet(tweet.id);
      };

      //Crear el HTML
      const li = document.createElement("li");
      //Añadimos texto
      li.textContent = tweet.tweet;
      //Asignamos el botón
      li.appendChild(btnEliminar);
      //Insertamos el "li" con el texto en el div
      listaTweets.appendChild(li);
    });
  }

  sincronizarStorage();
}

//Eliminar un tweet
function borrarTweet(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
  crearHTML();
}

//Agrega los tweets actuales a localStorage
function sincronizarStorage() {
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

//Limpiar el HTML
function limpiarHTML() {
  while (listaTweets.firstChild) {
    listaTweets.removeChild(listaTweets.firstChild);
  }
}
