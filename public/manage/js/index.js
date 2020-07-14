$(function() {
  var echars1 = echarts.init(document.querySelector(".echarts_1"));
  var option1 = {
    title: {
      text: '2020年注册人数'
    },
    tooltip: {},
    legend: {
      data:['人数']
    },
    xAxis: {
      data: ["1月","2月","3月","4月","5月","6月"]
    },
    yAxis: {},
    series: [{
      name: '人数',
      type: 'bar',
      data: [1000, 1500, 1800, 1200, 1000, 500]
    }]
  };

  echars1.setOption(option1);


  var echars2 = echarts.init(document.querySelector(".echarts_2"));
  option2 = {
    title : {
      text: '热门品牌销售',
      subtext: '2020年6月',
      x:'center'
    },
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['耐克','阿迪','新百伦','李宁','阿迪王']
    },
    series : [
      {
        name: '品牌',
        type: 'pie',
        radius : '50%',
        center: ['50%', '60%'],
        data:[
          {value:335, name:'耐克'},
          {value:310, name:'阿迪'},
          {value:234, name:'新百伦'},
          {value:135, name:'李宁'},
          {value:1548, name:'阿迪王'}
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 30,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 1)'
          }
        }
      }
    ]
  };
  echars2.setOption(option2);
})