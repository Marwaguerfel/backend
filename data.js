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
  requests: [
    {
      subject: 'subject',
      description:'description',
      status: 'status',
      student:'652acc71e36c0408d5c3ff18', 

    },
  
  ],
  };
  export default data;