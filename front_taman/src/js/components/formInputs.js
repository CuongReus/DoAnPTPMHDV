import React from "react";
import Select from "react-select";
import moment from "moment";
import { FormatterUtils, RandomUtils, StringUtils } from '../utils/javascriptUtils';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import DatePicker from 'react-datepicker';
import TimeInput from 'react-time-input';
import NumberFormat from 'react-number-format';
import { inherits } from "util";
import { Popover, Overlay, OverlayTrigger, Button } from 'react-bootstrap'
moment.locale("vi");
import Switch from "react-switch";
import DayPicker, { DateUtils } from 'react-day-picker';
import dateFns from 'date-fns';
// The renderer support label or iconClass or none (not both).
const createRenderer = render => ({ input, meta, label, isVerticalLabel, iconClass, ...rest,errorType }) => {
     
      if (label) {
        if(errorType){
            return [  <label className="control-label">{label}</label>,
            <div style={meta.error && meta.touched ?{border:'solid 1px' ,borderColor:'red'}:null} className="form-group">
            <OverlayTrigger rootClose={true} trigger={['hover']} placement="top" overlay= 
            {meta.error && meta.touched ? 
            <Popover id="popover-basic" >
                <i style={{color:'red'}} className="icon-warning2"></i>
                <br/>
                <div>{meta.error}</div>
          </Popover>:<Popover id="popover-basic" style={{display:'none'}} > </Popover>}> 
            {render(input, label, rest)}
           </OverlayTrigger> 
          
        </div>]
        }else{

            return (<div className="form-group">
            <div>
                <label className="control-label">{label}</label>
                {render(input, label, rest)}
                {meta.error && meta.invalid ?
                    <span className="help-block has-error">{meta.error}</span> : null}
            </div>
        </div>);
}

    } else if (iconClass) {
        if(errorType){
            return <div style={meta.error && meta.touched ?{border:'solid 1px' ,borderColor:'red'}:null} className="form-group">
            <OverlayTrigger rootClose={true} trigger={['hover']} placement="top" overlay= 
            {meta.error && meta.touched ? 
            <Popover id="popover-basic" >
                <i style={{color:'red'}} className="icon-warning2"></i>
                <br/>
                <div>{meta.error}</div>
          </Popover>:<Popover id="popover-basic" style={{display:'none'}} > </Popover>}> 
            {render(input, label, rest)}
           </OverlayTrigger> 
          
        </div>
        }else{
            return (
                <div className="form-group has-feedback has-feedback-left">
                {render(input, label, rest)}
                <div className="form-control-feedback">
                    <i className={[iconClass, "text-muted"].join(" ")}></i>
                </div>
                {meta.error && meta.touched ?
                    <span className="help-block has-error">{meta.error}</span> : null}
            </div>
        );
    }
    } else {
        if(errorType){
            return <div style={meta.error && meta.touched ?{border:'solid 1px' ,borderColor:'red'}:null} className="form-group">
            <OverlayTrigger rootClose={true} trigger={['hover']} placement="top" overlay= 
            {meta.error && meta.touched ? 
            <Popover id="popover-basic" >
                <i style={{color:'red'}} className="icon-warning2"></i>
                <br/>
                <div>{meta.error}</div>
          </Popover>: <Popover id="popover-basic" style={{display:'none'}} > </Popover>}> 
            {render(input, label, rest)}
           </OverlayTrigger> 
          
        </div>
        }else {
            return <div className="form-group">
            {render(input, label, rest)}
            {meta.error && meta.touched ?
                <span className="help-block has-error">{meta.error}</span> : null}
        </div>
        }
      
}
}
// render input multifile
// accept properties sample: image/.xml/.doc/*
// with * is all file can choose
const RenderInputMultiFile = createRenderer((input, label, { hidden, disabled, multiple, accept }) => {
    return (<div className="col-sm-12">
        <input {...input} type="file" accept={accept} value={input.files} hidden={hidden} disabled={disabled} {...multiple} className="form-control" />
    </div>)
})


const RenderInput = createRenderer((input, label, { placeholder, autoFocus, disabled }) => {
    return <input {...input} placeholder={placeholder} autoFocus={autoFocus} value={input.value} disabled={disabled} className="form-control" />
})

