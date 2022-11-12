import { RecipeWrapper } from "./styles"
import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import * as actions from "../../actions"
import { withRouter } from "react-router-dom"


class Recipe extends Component {

    constructor(props) {
        super(props)
        this.retrieveRecipe = this.retrieveRecipe.bind(this)
    }

    retrieveRecipe() {
        this.props.getRecipe(this.props.id)
    }

    componentDidMount() {
        if (this.props.id) {
            this.retrieveRecipe()
        }
        const idFromParams = this.props.match?.params?.id
        if (idFromParams && (this.props.id !== idFromParams)) {
            this.props.setCurrentRecipeId(idFromParams)
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {
            this.retrieveRecipe()
        }
    }

    render() {
        const { ingredients, instructions, name, isLoading } = this.props
        console.log(this.props)
        return (<RecipeWrapper>
            {isLoading && (<p>loading...</p>)}

            {instructions && (
                <div id='recipe'>
                    <h2>{name}</h2>
                    <h3>Ingredients</h3>
                    <List>
                        {ingredients.map((ingredient) => (
                            <ListItem key={ingredient._id}>
                                <ListItemText primary={ingredient.name} secondary={`${ingredient.amount} ${ingredient.unit}`} />
                            </ListItem>
                        ))}
                    </List>
                    <h3>Instructions</h3>
                    <p>{instructions}</p>
                </div>
            )}
        </RecipeWrapper>)
    }

}

const mapStateToProps = (state) => {
    const { recipe } = state
    return { ...recipe }
}

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getRecipe: actions.getRecipe,
            setCurrentRecipeId: actions.setCurrentRecipeId
        },
        dispatch
    )

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Recipe))