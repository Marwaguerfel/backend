import bcrypt from 'bcryptjs';

const data = {

  students: [
    {
      firstName: 'marwa',
      lastName:'guerfel',
      email: 'user@example.com',
      password: bcrypt.hashSync('1234', 8),
      class:"dsb"

    },
  
  ],
  };
  export default data;