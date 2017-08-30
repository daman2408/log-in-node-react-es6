import React from 'react';

class Clock extends React.Component {
  constructor() {
    super();
    this.state = {
      time: new Date().toLocaleString()
    }
  }

  tick = () => {
    this.setState({
      time: new Date().toLocaleString()
    })
  }

  componentDidMount() {
    this.timer = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    return (
      <section>
        <div className="container">
          <h2>{this.state.time}</h2>
        </div>
      </section>
    )
  }

}

export default Clock;