// This renderInputWithDiv is compatible css with RenderInputWithGen
//value={input.value || defaultValue} is replaced with value={input.value} to fix old value catch ! 
const RenderInputWithDiv = createRenderer((input,label, { type, placeholder, disabled, readOnly, autoFocus, onChangeAction,onEnterAction }) => {
    function handleInputChange(ev) {
        if (onChangeAction) {
            onChangeAction(ev.target.value);
        }
        input.onChange(ev);
    }
    function handleKeyDown(e) {
        if (e.key == 'Enter') {
          if(onEnterAction){
            onEnterAction(e.target.value)
          }
        }
      }
    return <div>
        <input {...input}
            onKeyDown={handleKeyDown}
            type={type}
            style={disabled ? { border: 'none', textDecoration: 'underline', backgroundColor: 'lightgrey' } : null}
            disabled={disabled}
            placeholder={placeholder} value={input.value}
            onChange={handleInputChange}
            readOnly={readOnly} autoFocus={autoFocus} className="form-control" />
    </div>
})

const RenderInputPassword = createRenderer((input, label, { type, placeholder, disabled, readOnly, autoFocus, onChangeAction }) => {
    function handleInputChange(ev) {
        if (onChangeAction) {
            onChangeAction(ev.target.value);
        }
        input.onChange(ev);
    }
    // function handleShowHidePassword("ShowMe"){
    //     if (ClickToShow == 'password'){
    //         type='text';
    //       }
    //       else{
    //         passwordInput.type='password';
    //         passStatus.className='fa fa-eye';
    //       }
    // }
    return  <input {...input}
    type="password"
    disabled={disabled}
    placeholder={placeholder} value={input.value}
    onChange={handleInputChange}
    readOnly={readOnly} autoFocus={autoFocus} className="form-control" />
    
})


// const RenderInputWithDiv = createRenderer((input, label, {placeholder, disabled, readOnly, autoFocus,onChangeAction }) => {
//       function handleInputChange(ev) {
//          if (onChangeAction) {
//              onChangeAction(ev.target.value);
//       }
//           input.onChange(ev);
//       }
//      return <div className="col-sm-12">
//           <input {...input} disabled={disabled} placeholder={placeholder} value={input.value} onChange={handleInputChange} readOnly={readOnly} autoFocus={autoFocus} className="form-control" />

const RenderReadOnlyInput = createRenderer((input, label, { defaultValue, labelOfReadOnly }) => {
    return <div>
        {labelOfReadOnly}

        <input style={{ width: '130px', marginRight: '40px' }} {...input} disabled={true} value={defaultValue} className="form-control" />
    </div>
})

const RenderSmallInput = createRenderer((input, label, { placeholder, disabled, readOnly, autoFocus, labelOfReadOnly }) => {
    return <div>
        <label className="control-label">  {labelOfReadOnly}</label>


        <input style={{ width: '200px' }}
            {...input}
            disabled={disabled}
            placeholder={placeholder}
            value={input.value}
            readOnly={readOnly} autoFocus={autoFocus} className="form-control" />
    </div>
})

const RenderInputWithGen = createRenderer((input, label, { placeholder, autoFocus }) => {
    function onGeneration(e) {
        input.onChange(RandomUtils.generateLetterAndNumber(10));
    }

    return (<div>
        {/* <div className="col-sm-10"> */}
        <input {...input} placeholder={placeholder} autoFocus={autoFocus} className="form-control" />
        {/* </div> */}
        {/* <div className="col-sm-1 text-left">
            <button id="ranpass" type="button" className="btn btn-labeled btn-icon" onClick={onGeneration}>
                <i className="icon-menu7"></i>
            </button>
        </div> */}
    </div>)
})

const RenderInputWithGenPass = createRenderer((input, label, { placeholder, autoFocus }) => {
    function onGeneration(e) {
        input.onChange(RandomUtils.generateLetterAndNumber(10));
    }

    return (<div>
        <div className="col-sm-11">
            <input {...input} placeholder={placeholder} autoFocus={autoFocus} className="form-control" />
        </div>
        <span className="password__show" onClick={this.showHide}>{this.state.type === 'input' ? 'Hide' : 'Show'}</span>
    </div>)
})


