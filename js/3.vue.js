const Icon = {
  props: {
    type: String 
  },
  render(h) {
    let clazz = '';
    switch (this.type) {
      case 'success':
        clazz = 'ant-icon-success';
        break;
      case 'fail':
        clazz = 'ant-icon-fail';
        break;
    }
    return h('i', {'class': 'ant-icon ' + clazz});
  }
}

function pad0(n) {
  return (n < 10 ? '0' : '') + n;
}

const Job = {
  props: {
    name: String,
    time: Number,
    status: String
  },
  template: `
    <div class="ant-job">
      <Icon :type="status" />
      <span class="ant-name" :title="name">{{name}}</span>
      <span class="ant-time">{{format(time)}}</span>
      <div class="ant-line-l1"></div>
      <div class="ant-line-l2"></div>
      <div class="ant-line-r1"></div>
      <div class="ant-line-r2"></div>
    </div>
  `,
  components: {
    Icon
  },
  methods: {
    format(time) {
      time = Math.floor(time / 1000);
      const seconds = Math.floor(time % 60);
      const minutes = Math.floor(time / 60 % 60);
      const hours = Math.floor(time / 3600);
      return pad0(hours) + ':' + pad0(minutes) + ':' + pad0(seconds);
    }
  }
}

const Stage = {
  props: {
    title: String,
    jobs: Array
  },
  template: `
    <div class="ant-stage">
      <h3 :title="title">{{title}}</h3>
      <div>
        <Job v-for="job of jobs" :key="job.id" :name="job.name" :time="job.time" :status="job.status" />
      </div>
    </div>
  `,
  components: {
    Job
  }
}

const PipeLine = {
  props: {
    stages: Array
  },
  template: `
    <div class="ant-pipeline">
      <Stage v-for="stage of stages" :key="stage.id" :title="stage.title" :jobs="stage.jobs" />
    </div>
  `,
  components: {
    Stage
  }
}

const Demo = {
  data() {
    return {
      stages: data.stages
    }
  },
  template: `
    <div>
      <PipeLine :stages="stages"/>
    </div>
  `,
  components: {
    PipeLine
  }
}

new Vue({
  el: '#demo',
  render: function(h) {
    return h(Demo)
  }
})