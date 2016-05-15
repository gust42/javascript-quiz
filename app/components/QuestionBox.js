var QuestionBox = React.createClass({
  data : null,
  right : 0,
  getInitialState: function() {
    return {
      result : '',
      resultText : '',
      question: {
        title : '',
        alternatives : []
    }};
  },
  componentDidMount: function() {
    fetch('../data.json', {
	    method: 'get'
    }).then(response => {
      return response.json();
    })
    .then(json => {
      this.data = json;
      this.generateQuestion();
    })
    .catch(err => {
        // Error :(
          console.log(err);
    });
  },
  generateQuestion() {
    this.right = Math.round(Math.random()*this.data.length);
      
    var question = {
      title : this.data[this.right].text,
      alternatives : shuffle([
        this.data[this.right].title,
        this.data[Math.round(Math.random()*this.data.length)].title,
        this.data[Math.round(Math.random()*this.data.length)].title
      ])
    }
        
    this.setState({question : question, result : '', resultText : ''});
  },
  onAnswer : function(answer) {
    if(answer == this.data[this.right].title)
      this.setState({result : 'correct', resultText : 'Correct answer!'});
    else
      this.setState({result : 'wrong', resultText : 'Wrong answer!'});
     setTimeout(() => {
       this.generateQuestion();
     },1000);
  },
  render: function() {
    var i = 0;
    var answers = this.state.question.alternatives.map(answer => {
      i++;
      return (
        <Answer onAnswer={this.onAnswer} answer={answer} key={i} />
      )
    });
    return (
      <div>
        <Question title={this.state.question.title} />
        {answers}
        <Result resultText={this.state.resultText} result={this.state.result} />
      </div>
    );
  }
});

var Question = React.createClass({
  clickAnswer : () => {
    
  },
  render: function() {
    var title = "";
    if(this.props.title)
      title = this.props.title[0].toUpperCase() + this.props.title.slice(1);
    
    return (
      <div className="question">
        <h2>{title}</h2>
        <div>What does this describe? </div>
      </div>
    );
  }
});

var Answer = React.createClass({
  clickAnswer : function() {
    this.props.onAnswer(this.props.answer);
  },
  render: function() {
    return (
      <div onClick={this.clickAnswer} className="answer">
        {this.props.answer}
      </div>
    );
  }
});

var Result = React.createClass({
  render: function() {
    var className = "result "+ this.props.result;
    return (
      <div className={className}>
        {this.props.resultText}
      </div>
    );
  }
});

ReactDOM.render(
  <QuestionBox  />,
  document.getElementById('content')
);