import React, { useState, useRef, useEffect } from 'react';
import './Roles.css';

const RoleCard = ({ title, description, members }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 25;
    const rotateY = ((x - centerX) / centerX) * 25;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      className="role-card"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `
          ${isHovered ? 'translateY(-30px) scale(1.05)' : 'translateY(0) scale(1)'}
          rotateX(${rotation.x}deg)
          rotateY(${rotation.y}deg)
        `,
      }}
    >
      <h3>{title}</h3>
      <p className="description">{description}</p>
      <div className="members">
        {members.map((member, index) => (
          <div key={index} className="member-tag">
            {member}
          </div>
        ))}
      </div>
    </div>
  );
};

const Roles = () => {
  const roles = [
    {
      title: 'Wiki Structure',
      description: 'Responsible for overall display and content management',
      members: ['Wang ZiNing'],
    },
    {
      title: 'Wiki Content',
      description: 'Perform content editing and planning coordination for the wiki.',
      members: ['Boning Yang'],
    },
    {
      title: 'Dry Lab',
      description: 'Focuses on computational modeling and data analysis',
      members: ['mogoo7zn'],
    },
  ];

  return (
    <section id="roles">
      <div className="inner">
        <h2>Team Roles</h2>
        <div className="roles-grid">
          {roles.map((role, index) => (
            <RoleCard key={index} {...role} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roles;
