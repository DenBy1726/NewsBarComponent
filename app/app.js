import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';

let my_news = [
    {
        author: 'Саша Печкин',
        text: 'В четверг, четвертого числа...',
        bigText: `в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили
        чёрными чернилами чертёж.`
    },
    {
        author: 'Просто Вася',
        text: 'Считаю, что $ должен стоить 35 рублей!',
        bigText: 'А евро 42!'
    },
    {
        author: 'Гость',
        text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
        bigText: `На самом деле платно, просто нужно прочитать очень длинное лицензионное
        соглашение`
    },
    {
        author: 'DenBy',
        text: 'Мудрец не ищет легких путей',
        bigText:'Сказал студент бросая учебник по теории графов'
    }
];


class AddBar extends React.Component{

    constructor(props){
        super(props);

        this.state = {btnIsDisabled: true};

        this.onClick = this.onClick.bind(this);
        this.onCheckRuleClick = this.onCheckRuleClick.bind(this);
    }

    componentDidMount() {
        ReactDOM.findDOMNode(this.refs.addBar_author).focus();
    }


    onClick(e){
        this.props.addItem({
            author: ReactDOM.findDOMNode(this.refs.addBar_author).value.trim(),
            text: ReactDOM.findDOMNode(this.refs.addBar_text).value.trim(),
            bigText: ReactDOM.findDOMNode(this.refs.addBar_bigtext).value.trim()
        });
    }

    onCheckRuleClick(e){
        this.setState({btnIsDisabled: !this.state.btnIsDisabled});
    }


    render(){
        return(
            <div className={"add"}>
                <label>Добавить новость</label>
                <input className="input" type="text" placeholder="Автор" ref={"addBar_author"}/>
                <input className="input" type="text" placeholder="Заголовок" ref={"addBar_text"}/>
                <textarea className={"input multiline"} type="text" placeholder="Текст" ref={"addBar_bigtext"}/>
                <br/>
                <input type='checkbox' defaultChecked={false} ref={'checkrule'} onChange={this.onCheckRuleClick}/> Я согласен с правилами
                <br/>
                <button className={"btn " + (this.state.btnIsDisabled ? "disabled" : "")} onClick={this.onClick} ref={"addBar_button"} disabled={this.state.btnIsDisabled}>
                    Поделиться</button>
            </div>
        );
    }
}

class SearchBar extends React.Component{
    constructor(props){
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() { //ставим фокус в input
        ReactDOM.findDOMNode(this.refs.searchBar).focus();
    }

    onChange(e){
        let text = e.target.value.trim();   // удаляем пробелы
        this.props.filter(text);
    }

    render(){
        return(
            <input className="searchBar" type="text" onChange={this.onChange} placeholder="Поиск" ref={"searchBar"}/>
        );
    }
}

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

class News extends React.Component{


    constructor(props){
        super(props);

        this.fullData = this.props.data;

        this.state = {
            data : this.props.data
        };

        this.filterList = this.filterList.bind(this);
        this.addItem = this.addItem.bind(this);
    }

    filterList(text){
        let filtered = this.fullData.filter((x)=>x.author.toLowerCase().indexOf(text.toLowerCase()) !== -1);
        this.setState({data: filtered});
    }

    addItem(obj){
        this.fullData.push(obj);
        this.setState({data : this.fullData});
    }


    render() {
        let newsTemplate,inputTemplate;

        inputTemplate = <SearchBar filter={this.filterList} />;

        if(this.state.data.length > 0){
            newsTemplate = this.state.data.map(function(item, index) {
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
                <strong className={'news__count ' + (this.state.data.length > 0 ? '':'none')}>
                    {this.state.data.length} новостей</strong>
                <br/>
                <AddBar addItem={this.addItem} />
            </div>
        );
    }
}

News.propTypes = {
    data: PropTypes.array.isRequired
};

class App extends  React.Component {
    render() {
        return (
            <div className="app">
                <h3>Новости</h3>
                <News data={my_news} />
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
