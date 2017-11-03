import React from 'react';
import SearchBar from './SearchBar.js'
import Article from './Article.js'
import PropTypes from 'prop-types'

//компонент для отрисовки новостей и поиска по ним
class News extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            filter : ""
        };
    }

    componentDidMount(){
        let self = this;
        window.ee.on('Search.Filter', function(text) {
            self.setState({filter: text});
        });
    }

    componentWillUnmount(){
        window.ee.off('Search.Filter');
    }

    //возвращает отфильрованные данные
    makeFilter(){
        return this.props.data.filter((x)=>x.author.toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1);
    }

    render() {
        let newsTemplate,inputTemplate;
        let filtered = this.makeFilter();

        inputTemplate = <SearchBar/>;

        if(filtered.length > 0){
            newsTemplate = filtered.map(function(item, index) {
                return (
                    <Article data={item} key={index} />
                )
            });

        }
        else{
            newsTemplate = <p>К сожалению новостей нет</p>;
        }

        return(
            <div className="news">
                {inputTemplate}
                {newsTemplate}
                <strong className={'news__count ' + (filtered.length > 0 ? '':'none')}>
                    {filtered.length} новостей</strong>
                <br/>
            </div>
        );
    }
}

News.propTypes = {
    data: PropTypes.array.isRequired
};

export default News;