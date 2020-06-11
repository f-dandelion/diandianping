// pages/map/map.js
const db=wx.cloud.database({
  env: "fj-icpmr"
})

Page({

  /**
   * 页面的初始数据
   */
  data: {
    /*polyline:[
      {
        points:[
          {longitude:116.402359,latitude:39.999763},
          {longitude: 116.19615, latitude: 39.998136}
        ],
        color:"#000",
        width:10
      }
    ],*/
    controls:[
      {id:0,
      iconPath:"/images/xin.png",
      position:{
        left:10,
        top:220,
        width:15,
        height:15
      }}
    ],

    placeList: [],
  },
  


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection("cinema")
    .get()
      .then(res => {
        //console.log(res.data);
        this.setData({
          placeList:res.data
        })
      })
      .catch(err => {
        console.log(err);
      })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})