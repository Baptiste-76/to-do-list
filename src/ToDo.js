import React, { Component, Fragment } from 'react'

export default class ToDo extends Component {

    state = {
        element: '',
        items: []
    }

    onChange = (event) => {
        this.setState({
            // On change le state element dynamiquement (event.target.name renvoie à la propriété name de l'input et donc ici à la propriété element) en lui attribuant la valeur de l'input (ce qui a été saisi dans le champ)
            [event.target.name]: event.target.value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.setState({
            // On remet la propriété element à 0 pour les futures saisies
            element: '',
            // On copie le tableau des items (avec le spread operator) puis on y ajoute la valeur du state element
            items: [...this.state.items, {element: this.state.element}]
        })
    }

    deleteItem = (index) => {
        // On copie le state dans une constante
        const array = this.state.items;
        // On détruit un élément à partir de l'élément correspondant à l'index
        array.splice(index, 1)
        // On met à jour le state
        this.setState({
            items: array
        })
    }

    renderList = () => {
        // On map sur le tableau d'items pour en faire une liste (chaque item représentera un élémént de la liste )
        return this.state.items.map( (item, index) => {
            return (
                <div className="card mb-3" key={index}>
                    <div className="card-body">
                        <h4>
                            {item.element}
                            {/* La fonction fléchée est utilisée pour pouvoir passer un paramètre (ici index). Lorsqu'on ne passe pas de paramètre, on fait juste une référence à la fonction à appeler sans passer par une fonction fléchée (exemple plus bas avec {this.onSubmit}) */}
                            <i className="fas fa-times" style={{cursor: 'pointer', float: 'right', color: 'red'}} onClick={() => this.deleteItem(index)}></i>
                        </h4>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <Fragment>
                <div className="card my-3">
                    <div className="card-header">To-Do List</div>
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="element">Chose à faire</label>
                                {/* Notre input est l'écoute d'un changement. Lorsqu'un changement aura lieu, il appellera la fonction onChange() */}
                                <input type="text" className="form-control form-control-lg" name="element" onChange={this.onChange} value={this.state.element} />
                            </div>
    
                            <button className="btn btn-primary btn-block">Ajouter une chose à faire</button>
                        </form>
                    </div>
                </div>
                {/* On appelle la fonction renderList() qui se chargera d'afficher les choses à faire */}
                {this.renderList()}
            </Fragment>
        )
    }
}