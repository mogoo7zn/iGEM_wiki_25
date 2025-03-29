import React from 'react';
import Layout from '../components/layout/Layout';
import { Banner, Members, Roles } from '../components/team';

const teamMembers = [
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

const teamRoles = [
  {
    title: 'Wet Lab',
    description:
      'Responsible for executing experimental protocols, including DNA cloning, protein expression, and analysis.',
    members: ['John Doe', 'Jane Smith', 'Alex Johnson'],
  },
  {
    title: 'Dry Lab',
    description:
      'Focuses on computational modeling, data analysis, and bioinformatics to support project goals.',
    members: ['Michael Brown', 'Emily Davis'],
  },
  {
    title: 'Human Practices',
    description:
      'Engages with stakeholders and explores the broader implications of our synthetic biology project.',
    members: ['Sarah Martinez', 'David Taylor'],
  },
];

const Team = () => {
  return (
    <>
      <Banner />
      <Members members={teamMembers} />
      <Roles roles={teamRoles} />
    </>
  );
};

Team.getLayout = (page) => <Layout>{page}</Layout>;

export default Team;
