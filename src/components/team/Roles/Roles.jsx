import React from 'react';
import styles from './Roles.module.scss';

const Roles = ({ roles }) => {
  return (
    <section id="roles">
      <div className={styles.inner}>
        <h2>Our Roles</h2>
        <div className={styles['roles-grid']}>
          {roles.map((role, index) => (
            <div
              key={index}
              className={styles['role-card']}
              style={{
                background: `linear-gradient(135deg, #0c0c0c, #202020)`,
              }}
            >
              <h3>{role.title}</h3>
              <p className={styles.description}>{role.description}</p>
              <div className={styles.members}>
                {role.members.map((member, i) => (
                  <span key={i} className={styles['member-tag']}>
                    {member}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roles;