//hihihi
const RenderTimeWrapper = createRenderer((input, label,  { onChangeAction, disabled, placeholder}) => {
    function onTimeChangeHandler(value) {
        if (onChangeAction) {
            onChangeAction(value);
        }
        input.onChange(value)
    }
    // TODO: TimeInput cannot catch event onBlur for redux-form validation
    return (
        <TimeInput
            disabled={disabled}
            initTime={input.value}
            placeholder={placeholder}
            className='form-control'
            // mountFocus='true'
            onTimeChange={onTimeChangeHandler}
            onBlur={() => input.onBlur(input.value)}
        />
    );

});


//  MoneyFormat
const RenderMoneyFormat = createRenderer((input, label, { type = { type }, placeholder, disabled, thousandSeparator, onChangeAction }) => {
    function onNumberChangeHandler(values) {
        if (onChangeAction) {
            onChangeAction(values.value);
        }
        input.onChange(values.value);
    }

    return (

        <NumberFormat
            type={type}
            value={FormatterUtils.round2Decimals(input.value)}
            onBlur={() => input.onBlur(input.value)}
            thousandSeparator={thousandSeparator}
            prefix={'$'}
            placeholder={placeholder}
            disabled={disabled}
            onValueChange={onNumberChangeHandler}
            className='form-control'
        />
    );

});
const RenderNumberInput = createRenderer((input, label, { type, placeholder, onChangeAction, disabled }) => {
    function onNumberChangeHandler(values) {
        if (onChangeAction) {
            onChangeAction(values.value);
        }
        input.onChange(values.value);
    }

    return (
        <NumberFormat
            type={type}
            value={input.value}
            disabled={disabled}
            placeholder={placeholder}
            onValueChange={onNumberChangeHandler}
            onBlur={() => input.onBlur(input.value)}
            className='form-control'
        />
    );

});
const RenderNumberInputPhone = createRenderer((input, label, { type, placeholder, onChangeAction, disabled }) => {
    function onNumberChangeHandler(values) {
        if (onChangeAction) {
            onChangeAction(values.value);
        }
        input.onChange(values.value);
    }

    return (
        <NumberFormat
            type={type}
            value={input.value}
            disabled={disabled}
            placeholder={placeholder}
            onValueChange={onNumberChangeHandler}
            // onBlur={() => input(input.value)}
            className='form-control'
            
        />
    );

});



const RenderMultiSelect = createRenderer((input, label, { options, disabled, onChangeAction, placeholder }) => {
    function handleInputChange(option) {
        if (onChangeAction) {
            onChangeAction(option);
        }
        input.onChange(option);
    }

    return (
        <Select
            name={input.name}
            value={input.value}
            options={options}
            onBlur={() => input.onBlur(input.value)}
            onChange={handleInputChange}
            placeholder={placeholder}
            disabled={disabled}
            multi
        />
    )
})

const RenderSwitch = createRenderer((input, label, { checked,placeholder, options, disabled, onChangeAction,onKeyAction }) => {
    function handleInputChange(value) {
        if (onChangeAction) {
            onChangeAction(value);
        }
        input.onChange(value);
    }

    function handleOnKeyDown(e){
        if(onKeyAction){
            onKeyAction(e);
        }
    }

    return (
        <div>
        <Switch
        onChange={handleInputChange}
         onKeyDown ={handleOnKeyDown}
        checked={input.value}
        className="react-switch"
        />
        </div>
    )
})



const RenderPassword = createRenderer((input, label, { placeholder }) =>
    <input {...input} type="password" placeholder={placeholder} className="form-control" />
)

const createPlainRenderer = render => ({ input, meta, label, iconClass, ...rest }) => {
    return (render(input, label, rest));
}

const RenderHiddenInput = createPlainRenderer((input, label, { placeholder, autoFocus }) =>
    <input {...input} placeholder={placeholder} type="hidden" className="form-control" />
)

const RenderTextArea = createRenderer((input, label, { placeholder, rows, cols,disabled,autoFocus }) => {
    return (<textarea {...input} disabled={disabled}  placeholder={placeholder} rows={rows} cols={cols} autoFocus={autoFocus} className="form-control"></textarea>
    )
})

