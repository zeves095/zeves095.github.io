import React from 'react';
// import $ from 'jquery';

export class ControlledCertificateInput extends React.Component{
    constructor(props){
      super(props);
        console.log('CONSTRUCTOR');
        console.log(props);
        this.config={
            debug: document.debug?true:false,
            max_value: 1000000000,
            min_value: props.minValue?props.minValue:1000,
            step: 1000
        };
    }

    componentWillMount() {
        let state = {};
        if(typeof this.props.name !='undefined'){
            state.name=this.props.name;
        }
        if(typeof this.props.defaultValue !='undefined'){
            state.value=this.props.defaultValue ? parseInt(this.props.defaultValue) : '';
        }
        if(typeof this.props.elementClass !='undefined'){
            state.elementClass=this.props.elementClass;
        }
        this.setState(state);
    }

    componentDidMount() {
        this.valueInput.focus();
    }

    
    setVal(val){
        this.setState({value: val});
        if(typeof this.props.callback != 'undefined') this.props.callback(val);
        this.closeHelper();
    }

    santinizeValue(event){
        let val=event.target.value;
        val = val.replace(/\s/g,'');
        val = Number.parseInt( val / this.config.step ) * this.config.step;
        val = Number.isNaN(val) ? 0 : val;
        if( val < this.config.min_value ) val=this.config.min_value;
        if( val > this.config.max_value ) val=this.config.max_value;
        this.setState({value: val});
        if(typeof this.props.callback != 'undefined') this.props.callback(val);
    }

    changeCount(event){
        let val=event.target.value;
        val = val.replace(/\s/g,'');
        let intval = Number.parseInt(val);
        if (Number.isNaN(intval)) return false;
        // if(val<1) val=1000;
        if(intval>this.config.max_value) intval=this.config.max_value;
        this.setState({value: intval});

        val = Number.parseInt( val / this.config.step ) * this.config.step;
        val = Number.isNaN(val) ? 0 : val;
        if( val < this.config.min_value ) val=this.config.min_value;
        if( val > this.config.max_value ) val=this.config.max_value;
        if(typeof this.props.callback != 'undefined') this.props.callback(val);
    }

    increment(e){
        e.preventDefault();
        let state=Object.assign({},this.state);
        let intval = parseInt(state.value);
        if(!intval) intval = 0;
        state.value = intval + 1000;
        if(state.value>this.config.max_value) state.value=this.config.max_value;
        this.setState(state);
        if(typeof this.props.callback != 'undefined') this.props.callback(state.value);
    }

    decrement(e){
        e.preventDefault();
        let state=Object.assign({},this.state);
        let intval = parseInt(state.value);
        if(!intval) intval = 0;
        state.value = intval - 1000;
        if(state.value<1000) state.value=1000;
        this.setState(state);
        if(typeof this.props.callback != 'undefined') this.props.callback(state.value);
    }

    wheel(e){
        e.preventDefault();
        let delta=0;
        if(e.deltaY<0) delta=1000;
        if(e.deltaY>0) delta=-1000;
        let state=this.state;
        state.value+=delta;
        state.value=Math.round(state.value/10)*10;
        if(state.value<1) state.value=1;
        if(state.value>this.config.max_value) state.value=this.config.max_value;
        this.setState(state);
        if(typeof this.props.callback != 'undefined') this.props.callback(state.value);
    }
    /**
     * <button className='minus btn white left ' onClick={this.decrement.bind(this)}>-</button>
     * <button className='plus btn white right' onClick={this.increment.bind(this)}>+</button>
     */
    render() {
        return (
            <div className="form-group" style={{maxWidth: '300px'}}>
            <label>
                        Введите сумму кратную 1000 р.
                        Не меньше чем: {this.config.min_value} р.
                        <input className="certificate__custom-input" type='text' style={{maxWidth: '300px'}}
                        ref={(input)=>{this.valueInput = input;}}
                        placeholder=''
                        name={this.state.name} 
                        value={this.state.value.toLocaleString('ru-RU',{style: 'decimal', minimumFractionDigits: 0})} 
                        onBlur={this.santinizeValue.bind(this)} 
                        // onFocus={this.openHelper.bind(this)} 
                        onChange={this.changeCount.bind(this)} 
                        onWheel={this.wheel.bind(this)} />
            </label>
            </div>
        );
    }
}
