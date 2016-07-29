import React from 'react'
import Header from './frame/header.jsx';
import SmartInput from '../lib/fields/SmartInput.js';

class FormPanel extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }
  constructor(props) {
    super(props);    
    this.state = { data: [] };
  }
  loadFieldsFromServer() {
    var token = get_cookie("token");
    var path = '/login';
    $.ajax({
      url: "http://jsx-dev-react.herokuapp.com/form/FormFields",
      dataType: 'json',
      cache: false,
      Type: 'GET',
      headers: { 'x-access-token': token},
      /*beforeSend: function(xhr){xhr.setRequestHeader();},*/
      success: function(data) {

        if(data.success==false){
          this.context.router.push(path);    
        }else{
          this.setState({data: data});  
        }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
        this.context.router.push(path);
      }.bind(this)
    });
  }
  componentDidMount() {
    this.loadFieldsFromServer();
  }
  render() {
    return (
      <div>
        <Header text="Lead Form" back="true" />
        <FieldList data={this.state.data} />
      </div>
    );
  }
};


class FieldList extends React.Component{
	render() {
		var fieldItems = this.props.data.map(function (fields) {
			return (
				<FieldItem key ={fields._id} fieldItem = {fields} /> 
			);
		});
		return (
			<div className="content">
				{fieldItems}
			</div>
		);
	}
};

class FieldItem extends React.Component{
  render() {
    if(this.props.fieldItem.type==='string'){
      return <SmartInput label={this.props.fieldItem.label} type={this.props.fieldItem.type}/>
    }else{
      return (
        <div>
        </div>
      );
    }
  }
};

module.exports = FormPanel;