export const shareWebsite = () => {
  const shareData = {
    title: 'Love Match - 找到你的完美伴侣',
    text: '快来测试你的匹配类型！',
    url: window.location.origin
  };

  if (navigator.share) {
    navigator.share(shareData);
  } else {
    // 复制链接
    navigator.clipboard.writeText(shareData.url);
    alert('链接已复制，快去分享给朋友吧！');
  }
}; 