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
    // this.setValue(this.randomOption())
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
  updated(type) {
    console.log(type);
    // 合并数值 视图更新
    console.log(this)

    let newData = [...this.data];
    console.log(this.data, 'data')
    let newList = [];
    this.data.forEach((item, index) => {
      if (item) {
        let { itemIndex, newValue, oldValue, merge } = this.getDirectionValue(type, index);
        console.log(this.getDirectionValue(type, index))
        newData[index] = 0
        newData[itemIndex] = merge ? newValue + oldValue : newValue
      }

      // newData[]
      // console.log(item, value, index)
    })

    this.data = newData;

    this.updatedView();
    console.log(newData, 'newData')
    // // 添加新随机数
    if (this.emptySum()) {
      this.setValue(this.randomOption())
    }

  }
  top(item, cloumes, index) {
    if (item) {
      cpmspe
    } else {

    }
  }

  // 方向类型 当前下标返回 对应信息
  getDirectionValue(type, index) {
    let mergeFlag;
    let itemIndex = 0;
    let data = this.data;

    function deepIndex(type, index) {
      console.log(type, index, 'deepIndex')
      switch (type) {
        case 'top':
          itemIndex = index > 3 ? index - 4 : index;

          if (!data[itemIndex] && itemIndex > 3) {
            deepIndex(type, itemIndex)
          }
          break;
        case 'right':
          itemIndex = index % 4 === 3 ? index - 4 : index + 1;
          if (!data[itemIndex] && itemIndex % 4 < 3) {
            deepIndex(type, itemIndex)
          }
          break;
        case 'bottom':
          itemIndex = index >= data.length - 4 ? index % 4 : index + 4;
          if (!data[itemIndex] && itemIndex < data.length - 3) {
            deepIndex(type, itemIndex)
          }
          break;
        case 'left':
          itemIndex = index ? index % 4 === 0 ? index : index - 1 : index;
          if (!data[itemIndex] && itemIndex % 4 !== 0 && itemIndex) {
            deepIndex(type, itemIndex)
          }
          break;
        default:
          break;
      }
    }
    deepIndex(type, index)
    console.log(itemIndex, 'itemIndex')
    let oldValue = this.data[itemIndex];
    let newValue = this.data[index];
    let merge = Boolean(oldValue === newValue && oldValue && newValue && itemIndex !== index);
    return {
      type,
      index,
      itemIndex,
      merge,
      oldValue,
      newValue
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
