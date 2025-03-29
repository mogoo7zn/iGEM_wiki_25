import React from 'react';
import Image from '../../common/Image/Image';
import styles from './Members.module.scss';

const Members = ({ members = [] }) => {
  // 默认示例数据
  const membersData = members.length
    ? members
    : [
        {
          name: 'John Doe',
          role: 'Wet Lab Lead',
          photo: '/images/team/john.jpg',
          bio: '4th year Biochemistry major with extensive research experience in molecular biology.',
        },
        {
          name: 'Jane Smith',
          role: 'Dry Lab Lead',
          photo: '/images/team/jane.jpg',
          bio: 'Computational biology PhD candidate focusing on protein structure prediction.',
        },
        {
          name: 'Alex Johnson',
          role: 'Human Practices',
          photo: '/images/team/alex.jpg',
          bio: 'Sociology major interested in the ethical implications of synthetic biology.',
        },
      ];

  return (
    <section id={styles.members}>
      <div className={styles.inner}>
        <h2>Meet Our Team</h2>
        <div className={styles['members-grid']}>
          {membersData.map((member, index) => (
            <div key={index} className={styles['member-card']}>
              <div className={styles['member-image']}>
                <Image
                  src={member.photo}
                  alt={`${member.name}`}
                  placeholderSrc="/images/placeholder.jpg"
                />
              </div>
              <div className={styles['member-info']}>
                <h3>{member.name}</h3>
                <p className={styles.role}>{member.role}</p>
                <p className={styles.bio}>{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Members;
