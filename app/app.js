import React from 'react'
import ReactDOM from 'react-dom'
import EventEmitter from 'event-emitter'
import AddBar from './AddBar.js'
import News from './News.js'

window.ee = new EventEmitter();

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

class App extends  React.Component {

    constructor(props){
        super(props);

        this.state = {news : my_news};
    }

    componentDidMount(){

        let self = this;
        window.ee.on('News.add', function(item) {
            let nextNews = item.concat(self.state.news);
            self.setState({news: nextNews});
        });

    }

    componentWillUnmount(){

        window.ee.off('News.add');
    }

    render() {
        return (
            <div className="app">
                <AddBar/>
                <h3>Новости</h3>
                <News data={this.state.news} />
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
