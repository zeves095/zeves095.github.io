import React from 'react';

export class ControlledInput extends React.Component{
    constructor(){
      super();

        this.config={
            debug: document.debug?true:false,
            max_value: 1000
        };

      this.state={
        value: 1,
        name: 'count',
        elementClass: 'raised'
      };
    }

    componentWillMount() {
//        console.log(this.props.data);
        let state=Object.assign({},this.state);

        if(typeof this.props.name !='undefined'){
            state.name=this.props.name;
        }
        if(typeof this.props.defaultValue !='undefined'){
            state.value=parseInt(this.props.defaultValue);
        }else{
            state.value = 1000;
        }
        if(typeof this.props.elementClass !='undefined'){
            state.elementClass=this.props.elementClass;
        }
        this.setState(state);
        if(typeof this.props.callback != 'undefined') this.props.callback(state.value);
    }

    componentDidMount() {
    }

    void(){
        return false;
    }

    changeCountEvent(event){
        this.changeCount(event.target.value);
    }

    changeCount(val){
        if(val<1) val=1;
        if(val>this.config.max_value) val=this.config.max_value;
        let state = Object.assign({}, this.state);
        state.value = val;
        this.setState(state);
        if(typeof this.props.callback != 'undefined') this.props.callback(state.value);
    }

    increment(e){
        e.preventDefault();
        let intval = parseInt(this.state.value);
        if(!intval) intval = 1;
        intval = intval + 1;
        this.changeCount(intval);
    }

    decrement(e){
        e.preventDefault();
        let intval = parseInt(this.state.value);
        if(!intval) intval = 1;
        intval = intval - 1;
        this.changeCount(intval);
    }

    wheel(e){
        e.preventDefault();
        let delta=0;
        if(e.deltaY<0) delta=10;
        if(e.deltaY>0) delta=-10;
        let state=Object.assign({},this.state);
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
            <label className="order-form__label">Колличество
                <div className="order-form__quantity quantity" id="quantity">
                    <button className="quantity__minus" onClick={this.decrement.bind(this)}>-</button>
                    <button className="quantity__plus" onClick={this.increment.bind(this)}>+</button>
                    <input type='text' className="quantity__value" name={this.state.name} value={this.state.value} onChange={this.changeCountEvent.bind(this)} onWheel={this.wheel.bind(this)} />
                </div>
            </label>
        );
    }
}
