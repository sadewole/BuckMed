import moment from 'moment';
import mock from 'src/utils/mock';

mock.onGet('/api/doctors').reply(() => {
  const doctors = [
    {
      id: '5e887ac47eed253091be10cb',
      avatar: '/static/experts/1.png',
      currency: '$',
      email: 'cao.yu@devias.io',
      hasAcceptedMarketing: true,
      isProspect: false,
      isReturning: true,
      firstName: 'Cao Yu',
      lastName: 'Mckinney',
      specialization: 'Dentist',
      gender: 'Male',
      phone: '(270) 555-01177',
      address: 'Cleveland, Ohio. USA',
      updatedAt: moment()
        .subtract(1, 'days')
        .subtract(7, 'hours')
        .toDate()
        .getTime(),
    },
    {
      id: '5e887b209c28ac3dd97f6db5',
      avatar: '/static/experts/2.png',
      currency: '$',
      email: 'alex.richardson@devias.io',
      hasAcceptedMarketing: true,
      isProspect: true,
      isReturning: false,
      firstName: 'Alex',
      lastName: 'Richardson',
      specialization: 'Neurologist',
      gender: 'Male',
      phone: '(270) 555-01177',
      address: 'Atlanta, Georgia USA',
      updatedAt: moment()
        .subtract(2, 'days')
        .subtract(1, 'hours')
        .toDate()
        .getTime(),
    },
    {
      id: '5e887b7602bdbc4dbb234b27',
      avatar: '/static/experts/3.png',
      currency: '$',
      email: 'anje.keizer@devias.io',
      hasAcceptedMarketing: false,
      isProspect: false,
      isReturning: false,
      firstName: 'Anje',
      lastName: 'Keizer',
      specialization: 'Neurologist',
      gender: 'Female',
      phone: '(270) 555-01177',
      address: 'Atlanta, Ohio USA',
      updatedAt: moment()
        .subtract(2, 'days')
        .subtract(4, 'hours')
        .toDate()
        .getTime(),
    },
    {
      id: '5e86809283e28b96d2d38537',
      avatar: '/static/experts/5.png',
      currency: '$',
      email: 'katarina.smith@devias.io',
      hasAcceptedMarketing: true,
      isProspect: false,
      isReturning: true,
      firstName: 'Katarina',
      lastName: 'Smith',
      specialization: 'Lungs Surgeon',
      gender: 'Female',
      phone: '(270) 555-01177',
      address: 'Madrid, Madrid. Spain',
      updatedAt: moment()
        .subtract(2, 'days')
        .subtract(11, 'hours')
        .toDate()
        .getTime(),
    },
    {
      id: '5e86805e2bafd54f66cc95c3',
      avatar: '/static/experts/6.png',
      currency: '$',
      email: 'adam.denisov@devias.io',
      hasAcceptedMarketing: true,
      isProspect: true,
      isReturning: false,
      firstName: 'Adam',
      lastName: 'Denisov',
      specialization: 'Heart Surgeon',
      gender: 'Male',
      phone: '(270) 555-01177',
      address: 'San Diego, California. Spain',
      updatedAt: moment()
        .subtract(3, 'days')
        .subtract(7, 'hours')
        .toDate()
        .getTime(),
    },
    {
      id: '5e887a1fbefd7938eea9c981',
      avatar: '/static/experts/7.png',
      currency: '$',
      email: 'miller.edwards@devias.io',
      hasAcceptedMarketing: false,
      isProspect: true,
      isReturning: false,
      firstName: 'Edwards',
      lastName: 'Smith',
      specialization: 'Neurologist',
      gender: 'Male',
      phone: '(270) 555-01177',
      address: 'Berkeley, Miller. USA',
      updatedAt: moment()
        .subtract(4, 'days')
        .subtract(5, 'hours')
        .toDate()
        .getTime(),
    },
    {
      id: '5e887d0b3d090c1b8f162003',
      avatar: '/static/experts/8.png',
      currency: '$',
      email: 'emilee.simchenko@devias.io',
      hasAcceptedMarketing: true,
      isProspect: false,
      isReturning: false,
      firstName: 'Emilee',
      lastName: 'Simchenko',
      specialization: 'Neurologist',
      gender: 'Female',
      phone: '(270) 555-01177',
      address: 'Carson City, Nevada. USA',
      updatedAt: moment()
        .subtract(4, 'days')
        .subtract(15, 'hours')
        .toDate()
        .getTime(),
    },
    {
      id: '5e88792be2d4cfb4bf0971d9',
      avatar: '/static/experts/6.png',
      currency: '$',
      email: 'elliott.stone@devias.io',
      hasAcceptedMarketing: true,
      isProspect: false,
      isReturning: true,
      firstName: 'Elliott',
      lastName: 'Stone',
      specialization: 'Endocrinology',
      gender: 'Male',
      phone: '(270) 555-01177',
      address: 'Los Angeles, California. USA',
      updatedAt: moment()
        .subtract(5, 'days')
        .subtract(2, 'hours')
        .toDate()
        .getTime(),
    },
    {
      id: '5e8877da9a65442b11551975',
      avatar: '/static/experts/3.png',
      email: 'shen.zhi@devias.io',
      hasAcceptedMarketing: true,
      isProspect: true,
      isReturning: false,
      state: 'Utah',
      firstName: 'Shen',
      lastName: 'Zhi',
      specialization: 'Dentist',
      gender: 'Female',
      phone: '(270) 555-01177',
      address: 'Murray, Utah. USA',
      updatedAt: moment()
        .subtract(6, 'days')
        .subtract(8, 'hours')
        .toDate()
        .getTime(),
    },
    {
      id: '5e8680e60cba5019c5ca6fda',
      avatar: '/static/experts/1.png',
      currency: '$',
      email: 'merrile.burgett@devias.io',
      hasAcceptedMarketing: false,
      isProspect: false,
      isReturning: true,
      firstName: 'Merrile',
      lastName: 'Burgett',
      specialization: 'Endocrinology',
      gender: 'Male',
      phone: '(270) 555-01177',
      address: 'Salt Lake City, Utah. USA',
      updatedAt: moment()
        .subtract(9, 'days')
        .subtract(1, 'hours')
        .toDate()
        .getTime(),
    },
  ];

  return [200, { doctors }];
});
