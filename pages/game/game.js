// pages/game/game.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    score: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.direc = 1;
    this.snake = [{ x: 0, y: 10 }, { x: 0, y: 20 }, { x: 0, y: 30 }];
    this.food = {x:20,y:20};
    
    // 控制速度
    this.frameCount = 0;

    let that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.canvasHeight = parseInt(res.windowHeight * 0.8) / 10 * 10 ;
        that.canvasWidth = res.windowWidth / 10 * 10;
      },
      complete: function(){
        this.onDraw();    
      }
    });

    this.interval = setInterval(this.onDraw, 40);

  },
  onDraw: function(){
    // this.frameCount ++;
    // if(this.frameCount > 10000000)
    //   this.frameCount = 0;
    // 10帧移动一次
    // if(this.frameCount % 3 == 0){  
      const ctx = wx.createCanvasContext('1');
      let that = this;
      ctx.setStrokeStyle('red');
      ctx.fillRect(this.food.x, this.food.y, 10, 10);

      let head = this.snake[this.snake.length - 1];

      // 判断是否撞到自己

      // 判断是否吃到食物
      if(head.x == this.food.x && head.y == this.food.y){
        // 不移除尾部 并重新随机食物位置
        this.food = {x:parseInt(Math.random() * (this.canvasWidth - 20) / 10) * 10, y:parseInt(Math.random() * (this.canvasHeight - 20) / 10) * 10};
        console.log("吃到食物啦！");

        this.setData({score: ++this.data.score});
        console.log(this.data.score);
      }else{
        // 正常移除尾部 
        this.snake.shift();
      }

      let tmp = {x: head.x, y:head.y};
      if(tmp.x < 0)
        tmp.x = parseInt(this.canvasWidth / 10) * 10 - 10;
      else if(tmp.x > this.canvasWidth)
        tmp.x = -10;
      else if(tmp.y < 0)
        tmp.y = parseInt(this.canvasHeight / 10) * 10 - 20;
      else if(tmp.y > this.canvasHeight)
        tmp.y = -10;

      switch(this.direc){
        case 0:
          this.snake.push({x:tmp.x, y:tmp.y - 10});
          break;
        case 1:
          this.snake.push({ x: tmp.x , y: tmp.y + 10 });
          break;
        case 2:
          this.snake.push({ x: tmp.x - 10, y: tmp.y });
          break;
        case 3:
          this.snake.push({ x: tmp.x + 10, y: tmp.y })
          break;
      }
      for(let body of this.snake){
        ctx.strokeRect(body.x, body.y, 10, 10);
      }
      // 必须调用draw方法才能在canvas中显示
      ctx.draw();
    // }
    // wx.drawCanvas({
    //   canvasId: 1,  // canvas id暂时写死
    //   actions: this.ctx.getActions(),
    // });
  },
  onTouchMove: function(event){
    console.log(event);
  },
  onTouchUp: function(){
    if (this.direc == 1) return;
    this.direc = 0;
  },
  onTouchDown: function () {
    if (this.direc == 0) return;
    this.direc = 1;
  },
  onTouchLeft: function () {
    if (this.direc == 3) return;
    this.direc = 2;
  },
  onTouchRight: function () {
    if (this.direc == 2) return;
    this.direc = 3;
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})