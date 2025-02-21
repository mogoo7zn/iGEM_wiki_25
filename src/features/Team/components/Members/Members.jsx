import React, { useState, useRef } from 'react';
import mogooAvatar from '@assets/images/team/ava_mogoo_aniya.jpeg'; // 导入 mogoo 成员头像
import Sis from '@assets/images/team/Sis.jpg'; // 导入 Sis 成员头像
import scxAvatar from '@assets/images/team/ava_scx.jpg'; // 导入 scx 成员头像
import './Members.css';

const MemberCard = ({ id, name, alias, role, image, description }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    // 如果卡片已翻转，不执行3D倾斜
    if (isFlipped) return;

    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleClick = () => {
    if (!isFlipped) {
      setIsFlipped(true);
    }
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    if (isFlipped) {
      setIsFlipped(false);
    }
  };

  return (
    <div
      className="member-card"
      ref={cardRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`card-inner ${isFlipped ? 'is-flipped' : ''}`}
        style={{
          transform: `
            perspective(1000px)
            rotateX(${isFlipped ? 0 : rotation.x}deg)
            rotateY(${isFlipped ? 180 : rotation.y}deg)
            translateZ(50px)
            scale(${isFlipped ? 0.95 : 1})
          `,
        }}
      >
        <div className="card-front">
          <img
            src={image}
            alt={name}
            className="member-image"
            style={{
              transform: `rotateY(${isFlipped ? 180 : 0}deg)`,
            }}
          />
          <h3>
            {name} {alias}
          </h3>
          <p>{role}</p>
        </div>
        <div className="card-back">
          <div className="back-header">
            <h3>
              {name} {alias}
            </h3>
            <p className="role">{role}</p>
          </div>
          <p className="mem_desc">{description}</p>
        </div>
      </div>
    </div>
  );
};

const Members = () => {
  const teamMembers = [
    {
      id: 0,
      name: 'Wang ZiNing',
      alias: '墨谷', // 别名
      role: 'Wiki Lead',
      image: mogooAvatar,
      description:
        'Responsible for the overall management of the wiki, including web architect, content planning, and team management.',
    },
    {
      id: 1,
      name: 'Boning Yang',
      alias: 'Sisyphus',
      role: 'Content Manager',
      image: Sis,
      description: 'Perform content editing and planning coordination for the wiki.',
    },
    {
      id: 2,
      name: 'Shao ChenXuan',
      alias: '半酸半酯',
      role: 'Editor',
      image: scxAvatar,
      description: 'Responsible for editing the text and images on the Home page.',
    }
    
  ];

  const createRows = (members) => {
    const rows = [];
    const settings = [
      { cardsPerRow: 2, justifyContent: 'center' }, // 第一行显示 2 张卡片
      { cardsPerRow: 1, justifyContent: 'center' }, // 第二行显示 1 张卡片
    ];

    let currentRow = [];
    let settingIndex = 0;

    members.forEach((member, index) => {
      currentRow.push(member);
      
      // 当前行卡片数量达到限制或是最后一个成员时创建新行
      if (currentRow.length === settings[settingIndex]?.cardsPerRow || index === members.length - 1) {
        rows.push(
          <div
            key={settingIndex}
            className="members-row"
          >
            {currentRow.map(member => (
              <MemberCard key={member.id} {...member} />
            ))}
          </div>
        );
        currentRow = [];
        settingIndex++;
      }
    });

    return rows;
  };

  return (
    <section id="team-members">
      <div className="inner">
        {createRows(teamMembers)}
      </div>
    </section>
  );
};

export default Members;

const PropTypes = require('prop-types');

MemberCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  alias: PropTypes.string,
  role: PropTypes.string,
  image: PropTypes.string,
  description: PropTypes.string,
};