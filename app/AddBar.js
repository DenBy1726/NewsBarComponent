import React from 'react'
import ReactDOM from 'react-dom'

//компонент добавления новости
class AddBar extends React.Component{

    constructor(props){
        super(props);

        //контроль состояния ввода
        this.state = {
            //флажок я согласен
            agreeNotChecked: false,
            //имя автора
            authorState: false,
            //описание новости
            descriptionState: false,
            //текст новости
            textState: false
        };

        this.onClick = this.onClick.bind(this);
        this.onCheckRuleClick = this.onCheckRuleClick.bind(this);
    }

    //кидаем событие что была добавлена новость, заетм чистим поля
    onClick(e){
        let author =  ReactDOM.findDOMNode(this.refs.addBar_author);
        let text = ReactDOM.findDOMNode(this.refs.addBar_text);
        let bigText = ReactDOM.findDOMNode(this.refs.addBar_bigtext);
        let item = [{
            author: author.value.trim(),
            text: text.value.trim(),
            bigText: bigText.value.trim()
        }];
        window.ee.emit('News.add', item);

        text.value = '';
        bigText.value = '';
        this.setState({textState: false});
        this.setState({descriptionState: false});
    }

    //изменения флажка
    onCheckRuleClick(e){
        this.setState(
            {
                agreeNotChecked: !this.state.agreeNotChecked
            });
    }

    //изменения ввода в полях ввода. На вход приходит имя свойства state связанного с полем
    onFieldChanged(fieldName,e) {
        if (e.target.value.trim() === "")
            this.setState({['' + fieldName]: false});
        else
            this.setState({['' + fieldName]: true});
    }

    render(){
        let btnIsDisabled = !(this.state.authorState && this.state.textState && this.state.agreeNotChecked && this.state.descriptionState);
        return(
            <div className={"add"}>
                <label>Добавить новость</label>
                <input className="input" type="text" onChange={this.onFieldChanged.bind(this,"authorState")} placeholder="Автор" ref={"addBar_author"}/>
                <input className="input" type="text" onChange={this.onFieldChanged.bind(this,"descriptionState")} placeholder="Заголовок" ref={"addBar_text"}/>
                <textarea className={"input multiline"} type="text" onChange={this.onFieldChanged.bind(this,"textState")} placeholder="Текст" ref={"addBar_bigtext"}/>
                <br/>
                <input type='checkbox' defaultChecked={false} ref={'checkrule'} onChange={this.onCheckRuleClick}/> Я согласен с правилами
                <br/>
                <button className={"btn " + (btnIsDisabled ? "disabled" : "")} onClick={this.onClick} ref={"addBar_button"}
                        disabled={btnIsDisabled}>
                    Поделиться</button>
            </div>
        );
    }
}

export default AddBar;