// pages/home1/home1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pno: 0,//页码数  0 1 2 3 4
    list: [],//接收结果
  },
  jump:function(event){
    var id=event.target.dataset.id;
    wx.navigateTo({
      url: '/pages/detail/detail?id='+id,
    })
  },
  // 声明一个调用movielist的函数,
  load: function () {
    var pno = this.data.pno + 1;
    this.setData({
      pno: pno
    })
    // 1  0 -3
    // 2  4 -7
    // 3  8 -11
    // 每一页请求的start
    var offset = (pno - 1) * 4
    // 1.调用云函数
    wx.cloud.callFunction({
      name: "movelist",//云函数名称
      data: {
        start: offset,
        count: 10
      }
    }).then(res => {
      var lists = JSON.parse(res.result);
      // console.log(lists);
      var data = this.data.list.concat(lists.subjects);
      // var data=lists.subjects;
      //console.log(data);
      this.setData({
        list: data
      })
    }).catch(err => {
      console.log(err);
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.load();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
    this.load();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})