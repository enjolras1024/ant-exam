const node = React.createElement;

function Icon(props) {
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
    node('i', {className: 'ant-icon ' + clazz})
  )  
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

const L1 = node('div', {className: 'ant-line-l1'});
const L2 = node('div', {className: 'ant-line-l2'});
const R1 = node('div', {className: 'ant-line-r1'});
const R2 = node('div', {className: 'ant-line-r2'});

function Job(props) {
  return (
    node('div', {className: 'ant-job'}, 
      node(Icon, {type: props.status}), ' ',
      node('span', {className: 'ant-name', title: props.name}, props.name), ' ',
      node('span', {className: 'ant-time'}, format(props.time)), ' ',
      L1,
      L2,
      R1,
      R2
    )
  )
}

function Stage(props) {
  return (
    node('div', {className: 'ant-stage'},
      node('h3', {title: props.title}, props.title),
      node('div', null, props.jobs.map(function(job) {
        return node(Job, {key: job.id, name:job.name, time: job.time, status: job.status});
      }))
    )
  )
}

function PipeLine(props) {
  return (
    node('div', {className: 'ant-pipeline'}, props.stages.map(function(stage) {
      return node(Stage, {key: stage.id, title: stage.title, jobs: stage.jobs})
    }))
  )
}

ReactDOM.render(node(PipeLine, {stages: data.stages}), document.getElementById('demo'));