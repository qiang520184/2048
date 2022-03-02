// 2048
class game {
  constructor(params) {
    console.log(params)
    this.win = false;
    this.maxScore = 0;
    this.addScore = 0;
    this.params = params;
    this.data = [];
    this.emptyIndex = [];
    this.ramdomNumberList = [2, 4];
    this.updatedTime = 200;
    this.init()
  }
  init() {
    let sum = 16;
    let data = [];
    let emptyIndex = [];
    for (var i = 0; i < sum; i++) {
      data.push(0);
      emptyIndex.push(i)
    }
    this.emptyIndex = emptyIndex;
    this.data = data;
    this.log('初始化...');
    this.initStart()
  }
  initStart() {
    // 开始随机出三个数字
    this.setValue(this.randomOption())
    // console.log(this.data, this.data, this.ramdom, this.ramdomNumber())
    // this.data[this.ramdom] = this.ramdomNumber()
  }
  setValue(option) {
    console.log(option, 'setValue')
    this.data[option.index] = option.value;
    let emptyIndex = [].concat(this.emptyIndex);
    console.log('emptyIndex', this.emptyIndex)
    let item = emptyIndex.splice(option.emptyIndex, 1)
    this.emptyIndex = emptyIndex;
    console.log(emptyIndex, 'this.emptyIndex', item)

    this.updatedView();
  }
  updated(value) {
    console.log(value);
    // 合并数值 视图更新
    console.log(this)
    switch (value) {
      case 'top':

        break;
      case 'right':

        break;
      case 'bottom':

        break;
      case 'left':

        break;

      default:
        break;
    }
    // 添加新随机数
    if (this.emptySum()) {
      this.setValue(this.randomOption())
    }

  }
  updatedView() {
    this.params.render(this.data)
    this.log('更新视图')
  }
  randomOption() {
    let index = Math.floor(Math.random() * this.emptySum());
    let value = this.ramdomNumber();
    return {
      emptyIndex: index,
      index: this.emptyIndex[index],
      value
    }
  }
  ramdomNumber() {
    return this.ramdomNumberList[+(Math.random() > 0.5)]
  }
  ramdomIndex() {
    this.ramdom = Math.floor(Math.random() * this.data.length);

  }
  emptySum() {
    return this.emptyIndex.length;
  }
  log(value) {
    console.log(value);
  }

}
