import React from 'react';
import { Container, Header, Content, Form, Item, Picker, Icon, Textarea,Text, Input, Label } from 'native-base';
import moment from 'moment' ;
import styles from "../screens/home/styles.js";
import { TextInput } from 'react-native-gesture-handler';
import MultiSelect from 'react-native-multiple-select';
import DatePicker from 'react-native-datepicker';
// import SelectSearch from 'react-select-search'
// The renderer support label or iconClass or none (not both).


const createRenderer = render => ({ input, meta, ...rest }) => {
        // return render(input, rest)
        return (
        <Form style={styles.formGroup}>
            {render(input, rest)}
            {meta.error && meta.invalid ?
                <Text style={{color:'red'}}>{meta.error}</Text> : null}
    </Form>);
}

const RenderPicker = createRenderer((input, { placeholder, options, disabled, onChangeAction }) => {
    function handleInputChange(value) {
        if (onChangeAction) {
            onChangeAction(value);
        }
        input.onChange(value);
    }

    return (
        
        <Picker
        mode="dropdown"
        iosIcon={<Icon name="arrow-down" />}
        style={{ width: undefined }}
        disabled={disabled}
        placeholder={placeholder}
        placeholderStyle={{ color: "#bfc6ea" }}
        placeholderIconColor="#007aff"
        selectedValue={input.value}
        onValueChange={handleInputChange}


    >
     {options}   
</Picker>
    )
})
const RenderSelect = createRenderer((input, { placeholder,label, options, disabled, onChangeAction }) => {
    function handleInputChange([value]) {
        if (onChangeAction) {
            onChangeAction(value);
        }
        input.onChange(value);
    }

    return (
        [input.value ?
        // <Item style={styles.formGroup}>
        <Label style={{fontSize:13,color:'#00796B'}}>{label}</Label>
        // </Item>
         :null,
        <MultiSelect
        key ={"MultiSelect_"+label}
        single ={true}
        items={options}
        disabled={true}
        canAddItems={false}
        // value={input.value}
        // hideDropdown={true}
        uniqueKey="id"
        // hideTags={true}
        onSelectedItemsChange={handleInputChange}
        selectedItems={[input.value]}
        selectText={placeholder}
        searchInputPlaceholderText={placeholder}
        // altFontFamily="ProximaNova-Light"
        tagRemoveIconColor="#CCC"
        tagBorderColor="#CCC"
        tagTextColor="#CCC"
        // onChangeInput={}
        selectedItemTextColor="#CCC"
        selectedItemIconColor="#CCC"
        itemTextColor="#000"
        searchInputStyle={{ color: '#CCC' }}
        // onChangeInput={textSearch=>textSearch}
        
        fixedHeight={true}
        // submitButtonColor="#7f0800"
        // submitButtonText="Submit"
        /> 
]
   
      )
                  
                  
})

const RenderTextArea = createRenderer((input,{ placeholder,label, disabled,rows, cols }) => {
    return (
       [input.value ?
        <Label style={{fontSize:13,color:'#00796B'}}>{label}</Label>
         :null ,
    <Textarea   {...input} disabled={disabled} rowSpan={rows} bordered={true} placeholder={placeholder} />]
    )
})
const RenderTextInput = createRenderer((input,{ label,placeholder,disabled, rows, cols }) => {
    return (
        [input.value ?
        <Label style={{fontSize:13,color:'#00796B'}}>{label}</Label>
        :null ,
    <TextInput {...input}  style={{marginBottom:10}} value={input.value} borderBottomWidth={1} borderBottomColor={'lightgrey'} disabled={disabled} placeholder={placeholder} />]
    )
})
const RenderPasswordInput = createRenderer((input,{ label,placeholder,disabled, rows, cols }) => {
    return (
        [input.value ?
                <Label style={{fontSize:13}}>{label}</Label>:null, 
    <TextInput  secureTextEntry={true} style={{marginBottom:10}} {...input}  value={input.value} borderBottomColor={'lightgrey'} borderBottomWidth={1} disabled={disabled} placeholder={placeholder} />]
    )
})
const RenderNumberInput = createRenderer((input,{ label,placeholder,editable, rows, cols }) => {
    return (
        [input.value ?
                <Label style={{fontSize:13,color:'#00796B'}}>{label}</Label>: null,
    <TextInput {...input} style={{marginBottom:10}}style={editable==false?{backgroundColor:'lightgrey',height:32}:null}   keyboardType='numeric' value={(input.value).toString().replace(/[^0-9]/g, '')} borderBottomColor={'lightgrey'} borderBottomWidth={1} editable={editable} placeholder={placeholder} />]
    )
})






const RenderDatePicker = createRenderer((input,{ label,disabled, dateFormat, placeholder, onChangeAction}) => {

    function handleChangeDate(dateNotGoog, value){
        if (onChangeAction) {
            onChangeAction(value);
        }
        input.onChange(value);
    }
    return (
        [input.value ?
        <Label style={{fontSize:13,color:'#00796B'}}>{label}</Label>
             :null,
    <DatePicker
            // defaultDate={new Date(2018, 4, 4)}
            // minimumDate={new Date(2018, 1, 1)}
            // maximumDate={new Date(2018, 12, 31)}
            style={{width: "100%"}}
        date={input.value}
        mode="date"
        placeholder={placeholder}
        format="DD-MM-YYYY"
        // minDate="2016-05-01"
        // maxDate="2016-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36,
            fontSize:16
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={handleChangeDate}
            />]
           
            
    )
});


