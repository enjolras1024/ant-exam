const data = {
  stages: [
    {
      id: 1,
      title: '编译',
      jobs: [
        {
          id: 1.1,
          name: '编译',
          time: (60 * 1 + 1) * 1000,
          status: 'success'
        }
      ]
    },
    {
      id: 2,
      title: '部署',
      jobs: [
        {
          id: 2.1,
          name: '部署',
          time: (60 * 2 + 9) * 1000,
          status: 'success'
        }
      ]
    },
    {
      id: 3,
      title: '代码扫描和检查',
      jobs: [
        {
          id: 3.1,
          name: 'STC',
          time: (60 * 2 + 26) * 1000,
          status: 'success'
        },
        {
          id: 3.2,
          name: 'PMD',
          time: (60 * 0 + 52) * 1000,
          status: 'success'
        },
        {
          id: 3.3,
          name: '其他',
          time: (60 * 1 + 12) * 1000,
          status: 'success'
        },
      ]
    },
    {
      id: 4,
      title: '集成测试',
      jobs: [
        {
          id: 4.1,
          name: '集成测试',
          time: (60 * 5 + 34) * 1000,
          status: 'fail'
        },
        {
          id: 4.2,
          name: '单元测试',
          time: (60 * 5 + 34) * 1000,
          status: 'fail'
        }
      ]
    }
  ]
}