var Todo = React.createClass({
  displayName: "Todo",

  render: function () {
    return React.createElement(
      "li",
      { className: "todo", id: "{this.props.id}" },
      this.props.children,
      "\xA0 - \xA0",
      this.props.done ? React.createElement(
        "span",
        null,
        "Done!"
      ) : React.createElement(
        "a",
        { href: "#" },
        "Mark as done"
      )
    );
  }
});

var TodoList = React.createClass({
  displayName: "TodoList",

  render: function () {
    var todoNodes = this.props.data.map(function (todo) {
      return React.createElement(
        Todo,
        { id: todo.id, done: todo.done ? true : false },
        todo.description
      );
    });
    return React.createElement(
      "ul",
      { className: "todo-list" },
      todoNodes
    );
  }
});

var TodoForm = React.createClass({
  displayName: "TodoForm",

  render: function () {
    return React.createElement(
      "form",
      { className: "todo-form" },
      React.createElement("input", { type: "text" }),
      React.createElement("input", { type: "submit", value: "Add todo" })
    );
  }
});

var TodoBox = React.createClass({
  displayName: "TodoBox",

  createTodo: function (description) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: description,
      success: function (data) {
        this.setState({ data: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  getInitialState: function () {
    return { data: [] };
  },

  componentDidMount: function () {
    this.loadTodoList();
    setInterval(this.loadTodoList, 2000);
  },

  render: function () {
    return React.createElement(
      "div",
      { className: "todo-box" },
      React.createElement(
        "h1",
        null,
        "Todo List"
      ),
      React.createElement(TodoList, { data: this.state.data }),
      React.createElement(TodoForm, { createTodo: this.createTodo })
    );
  }
});

ReactDOM.render(React.createElement(TodoBox, { url: "/api/todos" }), document.getElementById('main'));