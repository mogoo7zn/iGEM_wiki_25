import React, { useEffect } from 'react';
import { Banner, One, Two, Three, Four, Five } from '../components/home';
import { useInteraction } from '../context/InteractionContext';
import Layout from '../components/layout/Layout';

const Home = () => {
  const { setActive } = useInteraction();

  useEffect(() => {
    // 设置当前页面为活动页面
    setActive('home');

    // 设置页面标题
    document.title = 'iGEM Team 2025 - Home';

    // 页面滚动处理
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      // 根据滚动位置确定活动部分
      if (scrollY < viewportHeight * 0.8) {
        setActive('banner');
      } else if (scrollY < viewportHeight * 1.8) {
        setActive('one');
      } else if (scrollY < viewportHeight * 2.8) {
        setActive('two');
      } else if (scrollY < viewportHeight * 3.8) {
        setActive('three');
      } else if (scrollY < viewportHeight * 4.8) {
        setActive('four');
      } else {
        setActive('five');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setActive]);

  // 返回组件树
  return (
    /*<>...</>是React Fragment的简写语法，它允许在不添加额外DOM节点的情况下对多个元素进行分组。等同于：
      <React.Fragment>
        <Banner />
        <One />
        <Two />
        <Three />
        <Four />
        <Five />
      </React.Fragment>
     */
    <>
      <Banner />
      <One />
      <Two />
      <Three />
      <Four />
      <Five />
    </>
  );
};

// 使用Next.js特性，getLayout方法可以自定义布局
Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;
