import React from 'react';
import TreeSelect, { TreeNode, SHOW_PARENT } from 'rc-tree-select';
import Select from "react-select";
const options = [
    { value: 'X-Quang', label: 'X-Quang' , category: "X-Quang"},
    { value: 'Siêu Âm', label: 'Siêu Âm', category: "Siêu Âm"},
    { value: 'All', label: 'All', category: "All"}
  ];
class TreeSelectCheckBox extends React.Component {
    constructor() {
        super()
        this.state = {
            simpleSearchValue: '',
            treeDataSimpleMode: {
                id: 'key',
                rootPId: 0,
            },
            selectedOption: 'All',
        }
        this.onChange = this.onChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentWillMount(){
        this.setState({
            treedata: this.props.listdata
        })
    }
    handleChange(selectedOption){
        const{listdata}=this.props;
        if(selectedOption.category == 'All'){
            this.setState({
                selectedOption: selectedOption,
                treedata: listdata
            })
        }
        else{
            this.setState({ 
                selectedOption: selectedOption,
                treedata: listdata.filter(item => item.category == selectedOption.category )
            });
        }
        
      }
    onChange(value) {
        this.props.input.onChange(value);
    }
    onSearch(simpleSearchValue) {
        this.setState({ simpleSearchValue });
    }
    render() {
        const { input, defaultValue, label, listdata } = this.props;
        return (
            <div className="form-group">
                <label className="control-label col-sm-2">{label}</label>
                <div className="col-sm-10">
                    <div className="col-sm-12">
                        <Select
                            value={this.state.selectedOption}
                            options={options}
                            onChange={this.handleChange}
                        />
                        <TreeSelect
                            choiceTransitionName="rc-tree-select-selection__choice-zoom"
                            style={{ width: '100%', borderRadius: '0px' }}
                            dropdownStyle={{ maxHeight: 500, overflow: 'auto' }}
                            placeholder={<i>Chọn Xét Nghiệm...</i>}
                            searchPlaceholder="please search"
                            treeLine
                            maxTagTextLength={10}
                            searchValue={this.state.simpleSearchValue}
                            onSearch={this.onSearch}
                            value={input.value || defaultValue}
                            treeData={this.state.treedata}
                            treeNodeFilterProp="title"
                            treeDataSimpleMode={this.state.treeDataSimpleMode}
                            treeCheckable
                            showCheckedStrategy={SHOW_PARENT}
                            onChange={this.onChange}
                            onSelect={this.onSelect}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default TreeSelectCheckBox;