// const RenderSmallSelect = createRenderer((input, label, { placeholder, options, disabled, onChangeAction }) => {
//     function handleInputChange({ value }) {
//         if (onChangeAction) {
//             onChangeAction(value);
//         }
//         input.onChange(value);
//     }

//     return (
//         <Select
//             style={disabled ? { border: 'none', textDecoration: 'underline', backgroundColor: 'lightlightgrey', width: '200px' } : { width: '200px' }}
//             name={input.name}
//             value={input.value}
//             options={options}
//             onBlur={() => input.onBlur(input.value)}
//             onChange={handleInputChange}
//             disabled={disabled}
//             placeholder={placeholder}
//         />
//     )
// })

// const RenderRadio = createPlainRenderer((input, label, { options, isAlignRight, isInline, onChangeAction }) => {
//     function handleInputChange(e) {
//         if (onChangeAction) {
//             onChangeAction(e.target.value);
//         }

//         input.onChange(e.target.value);
//     }

//     if (isInline) {
//         return (
//             <div className="form-group">
//                 <label className="control-label col-sm-2">{label}</label>
//                 <div className="control-label col-sm-10" style={{ textAlign: (isAlignRight ? 'right' : 'left'), padding: '0 0 10px' }}>
//                     {options.map(item =>
//                         <label key={item.value} className={["radio-inline", isAlignRight ? " radio-right" : "radio-left"].join(" ")}>
//                             <div className="choice" id={"uniform-" + input.name}>
//                                 <span className={input.value === item.value ? 'checked' : ''}>
//                                     <input id={item.value} value={item.value} onChange={handleInputChange} type="radio" name={input.name} />
//                                 </span>
//                             </div>
//                             {item.label}
//                         </label>
//                     )}
//                 </div>
//             </div>
//         )
//     } else {
//         return (
//             <div className="form-group">
//                 <label className="control-label">{label}</label>
//                 {options.map(item =>
//                     <div key={item.value} style={{ textAlign: (isAlignRight ? 'right' : 'left'), padding: '0 0 10px' }}>
//                         <label className={["radio-inline", isAlignRight ? " radio-right" : "radio-left"].join(" ")}>
//                             <div className="choice" id={"uniform-" + input.name}>
//                                 <span className={input.value === item.value ? 'checked' : ''}>
//                                     <input id={item.value} value={item.value} onChange={handleInputChange} type="radio" name={input.name} />
//                                 </span>
//                             </div>
//                             {item.label}
//                         </label>
//                     </div>
//                 )}
//             </div>)
//     }

// })

// const RenderPlainSelect = createPlainRenderer((input, label, { options, onChangeAction }) => {
//     function handleInputChange({ value }) {
//         if (onChangeAction) {
//             onChangeAction(value);
//         }
//         //return only input.value for the form
//         input.onChange(value)
//     }

//     return (
//         <Select
//             name={input.name}
//             value={input.value}
//             options={options}
//             onBlur={() => input.onBlur(input.value)}
//             onChange={handleInputChange}
//         />)
// })

// const RenderPlainDatePicker = createPlainRenderer((input, label, { dateFormat }) => {
//     function handleChangeDate(value) {
//         input.onChange(value)
//     }

//     return (
//         <DatePicker
//             name={input.name}
//             selected={input.value}
//             dateFormat={dateFormat}
//             onChange={handleChangeDate}
//             className="form-control">
//         </DatePicker>
//     )
// });


// const RenderDatePicker = createRenderer((input, label,{ disabled, dateFormat, placeholder, onChangeAction}) => {

//     function handleChangeDate(value) {
//         if (onChangeAction) {
//             onChangeAction(value);
//         }
//         input.onChange(value)
//     }
//     return (
//         <DatePicker
//             disabled={disabled}
//             selected={input.value}
//             dateFormat={dateFormat}
//             onChange={handleChangeDate}
//             className="form-control">
//         </DatePicker>
            
//     )
// });
// const RenderDatePickerMinPrev = createRenderer((input, label, { disabled, type, dateFormat, placeholder, onChangeAction,minDate }) => {
//     function handleChangeDate(value) {
//         if (onChangeAction) {
//             onChangeAction(value);
//         }
//         input.onChange(value)
//     }
//     return (
//         <DatePicker
//             type={type}
//             disabled={disabled}
//             selected={input.value}
//             dateFormat={dateFormat}
//             onChange={handleChangeDate}
//             minDate={moment(minDate, "DD-MM-YYYY").add(1, 'days')}
//             className="form-control"
//             // minDate={new Date()}
//            // maxDate={today.setDate(60)}
//             >
//         </DatePicker>
//     )
// });

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
   
    RenderPicker,
    RenderTextArea,
    RenderDatePicker,
    RenderTextInput,
    RenderNumberInput,
    RenderPasswordInput,
    RenderSelect
   
}
