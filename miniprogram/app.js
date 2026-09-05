App({
  onLaunch() {
    // 保持吃火锅期间屏幕常亮
    if (wx.setKeepScreenOn) {
      wx.setKeepScreenOn({
        keepScreenOn: true,
        success() {
          console.log('Screen keep awake enabled');
        }
      });
    }
  }
});