const RenderPlainTextArea = createPlainRenderer((input, label, { placeholder, rows, cols }) => {
    return (

        <textarea {...input} placeholder={placeholder} rows={rows} cols={cols} className="form-control"></textarea>
    )
})

//Begin Plain Checkbox
const RenderPlainCheckbox = createPlainRenderer((input, label, { name, className }) => {
    function onChange(ev) {
        input.onChange(ev);
    }


    return (
        <span className={input.value ? "checked" : ""}>
            <input
                name={name}
                type="checkbox"
                className={className}
                onChange={onChange.bind(this)}
                checked={input.value}
                className="form-control" />
        </span>)
})
//End Plain Checkbox

//Begin RenderCheckBox

const RenderCheckbox = createPlainRenderer((input, label, { name, checkLabel }) => {
    function onChange(ev) {
        input.onChange(ev);
    }
    return (
        <div className="form-group">
            <label className="control-label col-sm-2">{label}</label>
            <div className="col-sm-10" style={{ paddingLeft: 20, paddingTop: 5 }}>
                <div className="col-sm-12>">
                    <input
                        name={name}
                        type="checkbox"
                        // className={className}
                        onChange={onChange.bind(this)}
                        checked={input.value}
                    /> {checkLabel}
                </div>
            </div>
        </div>

    )
})
// End RenderCheckBox

const RenderSelect = createRenderer((input, label, { placeholder, options, disabled, onChangeAction }) => {
    function handleInputChange({ value }) {
        if (onChangeAction) {
            onChangeAction(value);
        }
        input.onChange(value);
    }

    return (
        <Select
            style={disabled ? { border: 'none', textDecoration: 'underline', backgroundColor: 'lightgrey' } : null}
            name={input.name}
            value={input.value}
            options={options}
            onBlur={() => input.onBlur(input.value)}
            onChange={handleInputChange}
            disabled={disabled}
            placeholder={placeholder}
        />
    )
})
const RenderSmallSelect = createRenderer((input, label, { placeholder, options, disabled, onChangeAction }) => {
    function handleInputChange({ value }) {
        if (onChangeAction) {
            onChangeAction(value);
        }
        input.onChange(value);
    }

    return (
        <Select
            style={disabled ? { border: 'none', textDecoration: 'underline', backgroundColor: 'lightgrey', width: '200px' } : { width: '200px' }}
            name={input.name}
            value={input.value}
            options={options}
            onBlur={() => input.onBlur(input.value)}
            onChange={handleInputChange}
            disabled={disabled}
            placeholder={placeholder}
        />
    )
})

const RenderRadio = createPlainRenderer((input, label, { options, isAlignRight, isInline, onChangeAction }) => {
    function handleInputChange(e) {
        if (onChangeAction) {
            onChangeAction(e.target.value);
        }

        input.onChange(e.target.value);
    }

    if (isInline) {
        return (
            <div className="form-group">
                <label className="control-label col-sm-2">{label}</label>
                <div className="control-label col-sm-10" style={{ textAlign: (isAlignRight ? 'right' : 'left'), padding: '0 0 10px' }}>
                    {options.map(item =>
                        <label style={input.value === item.value && input.value== "true"?{color:'blue'}:null} key={item.value} className={["radio-inline", isAlignRight ? " radio-right" : "radio-left"].join(" ")}>
                            <div  className="choice" id={"uniform-" + input.name}>
                                <span style={input.value === item.value && input.value== "true"? {borderColor :'blue',backgroundColor:'white'}:{borderColor :'grey'}}  className={input.value === item.value ? 'checked' : ''}>
                                    <input  id={item.value} value={item.value} onChange={handleInputChange} type="radio" name={input.name} />
                                </span>
                            </div>
                            {item.label}
                        </label>
                    )}
                </div>
            </div>
        )
    } else {
        return (
            <div className="form-group">
                <label className="control-label">{label}</label>
                {options.map(item =>
                    <div key={item.value} style={{ textAlign: (isAlignRight ? 'right' : 'left'), padding: '0 0 10px' }}>
                        <label className={["radio-inline", isAlignRight ? " radio-right" : "radio-left"].join(" ")}>
                            <div className="choice" id={"uniform-" + input.name}>
                                <span className={input.value === item.value ? 'checked' : ''}>
                                    <input id={item.value} value={item.value} onChange={handleInputChange} type="radio" name={input.name} />
                                </span>
                            </div>
                            {item.label}
                        </label>
                    </div>
                )}
            </div>)
    }

})

