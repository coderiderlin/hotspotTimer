const { CATEGORIES, FOOD_ITEMS } = require('../../data/foodData.js');

Page({
  data: {
    categories: CATEGORIES,
    activeCategory: CATEGORIES[0].id,
    currentFoods: [],
    queue: [],
    darkMode: false,
    soundEnabled: true,
    startX: 0,
    startY: 0
  },

  timerId: null,

  onLoad() {
    this.filterFoods(this.data.activeCategory);
    this.startTick();
  },

  onUnload() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  },

  // 分类切换
  onSelectCategory(e) {
    const id = e.currentTarget.dataset.id;
    this.setData({ activeCategory: id });
    this.filterFoods(id);
  },

  filterFoods(categoryId) {
    const foods = FOOD_ITEMS.filter(item => item.category === categoryId).map(food => {
      const displayTime = food.duration < 60 
        ? `${food.duration}s` 
        : `${Math.floor(food.duration / 60)}m${food.duration % 60 ? (food.duration % 60) + 's' : ''}`;
      return {
        ...food,
        displayTime
      };
    });
    this.setData({ currentFoods: foods });
  },

  // 添加菜品到涮烫队列
  onAddFood(e) {
    const food = e.currentTarget.dataset.food;
    const now = Date.now();
    const newItem = {
      instanceId: `${food.id}-${now}-${Math.random().toString(36).substr(2, 4)}`,
      foodId: food.id,
      name: food.name,
      icon: food.icon,
      color: food.color,
      duration: food.duration,
      startTime: now,
      endTime: now + food.duration * 1000,
      remaining: food.duration,
      progress: 0,
      isDone: false,
      offsetX: 0,
      notified: false
    };

    const newQueue = [newItem, ...this.data.queue];
    this.setData({ queue: newQueue });

    // 触感反馈
    if (wx.vibrateShort) {
      wx.vibrateShort({ type: 'light' });
    }
  },

  // 队列主循环定时器
  startTick() {
    this.timerId = setInterval(() => {
      const now = Date.now();
      const currentQueue = this.data.queue;
      if (currentQueue.length === 0) return;

      let changed = false;
      const updated = currentQueue.map(item => {
        const remaining = Math.max(0, Math.ceil((item.endTime - now) / 1000));
        const elapsed = (now - item.startTime) / 1000;
        const progress = Math.min(100, Math.floor((elapsed / item.duration) * 100));
        const isDone = remaining <= 0;

        if (isDone && !item.notified) {
          item.notified = true;
          this.triggerAlert(item.name);
          changed = true;
        }

        if (remaining !== item.remaining || progress !== item.progress || isDone !== item.isDone) {
          changed = true;
        }

        return {
          ...item,
          remaining,
          progress,
          isDone
        };
      });

      if (changed) {
        this.setData({ queue: updated });
      }
    }, 500);
  },

  // 涮好提醒 (震动 + 提示音)
  triggerAlert(name) {
    if (wx.vibrateLong) {
      wx.vibrateLong();
    }
    if (this.data.soundEnabled) {
      // 播放内置短音频或蜂鸣
      const ctx = wx.createInnerAudioContext();
      // 使用微信开放音效或轻音
      ctx.src = 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3';
      ctx.play();
    }
  },

  // 清空全部
  onClearAll() {
    wx.showModal({
      title: '捞出全部',
      content: '确定要捞出锅里的所有菜品吗？',
      confirmText: '全部捞出',
      confirmColor: '#FF4757',
      success: (res) => {
        if (res.confirm) {
          this.setData({ queue: [] });
        }
      }
    });
  },

  // 手指触摸滑动 (左滑删除)
  onTouchStart(e) {
    if (e.touches.length === 1) {
      this.setData({
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY
      });
    }
  },

  onTouchMove(e) {
    if (e.touches.length === 1) {
      const moveX = e.touches[0].clientX;
      const moveY = e.touches[0].clientY;
      const diffX = moveX - this.data.startX;
      const diffY = moveY - this.data.startY;

      // 仅处理水平滑动
      if (Math.abs(diffX) > Math.abs(diffY)) {
        const id = e.currentTarget.dataset.id;
        let offsetX = 0;
        if (diffX < 0) {
          // 向左滑，最多划出 80px
          offsetX = Math.max(diffX, -80);
        } else {
          offsetX = 0;
        }

        const newQueue = this.data.queue.map(item => {
          if (item.instanceId === id) {
            return { ...item, offsetX };
          }
          return item;
        });
        this.setData({ queue: newQueue });
      }
    }
  },

  onTouchEnd(e) {
    const id = e.currentTarget.dataset.id;
    const currentItem = this.data.queue.find(item => item.instanceId === id);
    if (!currentItem) return;

    let targetOffset = 0;
    if (currentItem.offsetX < -40) {
      targetOffset = -80; // 展开删除
    } else {
      targetOffset = 0; // 回弹
    }

    const newQueue = this.data.queue.map(item => {
      if (item.instanceId === id) {
        return { ...item, offsetX: targetOffset };
      }
      return item;
    });
    this.setData({ queue: newQueue });
  },

  // 单个删除
  onDelete(e) {
    const id = e.currentTarget.dataset.id;
    const newQueue = this.data.queue.filter(item => item.instanceId !== id);
    this.setData({ queue: newQueue });
    if (wx.vibrateShort) {
      wx.vibrateShort({ type: 'medium' });
    }
  },

  // 切换暗色模式
  toggleDarkMode() {
    this.setData({ darkMode: !this.data.darkMode });
  },

  // 切换音效
  toggleSound() {
    this.setData({ soundEnabled: !this.data.soundEnabled });
  },

  // 微信原生分享给好友/群 (大图卡片)
  onShareAppMessage() {
    const queueLen = this.data.queue.length;
    return {
      title: queueLen > 0 
        ? `🍲 我锅里正涮着 ${queueLen} 样菜！快来看看涮好了没～` 
        : '🍲 火锅涮肉计时器：毛肚千层肚鲜虾肉片，到点变绿绝不老！',
      path: '/pages/index/index'
    };
  },

  // 分享到朋友圈
  onShareTimeline() {
    return {
      title: '🍲 火锅涮肉计时器：掐准时间，每一口都在最鲜嫩巅峰！',
      query: ''
    };
  }
});
