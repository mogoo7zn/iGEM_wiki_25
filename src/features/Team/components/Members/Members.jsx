import React, { useState, useRef } from 'react';
import mogooAvatar from '@assets/images/team/ava_mogoo_aniya.jpeg'; // 导入 mogoo 成员头像
import Sis from '@assets/images/team/Sis.jpg'; // 导入 Sis 成员头像
import './Members.css';

const MemberCard = ({ id, name, alias, role, image, description}) => {
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
      alias: '墨谷',
      role: 'Wiki Lead',
      image: mogooAvatar,
      description:
        'Responsible for the overall management of the wiki, including web architect, content planning, and team management.',
    },
    // 添加member信息
    {
      id: 1,
      name: 'Boning Yang',
      alias: 'Sisyphus',
      role: 'Content Manager',
      image: Sis,
      description: 'Perform content editing and planning coordination for the wiki.',
    },
  ];

  return (
    <section id="team-members">
      <div className="inner">
        <div className="members-grid">
          {/* 遍历展示所有成员 */}
          {teamMembers.map((member) => (
            <MemberCard key={member.id} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Members;
