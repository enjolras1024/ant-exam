
class Icon extends Extag.Component {
  render(props) {
    let clazz = '';
    switch (props.type) {
      case 'success':
        clazz = 'ant-icon-success';
        break;
      case 'fail':
        clazz = 'ant-icon-fail';
        break;
    }
    return (
      Extag.node('i', {'class': 'ant-icon ' + clazz})
    )
  } 
}

function pad0(n) {
  return (n < 10 ? '0' : '') + n;
}

function format(time) {
  time = Math.floor(time / 1000);
  const seconds = Math.floor(time % 60);
  const minutes = Math.floor(time / 60 % 60);
  const hours = Math.floor(time / 3600);
  return pad0(hours) + ':' + pad0(minutes) + ':' + pad0(seconds);
}

class Job extends Extag.Component {
  static get attributes() {
    return {
      name: '',
      time: 0,
      status: ''
    }
  }
  static get resources() {
    return {
      Icon,
      format
    }
  }
  static get template() {
    return `
      <div class="ant-job">
        <Icon type@="status" />&nbsp;
        <span class="ant-name" title@="name">@{name}</span>&nbsp;
        <span class="ant-time">@{format(time)}</span>
        <div class="ant-line-l1"></div>
        <div class="ant-line-l2"></div>
        <div class="ant-line-r1"></div>
        <div class="ant-line-r2"></div>
      </div>
    `
  }
}

class Stage extends Extag.Component {
  static get attributes() {
    return {
      title: '',
      jobs: null
    }
  }
  static get resources() {
    return {
      Job
    }
  }
  static get template() {
    return `
      <div class="ant-stage">
        <h3 title@="title">@{title}</h3>
        <div>
          <Job x:for="job of jobs" x:key="job.id" name@="job.name" time@="job.time" status@="job.status" />
        </div>
      </div>
    `
  } 
}

class PipeLine extends Extag.Component {
  static get attributes() {
    return {
      stages: null
    }
  }
  static get resources() {
    return {
      Stage
    }
  }
  static get template() {
    return `
      <div class="ant-pipeline">
        <Stage x:for="stage of stages" x:key="stage.id" title@="stage.title" jobs@="stage.jobs" />
      </div>
    `
  }
}

new Extag.Element({
  tag: 'div',
  contents: [
    Extag.node(PipeLine, {
      stages: data.stages
    })
  ]
}).attach(document.getElementById('demo'));