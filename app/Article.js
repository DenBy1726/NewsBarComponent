import React from 'react'
import PropTypes from 'prop-types'

//компонент для отображения одной записи
class Article extends React.Component{

    constructor(props){
        super(props);

        this.state = {showMore : false};

        if(this.props.id == 'undefined')
            this.props.id = Math.random();
        this.showMoreClick = this.showMoreClick.bind(this);
    }

    showMoreClick(){
        this.setState({showMore : !this.state.showMore});
    }

    render(){
        console.log("render");
        return(
            <article className="article" key={this.props.id}>
                <p className="news__author">{this.props.data.author}:</p>
                <p className="news__text">{this.props.data.text}</p>
                <a href="#" className={'news__readmore'} onClick={this.showMoreClick}>
                    {this.state.showMore ? 'Скрыть' :'Подробнее'}</a>
                <p className={'news__big-text '  + (this.state.showMore ? '': 'none')}>{this.props.data.bigText}</p>
            </article>
        );
    }
}

Article.propTypes = {
    data: {
        author: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        bigText: PropTypes.string.isRequired
    }
};

export default Article;