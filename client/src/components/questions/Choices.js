import React, { Component }  from 'react';
import './style/Choices.css';


class Choices extends Component {
    state = {
      category:"",
      number:"",
      difficulty:""
    }

    //changement de state sur du onclick / pas de formulaire
    //button  = appel à axios qui passe infos sous forme de data au composant qui est la page suivante / qui recupéra les infos
    //si 3 states ne sont pas remplis, empêcher de passer à la suivante (alternative:choix par défaut)
    //3 fonctions différentes de onclick
    //highlighter les options sélectionnées

  
    render() {
      return(
        <div> 
  
  
          
        </div>
      )
    }
  }
  
  export default Choices;