const RenderPlainSelect = createPlainRenderer((input, label, { options, onChangeAction }) => {
    function handleInputChange({ value }) {
        if (onChangeAction) {
            onChangeAction(value);
        }
        //return only input.value for the form
        input.onChange(value)
    }

    return (
        <Select
            name={input.name}
            value={input.value}
            options={options}
            onBlur={() => input.onBlur(input.value)}
            onChange={handleInputChange}
        />)
})

const RenderPlainDatePicker = createPlainRenderer((input, label, { dateFormat }) => {
    function handleChangeDate(value) {
        input.onChange(value)
    }

    return (
        <DatePicker
            name={input.name}
            selected={input.value}
            dateFormat={dateFormat}
            onChange={handleChangeDate}
            className="form-control">
        </DatePicker>
    )
});


const RenderDatePicker = createRenderer((input, label,{ disabled, dateFormat, placeholder, onChangeAction}) => {

    function handleChangeDate(value) {
        if (onChangeAction) {
            onChangeAction(value);
        }
        input.onChange(value)
    }
    return (
        <DatePicker
            disabled={disabled}
            selected={input.value}
            dateFormat={dateFormat}
            onChange={handleChangeDate}
            className="form-control">
        </DatePicker>
            
    )
});

// const RenderDateMultiPicker = createRenderer((input, label,{ disabled, dateFormat,defaultValue, placeholder, onChangeAction}) => {

//     // function handleChangeDate(value) {
//     //     if (onChangeAction) {
//     //         onChangeAction(value);
//     //     }
//     //     input.onChange(value)
//     // }
//     var  selectedDays  = [];
//     function handleDayClick(day) {
//         if(day){
//             selectedDays.push((moment(day).format("DD/MM/YYYY")));
//         }
//         input.onChange(selectedDays)
//         // if (selected) {
//         //   const selectedIndex = selectedDays.findIndex(selectedDay =>
//         //     DateUtils.isSameDay(selectedDay, day)
//         //   );
//         //   alert(selectedIndex)
//         //   selectedDays.splice(selectedIndex, 1);
//         // } else {
//         //   selectedDays.push(day);
//         // }
//       }
//     return (
//         <div >
//          <input 
//          type="text"
//          value={selectedDays}
//       disabled={disabled}
//       placeholder={placeholder}
//        onChange={handleDayClick}
//     //   readOnly={true} 
//        className="form-control" />
//         <DayPicker
//           selectedDays={selectedDays}
//           onDayClick={handleDayClick}
//         />
        
//       </div>
     
 
            
//     )
// });

