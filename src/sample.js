var ReactDOM = require('react-dom');
var React = require('react');
var Form  = require('../lib/form');

var SchemaEditor = React.createClass({
  displayName: 'SchemaEditor',

  preventSubmit: function(event) {
    event.preventDefault();
  },
  render: function() {
    return (
      <form onSubmit={this.preventSubmit}>
        <textarea rows="30" cols="60" onChange={this.props.onChange} value={this.props.value}></textarea>
      </form>
    );
  }
});


var FieldWrapper = React.createClass({
  render: function() {
    var errors  = (this.props.errors || []).join('\n');
    var classes = [].concat(errors ? 'error' : [],
                            'form-element',
                            this.props.classes || []);
    var helpClasses  =
      'form-help' + (this.props.description ? '' : ' invisible');
    var errorClasses =
      'form-error' + (errors ? '' : ' invisible');

    return (
        <div className={classes.join(' ')} key={this.props.label}>
          <label htmlFor={this.props.label}>
            {this.props.schema.label}
          </label>
          <span className={helpClasses} title={this.props.description}>
          </span>
          {this.props.children}
          <span className={errorClasses} title={errors}>
          </span>
        </div>
    );
  }
});

var SectionWrapper = React.createClass({
  render: function() {
    var errors  = (this.props.errors || []).join('\n');
    var level = this.props.path.length;
    var classes = [].concat(errors ? 'error' : [],
                            'form-section',
                            (level > 0 ? 'form-subsection' : []),
                            this.props.classes || []);
    var helpClasses  =
      'form-help' + (this.props.description ? '' : ' hidden');
    var errorClasses =
      'form-error' + (errors ? '' : ' hidden');

    return (
        <fieldset className={classes.join(' ')} key={this.props.label}>
          <legend className="form-section-title">
            {this.props.title}
            <span className={helpClasses} title={this.props.description}>
            </span>
            <span className={errorClasses} title={errors}>
            </span>
          </legend>
          {this.props.children}
        </fieldset>
    );
  }
});

var Header = React.createClass({
    render: function () {
        return (
            <header className="bar bar-nav">
                <a href="#" className={"icon icon-left-nav pull-left" + (this.props.back==="true"?"":" hidden")}></a>
                <h1 className="title">{this.props.text}</h1>
            </header>
        );
    }
});


var RecordList = React.createClass({
    propTypes: {
        data: React.PropTypes.array.isRequired
    },
    render: function () {
        var Records = this.props.data.map(function (record){
            return <RecordItem key={record.key} recorditem = {record} />
        });
        return (
            <ul className="table-view">
                {Records}
            </ul>
        );
    }
});

var RecordItem = React.createClass({
    render: function () {
        return (
            <li className="table-view-cell media">
               <Form buttons={['Submit', 'Cancel']}
                    schema={this.props.recorditem}
                    fieldWrapper={FieldWrapper}
                    sectionWrapper={SectionWrapper} 
                    />       
            </li>
        );
    }
});

var HomePage = React.createClass({
    loadConversationsFromServer: function() {
    return $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
      });
    },
    getInitialState: function() {
        return {
            data: []
            };
    },
    componentDidMount: function() {
        this.loadConversationsFromServer();
        this.setInterval(this.loadConversationsFromServer, this.props.pollInterval);
    },
    componentWillMount: function() {
        this.intervals = [];
    },
    setInterval: function() {
        this.intervals.push(setInterval.apply(null, arguments));
    },
    componentWillUnmount: function() {
        this.intervals.map(clearInterval);
    },
    render: function () {
        return (
            <div>
                <Header text="Example Form" back="false"/>
                <div className="content">
                    <RecordList data={this.state.data} />
                </div>
            </div>
        );
    }
});

ReactDOM.render(
  <HomePage url="./json/forms.json" pollInterval={20000} />,
  document.getElementById('app')
);