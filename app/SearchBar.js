import React from 'react'
import ReactDOM from 'react-dom'

//компонент для поиска новостей по автору
class SearchBar extends React.Component{
    constructor(props){
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    //ставим фокус в input
    componentDidMount() {
        ReactDOM.findDOMNode(this.refs.searchBar).focus();
    }

    //изменение фильтра
    onChange(e){
        let text = e.target.value.trim();   // удаляем пробелы
        window.ee.emit('Search.Filter',text);
    }

    render(){
        return(
            <input className="searchBar" type="text" onChange={this.onChange} placeholder="Поиск" ref={"searchBar"}/>
        );
    }
}

export default SearchBar;