const RenderDateMultiPicker = createRenderer((input,label, { type, placeholder, disabled, readOnly, autoFocus, onChangeAction,startDateToHide,
    endDateToHide,onEnterAction }) => {
    
    var  selectedDays  = [];
    // var selectDaysCheck=null;
    var currentValue = null; 
    var dateExist = null;
    function handleDayClick(daySelected) {
       
        if(daySelected){
            var endDateToHide1 = new Date(endDateToHide);
            endDateToHide1.setDate(endDateToHide1.getDate() + 1);
            if(dateFns.isWithinRange(daySelected,new Date(startDateToHide),endDateToHide1)){

                if(input.value){
                    var arrayParse =  input.value.toString().split(",")
                    // alert(input.value.length);
                    currentValue = arrayParse;
                }
                if(currentValue){
                    currentValue.map((item,index)=>{
                        if(item == daySelected.toString()){
                            dateExist =daySelected.toString();
                        }else{
                            if(!StringUtils.isEmptyOrSpaces(item.toString())){
                                selectedDays.push(item);
                            }
                        }
                    })
                // Check UnChecked Date
                    if(dateExist == daySelected.toString()){
                    }else {
                        selectedDays.push(daySelected);
                    }

                }else{
                    selectedDays.push(daySelected);
                }   
            
            

            
        
                if (onChangeAction) {
                    onChangeAction(selectedDays);
                }
                input.onChange(selectedDays);
            }
        }
}
    
    
    function handleKeyDown(e) {
        if (e.key == 'Enter') {
          if(onEnterAction){
            onEnterAction(e.target.value)
          }
        }
      }
    return(<div>
        <input {...input}
            onKeyDown={handleKeyDown}
            type={type}
            style={disabled ? { border: 'none', textDecoration: 'underline', backgroundColor: 'lightgrey' } : null}
            disabled={true}
            placeholder={placeholder} 
            value={ [Array.isArray(input.value) ? 
                input.value.map(item=>{ 
                   
                        return  moment(item).format("DD/MM/YYYY");
                    
                }):null]
    
            }
            onChange={handleDayClick}
            readOnly={readOnly} autoFocus={autoFocus} className="form-control" />
            <DayPicker
            disabledDays={startDateToHide && endDateToHide?
                [
                    {   before: new Date(startDateToHide),
                        after:new Date(endDateToHide)}
                ]:null
            } 
         
          selectedDays={  Array.isArray(input.value) ? 
            input.value.map(item=>{ 
                return  new Date(item);
            }):null

        }
        
          onDayClick={handleDayClick}
          
        />
       
    </div>)
})
const RenderDatePickerMinPrev = createRenderer((input, label, { disabled,numberDayAdd, type, dateFormat, placeholder, onChangeAction,minDate,maxDate }) => {
    function handleChangeDate(value) {
        if (onChangeAction) {
            onChangeAction(value);
        }
        input.onChange(value)
    }
    var numberDayAdd = numberDayAdd? numberDayAdd: 0;
    return (
        <DatePicker
            type={type}
            disabled={disabled}
            selected={input.value}
            dateFormat={dateFormat}
            onChange={handleChangeDate}
            minDate={moment(minDate, "DD-MM-YYYY").add(numberDayAdd, 'days')}
            maxDate={moment(maxDate, "DD-MM-YYYY").add(numberDayAdd, 'days')}
            className="form-control"
            // minDate={new Date()}
           // maxDate={today.setDate(60)}
            >
        </DatePicker>
    )
});

// const RenderDisableRangeDatePicker = createRenderer((input, label, { disabled, type, dateFormat, placeholder, onChangeAction, minDate, maxDate , isBirthday}) => {
  
//     var today = new Date();
//     function handleChangeDate(value) {
//         if (onChangeAction) {
//             onChangeAction(value);
//         }
//         input.onChange(value)
//     }
//         if(isBirthday){
//             // minDate =  moment(minDate, "DD-MM-YYYY").minute(468, 'months');
//             maxDate = moment(today, "DD-MM-YYYY").add(-216, 'months');
//         }
//     return (
//         <DatePicker
//             type={type}
//             disabled={disabled}
//             selected={input.value}
//             dateFormat={dateFormat}
//             onChange={handleChangeDate}
//             minDate = {minDate}
//             maxDate = {maxDate}
//             // minDate =  {minDate ? moment(minDate, "DD-MM-YYYY").add(300, 'months') : null}
//             // maxDate = {maxDate ? moment(minDate, "DD-MM-YYYY").add(1, 'months') : null}
//             className="form-control">
//         </DatePicker>
//     )
// });


export {
    createPlainRenderer,
    RenderInput,
    RenderReadOnlyInput,
    RenderInputWithDiv,
    RenderInputWithGen,
    RenderHiddenInput,
    RenderSelect,
    RenderMoneyFormat,
    RenderNumberInput,
    RenderMultiSelect,
    RenderPassword,
    RenderPlainCheckbox,
    RenderPlainSelect,
    RenderRadio,
    RenderPlainTextArea,
    RenderPlainDatePicker,
    RenderInputMultiFile,
    RenderTextArea,
    RenderDatePicker,
    RenderCheckbox,
    RenderTimeWrapper,
    RenderSmallInput,
    RenderSmallSelect,
    RenderInputWithGenPass,
    RenderInputPassword,
    RenderNumberInputPhone,
    RenderDatePickerMinPrev,
    RenderSwitch,
    RenderDateMultiPicker
    // RenderDisableRangeDatePicker 
}
